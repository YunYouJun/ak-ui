export interface SectionOptions {
  syncHash?: boolean
  duration?: number
  onChange?: (id: string, index: number) => void
}
export interface SectionController {
  navigate(id: string, options?: { history?: 'push' | 'replace' | 'none'; focus?: boolean; immediate?: boolean }): boolean
  readonly currentId: string
  destroy(): void
}
export function createSectionNavigation(root: HTMLElement, options?: SectionOptions): SectionController
export interface MenuController { open(): void; close(): void; readonly isOpen: boolean; destroy(): void }
export function createMobileMenu(dialog: HTMLDialogElement, options: { trigger: HTMLElement; stagger?: number; duration?: number }): MenuController
export interface GalleryController {
  select(index: number, options?: { focus?: boolean; animate?: boolean }): boolean | void
  refresh(): void
  open(): void
  close(): void
  readonly index: number
  destroy(): void
}
export function createMediaGallery(root: HTMLElement, options?: { initialIndex?: number; loop?: boolean; duration?: number; onChange?: (index: number) => void }): GalleryController
export interface AssetState {
  status: 'idle' | 'loading' | 'ready' | 'error' | 'cancelled'
  completed: number
  total: number
  errors: unknown[]
}
export type AssetTask = (signal: AbortSignal) => unknown | Promise<unknown>
export interface AssetController {
  load(tasks: AssetTask[]): Promise<AssetState>
  cancel(): void
  readonly state: AssetState
  destroy(): void
}
export function createAssetLoader(onChange?: (state: AssetState) => void): AssetController
export type ParticlePattern = 'grid' | 'orbit' | 'wave'
export interface ParticleOptions { count?: number; color?: string; pattern?: ParticlePattern; paused?: boolean; renderer?: 'auto' | '2d' }
export interface ParticleController {
  pause(): void
  resume(): void
  setPattern(pattern: ParticlePattern): void
  readonly renderer: 'webgl' | '2d' | 'static'
  destroy(): void
}
export function createParticleField(canvas: HTMLCanvasElement, options?: ParticleOptions): ParticleController
