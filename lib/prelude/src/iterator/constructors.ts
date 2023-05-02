import { Result } from "./result"

const create = <T>(next: () => IteratorResult<T>): Iterator<T> => ({ next })

const generate = <T>(fn: () => T) => create(() => Result.submit(fn()))

type ConstantOptions = {
  count?: number
}

const ConstantDefaults: ConstantOptions = {}

const constant = <T>(value: T, options: ConstantOptions = ConstantDefaults) => {
  if (options.count === undefined) return create(() => Result.submit(value))
  let remaining = options.count
  return create(() => {
    if (remaining === 0) return Result.stop
    remaining -= 1
    return Result.submit(value)
  })
}

const empty = create<never>(() => Result.stop)

type ToOptions = {
  start?: number
  step?: number
}

const ToDefaults = {
  start: 0,
  step: 1,
}

const to = (end: number, options: ToOptions = ToDefaults) => {
  const { start, step } = { ...ToDefaults, ...options }
  let current = start
  return create(() => {
    if (current > end) return Result.stop
    const value = current
    current += step
    return Result.submit(value)
  })
}

const until = (end: number, options: ToOptions = ToDefaults) =>
  to(end - 1, options)

type FromOptions = {
  end?: number
  step?: number
}

const FromDefaults = {
  step: 1,
}

const from = (start: number, options: FromOptions = FromDefaults) => {
  const { end, step } = { ...FromDefaults, ...options }
  let current = start
  return create(() => {
    if (end !== undefined && current > end) return Result.stop
    const value = current
    current += step
    return Result.submit(value)
  })
}

const Constructors = { create, generate, constant, empty, to, until, from }

export { Constructors }
