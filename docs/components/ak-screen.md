# ak-screen 功能页

主终端每个入口都会进入一张功能页：作战、编队、干员、采购中心、公开招募、干员寻访、基建、仓库，以及左侧的好友和情报。功能页继承入口指令的色调（`paper`、`muted`、`dark`、`cyan`），顶部标题栏、底部信号线和进场快门使用同一个信号色。在 [仿罗德岛主终端](/showcase/) 中点击任意入口即可体验，资源会在功能页之间流转：作战掉落进入仓库，访问好友获得的信用可以在采购中心消费。

## ak-screen

功能页绝对定位铺满最近的定位祖先，适合放在终端容器内。打开时先播放一次快门，随后标题栏信号线展开、内容从右侧滑入；离开时添加 `.is-leaving` 再隐藏。打开后把焦点移到 `.ak-screen__title`（需 `tabindex="-1"`），关闭后把焦点还给入口按钮，并让背后的终端 `inert`。

::: demo screen/basic
:::

| 结构 | 说明 |
| --- | --- |
| `.ak-screen__bar` | 标题栏，包含返回按钮、标题和右侧资源 |
| `.ak-screen__back` | 返回按钮，右侧斜切 |
| `.ak-screen__eyebrow` / `.ak-screen__title` | 英文路径与中文标题 |
| `.ak-screen__meta` | 资源或计数，内部 `.ak-icon` 按字号缩放 |
| `.ak-screen__body` | 可滚动内容区 |
| `.ak-screen__section-title` | 区块标题，`small` 为英文注记 |
| `.ak-screen__grid` | 自适应网格，最小列宽由 `--ak-screen-grid-min` 控制 |
| `.ak-screen__split` | 主区与侧栏两列，窄容器下合并为一列 |
| `.ak-screen__panel` | 深色面板 |
| `.ak-screen__actions` | 右对齐操作区 |
| `.ak-screen__watermark` | 右下角大号英文水印 |

| Variable | Description |
| --- | --- |
| `--ak-screen-surface` | 页面底色 |
| `--ak-screen-bar` | 标题栏底色，由色调修饰符设置 |
| `--ak-screen-bar-text` | 标题栏文字色 |
| `--ak-screen-signal` | 信号线、快门边缘颜色 |
| `--ak-screen-padding` | 内容区内边距 |
| `--ak-screen-gap` | 网格与面板间距 |
| `--ak-screen-grid-min` | `.ak-screen__grid` 最小列宽 |

## ak-slot 干员位

用于编队、干员档案、寻访结果和招募结果。底部信号线表示职业，顶部细线和星级表示稀有度。作为 `button` 使用时支持 `aria-pressed` 选中态；`.ak-slot--reveal` 配合 `--ak-slot-index` 依次闪入。

::: demo slot/basic
:::

| 修饰符 | 说明 |
| --- | --- |
| `.ak-slot--vanguard` … `.ak-slot--specialist` | 八种职业信号色，对应 `--ak-role-*` |
| `.ak-slot--rarity-1` … `.ak-slot--rarity-6` | 稀有度，对应 `--ak-rarity-*` |
| `.ak-slot--empty` | 空位 |
| `.ak-slot--reveal` | 寻访与招募结果的闪入动画 |

| Variable | Description |
| --- | --- |
| `--ak-slot-signal` | 职业信号色 |
| `--ak-slot-rarity` | 稀有度色 |
| `--ak-slot-index` | 闪入动画的错位序号 |

## ak-item 物资格

用于掉落、仓库和商店。图标留空时绘制一个按品阶着色的菱形；放入 `svg.ak-icon` 可替换为自定义图标。作为 `button` 使用时支持悬停、按压和 `disabled`。

::: demo item/basic
:::

| 修饰符 | 说明 |
| --- | --- |
| `.ak-item--tier-1` … `.ak-item--tier-6` | 品阶，对应 `--ak-rarity-*` |
| `.ak-item--sold` | 已售罄 |

| Variable | Description |
| --- | --- |
| `--ak-item-tier` | 品阶色，驱动图标、光晕与底边 |
