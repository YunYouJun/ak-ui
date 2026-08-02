export type ExampleSurface = 'plain' | 'dark' | 'dust' | 'color'

export interface ExampleDefinition {
  id: string
  title: string
  surface: ExampleSurface
  height: number
  sourceOpen?: boolean
}

export const examples: ExampleDefinition[] = [
  { id: 'foundation/colors', title: 'Color tokens', surface: 'plain', height: 240, sourceOpen: false },
  { id: 'foundation/typography', title: 'Typography', surface: 'plain', height: 250, sourceOpen: false },
  { id: 'button/base', title: 'Base button', surface: 'dark', height: 180 },
  { id: 'button/block', title: 'Block button', surface: 'dark', height: 170 },
  { id: 'button/icon', title: 'Icon button', surface: 'dark', height: 180 },
  { id: 'button/fab', title: 'Floating action button', surface: 'dark', height: 180 },
  { id: 'button/start', title: 'Start button', surface: 'dark', height: 220 },
  { id: 'button/card', title: 'Card button', surface: 'dust', height: 300 },
  { id: 'button-group/gacha', title: 'Gacha actions', surface: 'color', height: 210 },
  { id: 'button-group/action', title: 'Recruitment actions', surface: 'color', height: 240 },
  { id: 'button-group/infrastructure', title: 'Infrastructure actions', surface: 'color', height: 200 },
  { id: 'card/outline', title: 'Outline card', surface: 'plain', height: 200 },
  { id: 'card/stripe', title: 'Stripe card', surface: 'dark', height: 300 },
  { id: 'card/place', title: 'Operator card', surface: 'color', height: 210 },
  { id: 'counter/basic', title: 'Resource counters', surface: 'color', height: 170 },
  { id: 'divider/basic', title: 'Divider', surface: 'dust', height: 170 },
  { id: 'form/text', title: 'Text input and textarea', surface: 'plain', height: 340 },
  { id: 'form/choice', title: 'Choice controls', surface: 'plain', height: 260 },
  { id: 'form/select', title: 'Select', surface: 'plain', height: 190 },
  { id: 'form/input-number', title: 'Input number', surface: 'plain', height: 170 },
  { id: 'fx/glow', title: 'Glow effect', surface: 'dark', height: 180 },
  { id: 'fx/outline', title: 'Outline effect', surface: 'plain', height: 180 },
  { id: 'fx/skew', title: 'Skew effect', surface: 'dark', height: 190 },
  { id: 'icon/stuff', title: 'Material icon', surface: 'plain', height: 210 },
  { id: 'level/basic', title: 'Operation level', surface: 'dust', height: 180 },
  { id: 'loading/basic', title: 'Loading states', surface: 'dark', height: 230 },
  { id: 'media/album', title: 'Album', surface: 'plain', height: 330 },
  { id: 'notice/basic', title: 'Tactical notices', surface: 'plain', height: 380 },
  { id: 'object/cube', title: 'Tactical cubes', surface: 'dark', height: 440 },
  { id: 'overlay/dialog', title: 'Native dialog', surface: 'dark', height: 220 },
  { id: 'overlay/popover', title: 'Popover and tooltip', surface: 'dark', height: 250 },
  { id: 'pagination/basic', title: 'Episode pagination', surface: 'dust', height: 220 },
  { id: 'panel/status', title: 'Status panel', surface: 'dust', height: 650 },
  { id: 'progress/basic', title: 'Operation progress', surface: 'dark', height: 340 },
  { id: 'san/basic', title: 'Sanity status', surface: 'dust', height: 320 },
  { id: 'status/basic', title: 'Tags and terminal status', surface: 'dark', height: 260 },
  { id: 'tabs/basic', title: 'Terminal navigation', surface: 'dark', height: 420 },
]

export const exampleById = new Map(examples.map(example => [example.id, example]))
