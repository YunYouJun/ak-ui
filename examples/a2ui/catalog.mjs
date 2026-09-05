import { Catalog, childList, componentId } from '@a2ui/web_core/v0_9'
import { z } from 'zod'

// This deliberately small custom catalog is not the A2UI basic catalog.
export const catalogId = 'https://ak-ui.yyj.moe/a2ui/experimental/v1'
const path = z.object({ path: z.string() }).strict()
const text = z.union([z.string(), path])
const number = z.union([z.number(), path])
const action = z.object({
  event: z.object({
    name: z.string(),
    context: z.record(z.union([z.string(), z.number(), z.boolean(), path])).optional(),
  }).strict(),
}).strict().describe('REF:common_types.json#/$defs/Action')

export const catalog = new Catalog(catalogId, [
  { name: 'Column', schema: z.object({ children: childList() }).strict() },
  { name: 'Row', schema: z.object({ children: childList() }).strict() },
  { name: 'Card', schema: z.object({ child: componentId() }).strict() },
  { name: 'Text', schema: z.object({ text }).strict() },
  { name: 'TextField', schema: z.object({ label: text, value: text }).strict() },
  { name: 'Button', schema: z.object({ child: componentId(), action }).strict() },
  { name: 'AkProgress', schema: z.object({ label: text, value: number }).strict() },
])
