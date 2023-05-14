import { generate } from "./generate"

type FromOptions = {
  end?: number
  step?: number
}

const FromDefaults = {
  step: 1,
}

const from = (start: number, options: FromOptions) => {
  const { end, step } = { ...FromDefaults, ...options }
  let current = start
  return generate(
    () => {
      const old = current
      current += step
      return old
    },
    {
      shouldContinue: () => end === undefined || current <= end,
    },
  )
}

export { from }
