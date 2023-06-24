/*

Sequence

Result

  submit
  stop

  map
  flatmap
  filter
  else

  fold

==================

Memo

  create

  push
  pop

  hasNext
  withPeeker

==================

Sequence

  --- Constructors ---

  create
  generate
  constant
  count
  empty
  unit
  try

  --- Transformers ---

  advanced
  chain
  else
  pad

  id

  map
  filter
  flatMap
  flatten
  scan

  concat
  concatMany
  precat,
  precatMany,
  prepend
  append

  limit
  until
  untilWith
  while
  chunk
  split
  sliding

  mux
  alternate

  cross

  zip
  zipMap
  zipOrElse
  zipLeft
  zipLeftOrElse
  zipRight
  zipRightOrElse

  enumerate

  --- Reducers ---

  peek
  reduce
  count
  mkString
  forEach
  forEachAsync
  take
  collect
  head
  tail
  last
  drop
  all
  any
  find

*/

import { Memo } from "./memo"
import { Result } from "./result"

type Peekable<T> = {
  hasNext: () => boolean
  withPeeker: (fn: (peek: () => IteratorResult<T>) => void) => void
}

type Sequence<T> = Iterator<T> & Iterable<T> & Peekable<T>

const construct = <T>(fn: () => IteratorResult<T>): Sequence<T> => {
  let done = false
  const memo = Memo.create<T>()

  const next = () => {
    // Avoid calling fn again if we know we're done
    if (done) {
      return Result.stop
    }

    // Check the memo next
    if (memo.hasNext()) {
      return Result.submit(memo.pop())
    }

    // If the memo is empty, call fn
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

    // Check the memo next
    if (memo.hasNext()) {
      return true
    }

    // The only way to know if fn has more values is to call it
    const result = fn()

    // If fn is done, let's remember that so we don't call fn again
    if (result.done) {
      done = true
      return false
    }

    // If fn gave us another elemnt, it should be the only element in the memo
    memo.replace([result.value])
    return true
  }

  const withPeeker = (fn: (peek: () => IteratorResult<T>) => void) => {
    const buffer: T[] = []
    const peek = () => {
      const result = next()
      if (!result.done) {
        buffer.push(result.value)
      }
      return result
    }
    fn(peek)
    memo.replace(buffer)
  }

  return {
    next,
    [Symbol.iterator]: () => ({
      next: () => next(),
    }),
    hasNext,
    withPeeker,
  }
}

const iter1 = construct(
  (() => {
    let remaining = 10
    return () => {
      if (remaining === 0) {
        return Result.stop
      }
      remaining -= 1
      return Result.submit(remaining)
    }
  })(),
)

console.log([...iter1])

/*

build(
  initial: S
  (submit, stop) => (state: S, value: A) => S
)

*/

// const build = <S, A, T>(
//   initial: S,
//   fn: (submit: (value: T) => void, stop: () => void) => (state: S, value: A) => S,
// ): Sequence<T> => {

// }

const sample = <T>(fn: (submit: (_: T) => void) => T) =>
