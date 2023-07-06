import { Result } from "./result"

type Cache<T> = Iterator<T> &
  Iterable<T> & {
    isEmpty: () => boolean
    push: (...items: T[]) => void
    withPeeker: (fn: (peeker: Iterator<T>) => void) => void
  }

const create = <T>(): Cache<T> => {
  let buffer: T[] = []
  let nextIndex = 0

  const _size = () => buffer.length - nextIndex

  const next = () => {
    if (_size() === 0) {
      buffer = []
      nextIndex = 0
      return Result.stop
    }
    const value = buffer[nextIndex]!
    nextIndex += 1
    return Result.submit(value)
  }

  const isEmpty = () => _size() === 0

  const push = buffer.push

  const withPeeker = (fn: (peeker: Iterator<T>) => unknown) => {
    const peeker = (): Iterator<T> => {
      let localIndex = nextIndex
      return {
        next: () => {
          if (localIndex >= buffer.length) {
            return Result.stop
          }
          const value = buffer[localIndex]!
          localIndex += 1
          return Result.submit(value)
        },
      }
    }
    fn(peeker())
  }

  return {
    next,
    isEmpty,
    push,
    withPeeker,
    [Symbol.iterator]: () => ({
      next,
    }),
  }
}

const _Cache = {
  create,
}

export { _Cache }
