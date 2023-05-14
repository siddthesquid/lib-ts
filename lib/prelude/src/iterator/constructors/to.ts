import { generate } from "./generate"

type ToOptions = {
  start?: number
  step?: number
}

const ToDefaults = {
  start: 0,
  step: 1,
}

const to = (end: number, options: ToOptions) => {
  const { start, step } = { ...ToDefaults, ...options }
  let current = start
  return generate(
    () => {
      const old = current
      current += step
      return old
    },
    {
      shouldContinue: () => current <= end,
    },
  )
}

const until = (end: number, options: ToOptions) => to(end - 1, options)

export { to, until }
