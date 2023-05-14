import { generate } from "./generate"

type ConstantOptions = {
  count?: number
}

const constant = <T>(value: T, options: ConstantOptions) => {
  const { count } = options
  if (count === undefined) return generate(() => value)
  let remaining = count
  return generate(() => value, {
    shouldContinue: () => {
      if (remaining <= 0) return false
      remaining -= 1
      return true
    },
  })
}

const single = <T>(value: T) => constant(value, { count: 1 })

export { constant, single }
