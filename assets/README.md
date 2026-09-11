# 文档图片存储

目标桶：`yunyoujun-assets-prod-1325586649`（`ap-shanghai`）。资源域名：`https://assets.yunyoujun.cn/`。

迁移范围仅为 `docs/public/img/`。`artwork-manifest.json` 记录该目录 40 个素材的原路径、版本化对象路径、字节数、SHA-256、Content-Type 与目标 URL。文件名包含内容哈希，避免不同版本覆盖同一对象。根目录品牌图标不在此次迁移范围。

**当前状态：已迁移。** 40 个素材均已上传并通过公开域名的字节数、SHA-256 和 Content-Type 校验。Playground、背景、Loading 和其他文档示例均直接引用在线资源，本地 43.57 MiB 图片已移出仓库，仓库外的校验一致备份保留。

## WebP 优化

大于 100 KB 的 28 张 PNG 提供完整尺寸 WebP：`cwebp 1.6.0 -q 90 -m 6 -sharp_yuv -alpha_q 100 -metadata none`，总大小 **43.10 MiB → 9.63 MiB（减少 77.7%）**。尺寸不变，全部图片的透明通道已逐像素核对一致；颜色采用有损压缩。小于 100 KB 的 PNG、既有 JPEG/WebP 和 SVG 保持原文件。

25 张小云另提供宽 640px、质量 85、透明质量 100 的 WebP 缩略图（合计 1.81 MiB）。默认八职业卡片 **9.19 MiB → 431 KiB（减少 95.4%）**，选中角色后加载完整尺寸 WebP。Playground 提供「下载 PNG 原图」链接，原始文件保留在 COS。清单中的 `webp`、`thumbnail` 记录各自路径、URL、大小和哈希。

## 生成、上传和验证

目录参数指向包含 `img/` 的素材根目录。源素材可来自原始备份或按清单下载的 COS 原图；生成物放在仓库外。

```sh
node scripts/prepare-artwork-webp.mjs --source-dir /outside/originals --output-dir /outside/webp
node scripts/sync-artwork-cos.mjs --webp --upload --source-dir /outside/webp --cos-script /absolute/path/to/tencent-cos-skill/scripts/cos_node.mjs
```

生成脚本检查原文件哈希、调用已安装的 `cwebp`，并更新清单。上传后逐文件验证公开域名的内容、类型和哈希。清单与代码应在全部上传验证完成后一起提交。

`--webp` 只处理 WebP 派生文件；不加则处理原图及所有派生文件。`--local --source-dir /outside/media` 仅验证本地文件；不带参数仅验证全部远端 URL：

```sh
node scripts/sync-artwork-cos.mjs
```

上传脚本在失败时停止，不删除本地文件、不更改桶权限、不输出凭证。本次 40 个原始素材和 53 个 WebP 派生文件均已上传并验证。

已清理的错误稿为近卫、辅助的 v2／v3，共 4 张。当前蓝白 v1、职业配色、精英版均在清单内；生成提示词和角色许可保留在 `docs/showcase/artwork.md`。

`docs/public/img/` 已加入 `.gitignore`，并从改写后的本地历史及暂存区移除。本地上传缓存已清理，后续新图片同样先上传、验证，再引用清单中的 URL。

pre-commit 同时运行 `scripts/verify-staged-media.mjs`，阻止该目录图片被强制添加或修改后提交，允许删除。可手动运行该脚本检查暂存区；它不改变暂存内容。

## 上传权限

本次 AccessDenied 的原因是原上传子账号没有目标桶的 `cos:PutObject` 权限，腾讯云自助诊断已确认。经确认后添加 `ak-ui-artwork-uploader` 桶策略，仅允许原上传子账号向 `ak-ui/assets/*` 执行 `PutObject`。现有私有桶配置与 EdgeOne 回源读取授权保留。上传不设置额外 ACL，因此无需扩大至桶管理或对象权限管理。

## Git 历史检查

改写前的 `master` / `origin/master`（`da9a3fa`）及发布标签可达历史中，没有小云立绘；`public/img` 历史共 18 个不同图片对象，原始大小合计约 4.95 MiB（含旧 `docs/.vuepress/public/img/` 路径）。这不是压缩后的克隆体积。

本地 `refs/codex/` 工作快照还引用未提交素材，不能把 `git rev-list --all` 或 `.git` 目录体积直接当作已推送的历史体积。本轮未修改这些内部引用。

用户授权后，已使用 git-filter-repo 在独立裸仓库中移除新旧两个 `public/img` 路径，逐一验证 58 个提交的非图片文件树一致，并应用到本地 master 和四个发布标签。master 从 `da9a3fa` 改为 `c27ad25`。未提交改动保持不变。

清理后的独立仓库对象包约 3.13 MiB。原始 bundle、图片副本、工作区补丁、提交映射和引用映射保存在仓库外的本机备份目录；远端尚未强推，origin/master 和 Codex 内部引用仍保留旧历史，因此当前工作目录的 `.git` 不会立刻缩小。

COS 已就绪；远端历史尚未同步。同步远端时需要一并处理已改写的 master 和发布标签。
