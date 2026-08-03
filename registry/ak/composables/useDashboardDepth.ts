import { onMounted, onScopeDispose, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

import { createDashboardDepth } from '@yunyoujun/ak-ui/depth'
import type { DashboardDepthController, DashboardDepthOptions } from '@yunyoujun/ak-ui/depth'

export function useDashboardDepth(
  target: MaybeRefOrGetter<Element | null | undefined>,
  options?: DashboardDepthOptions,
) {
  let controller: DashboardDepthController | undefined

  onMounted(() => {
    const element = toValue(target)

    if (element)
      controller = createDashboardDepth(element, options)
  })

  onScopeDispose(() => controller?.destroy())

  return {
    reset: () => controller?.reset(),
  }
}
