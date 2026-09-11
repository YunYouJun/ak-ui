import manifest from '../../../../assets/artwork-manifest.json'

const assetsByPath = new Map<string, { url: string, webp?: { url: string }, thumbnail?: { url: string } }>(
  manifest.assets.map(asset => [asset.path, asset]),
)

const artworkDefinitions = [
  {
    "id": "tactical",
    "name": "原版",
    "description": "小云的初始战术立绘。",
    "color": "#55cfff",
    "palette": "云白",
    "version": "v1"
  },
  {
    "id": "vanguard",
    "name": "先锋",
    "description": "前期阻挡敌人，回复部署费用（DP / Cost）。",
    "color": "#f5bd38",
    "palette": "琥珀黄",
    "version": "v2"
  },
  {
    "id": "guard",
    "name": "近卫",
    "description": "近战输出核心，正面抗敌并歼灭威胁。",
    "color": "#ed5265",
    "palette": "酒红银灰",
    "version": "v4"
  },
  {
    "id": "defender",
    "name": "重装",
    "description": "高生命值与防御力，阻挡多名敌人。",
    "color": "#528cff",
    "palette": "钴蓝",
    "version": "v2"
  },
  {
    "id": "sniper",
    "name": "狙击",
    "description": "远程物理输出，应对空中或高速敌人。",
    "color": "#a1b760",
    "palette": "橄榄绿",
    "version": "v2"
  },
  {
    "id": "caster",
    "name": "术师",
    "description": "远程法术输出，对抗高防御敌人。",
    "color": "#b58aff",
    "palette": "紫罗兰",
    "version": "v2"
  },
  {
    "id": "medic",
    "name": "医疗",
    "description": "恢复我方干员的生命值。",
    "color": "#68d5ba",
    "palette": "薄荷绿",
    "version": "v2"
  },
  {
    "id": "supporter",
    "name": "辅助",
    "description": "减速、削弱敌人，或增强我方干员。",
    "color": "#ed91bd",
    "palette": "玫瑰粉",
    "version": "v4"
  },
  {
    "id": "specialist",
    "name": "特种",
    "description": "位移、快速复活等特殊战术功能。",
    "color": "#ff9445",
    "palette": "橙黑",
    "version": "v2"
  }
]

export type ArtworkTone = 'role' | 'original'

export function getShowcaseArtwork(tone: ArtworkTone, decorated = false) {
  return artworkDefinitions.map(artwork => {
    const original = tone === 'original' || artwork.id === 'tactical'
    const elite = decorated && !original
    const path = `img/character/xiaoyun-${artwork.id}-${elite ? 'elite-v1' : original ? 'v1' : artwork.version}.png`
    const asset = assetsByPath.get(path)
    if (!asset)
      throw new Error(`Artwork missing from COS manifest: ${path}`)
    return {
      ...artwork,
      color: original ? '#85cfff' : artwork.color,
      palette: original ? '原版蓝白' : artwork.palette,
      composition: elite ? '精英装饰' : '纯立绘',
      src: asset.webp?.url ?? asset.url,
      thumbnailSrc: asset.thumbnail?.url ?? asset.webp?.url ?? asset.url,
      originalSrc: asset.url,
    }
  })
}

export type ShowcaseArtwork = ReturnType<typeof getShowcaseArtwork>[number]
export const showcaseArtwork = getShowcaseArtwork('role')
