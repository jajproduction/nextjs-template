import { initTRPC } from '@trpc/server'
import { ZodError } from 'zod'

export const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error : null
      }
    }
  }
})
