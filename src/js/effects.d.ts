export interface EntranceOptions {
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  duration?: number
  delay?: number
  distance?: number
  disabled?: boolean
}
export interface EntranceController {
  play(options?: EntranceOptions): void
  cancel(): void
  destroy(): void
}
export interface CountUpOptions {
  value?: number
  from?: number
  duration?: number
  delay?: number
  disabled?: boolean
}
export interface CountUpController {
  play(options?: CountUpOptions): void
  update(value: number): void
  finish(): void
  destroy(): void
}
export function createEntrance(element: HTMLElement, options?: EntranceOptions): EntranceController
export function createCountUp(render: (value: number) => void, options?: CountUpOptions, view?: Window): CountUpController
