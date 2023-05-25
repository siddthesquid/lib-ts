type Memo<T> = {
  pop: () => T
  hasNext: () => boolean
  replace: (values: T[]) => void
}

const create = <T>(): Memo<T> => {
  let buffer: T[] = []
  let index = 0

  const _size = () => buffer.length - index

  const pop = () => {
    if (_size() === 0) {
      throw new Error("No more values in memo")
    }
    const value = buffer[index]!
    index += 1
    return value
  }

  const hasNext = () => index < buffer.length

  const replace = (values: T[]) => {
    if (index >= buffer.length) {
      buffer = values
      index = 0
    } else if (values.length > index) {
      throw new Error(
        `Memo can only rewind ${index} values, but ${values.length} were provided. This is undefined behavior.`,
      )
    } else {
      index -= values.length
    }
  }

  return {
    pop,
    hasNext,
    replace,
  }
}

const pop = <T>(memo: Memo<T>) => memo.pop()

const hasNext = <T>(memo: Memo<T>) => memo.hasNext()

const replace =
  <T>(values: T[]) =>
  (memo: Memo<T>) =>
    memo.replace(values)

const _Memo = {
  create,
  pop,
  hasNext,
  replace,
}

export type { Memo }
export { _Memo }
