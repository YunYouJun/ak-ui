export interface DashboardDepthOptions {
  layerSelector?: string
  maxX?: number
  maxY?: number
  respectReducedMotion?: boolean
}

export interface DashboardDepthController {
  render: (clientX: number, clientY: number) => void
  reset: () => void
  destroy: () => void
}

export function createDashboardDepth(
  root: Element,
  options?: DashboardDepthOptions,
): DashboardDepthController
