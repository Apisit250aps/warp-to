import z from 'zod'

export const warpSchema = z.object({
  type: z.enum(['av', 'vk', 'ig', 'unknown']),
  content: z
    .string()
    .trim()
    .min(1, 'Please enter a message')
    .max(255, 'Message must be no more than 255 characters')
    .refine((val) => !/(https?:\/\/[^\s]+)/i.test(val), {
      message: 'URLs are not allowed',
    }),
})

export type Warp = z.infer<typeof warpSchema>
