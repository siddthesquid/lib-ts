import { _Cache } from "./cache"
import { Result } from "./result"

const HAS_NEXT = Symbol("HAS_NEXT")
const WITH_PEEKER = Symbol("WITH_PEEKER")

type Peekable<T> = {
  [HAS_NEXT]: () => boolean
  [WITH_PEEKER]: (fn: (peeker: Iterator<T>) => unknown) => void
}

const isPeekable = <T>(value: any): value is Peekable<T> =>
  typeof value === "object" &&
  value !== null &&
  HAS_NEXT in value &&
  WITH_PEEKER in value

type Sequence<T> = Iterator<T> & Iterable<T> & Peekable<T>

type SequenceLike<T> = Sequence<T> | Iterable<T> | Iterator<T>

const isIterator = <T>(value: any): value is Iterator<T> =>
  typeof value === "object" &&
  value !== null &&
  typeof value.next === "function"

const isIterable = <T>(value: any): value is Iterable<T> =>
  typeof value === "object" &&
  value !== null &&
  typeof value[Symbol.iterator] === "function"

const isSequence = <T>(value: any): value is Sequence<T> =>
  isPeekable(value) && isIterator(value) && isIterable(value)

type ConstructParams<T> = {
  next: () => IteratorResult<T>
  hasNext: () => boolean
  withPeeker: (fn: (peeker: Iterator<T>) => unknown) => void
}

const _construct = <T>({
  next,
  hasNext,
  withPeeker,
}: ConstructParams<T>): Sequence<T> => {
  return {
    next,
    [HAS_NEXT]: hasNext,
    [WITH_PEEKER]: withPeeker,
    [Symbol.iterator]: () => ({
      next,
    }),
  }
}

const create = <T>(fn: () => IteratorResult<T>): Sequence<T> => {
  let done = false
  const cache = _Cache.create<T>()

  const next = (): IteratorResult<T> => {
    // Avoid calling fn again if we know we're done
    if (done) {
      return Result.stop
    }

    // Check the cache next
    if (cache.hasNext()) {
      return cache.next()
    }

    // If the cache is empty, call fn
    const result = fn()

    // If fn is done, let's remember that so we don't call fn again
    if (result.done) {
      done = true
    }

    return result
  }

  const hasNext = () => {
    // Being done means no more values
    if (done) {
      return false
    }

    // Check the cache next
    if (cache.hasNext()) {
      return true
    }

    // If the cache is empty, call fn
    const result = fn()

    // If fn is done, let's remember that so we don't call fn again
    if (result.done) {
      done = true
      return false
    }

    cache.push(result.value)
    return true
  }

  const withPeeker = (fn: (peeker: Iterator<T>) => unknown) => {
    const peeker = (): Iterator<T> => {
      const peeked = _construct<T>({
        next,
        hasNext,
        withPeeker,
      })
      return peeked
    }
    fn(peeker())
  }

  return _construct<T>({
    next,
    hasNext,
    withPeeker,
  })
}
