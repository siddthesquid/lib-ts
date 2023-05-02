/*
  Iterator transformers

  map
  filter
  flatMap
  flatten

  chunk
  chunkUntil
  chunkWhile
  prepend
  append
  concat
  until
  while

  mux
  zip
  zipOrElse
  zipLeft
  zipLeftOrElse
  zipRight
  zipRightOrElse
  enumerate
*/
import { X } from "../function"

import { Constructors } from "./constructors"
import { Definitions, IteratorLike } from "./definitions"
import { Result } from "./result"

const map =
  <A, B>(fn: (value: A) => B) =>
  (iterator: IteratorLike<A>): Iterator<B> => {
    const iter = Definitions.asIterator(iterator)
    return Constructors.create(X.flow(iter.next, Result.map(fn)))
  }

const filter =
  <A>(fn: (value: A) => boolean) =>
  (iterator: IteratorLike<A>): Iterator<A> => {
    const iter = Definitions.asIterator(iterator)
    return Constructors.create(() => {
      let next = iter.next()
      while (!next.done && !fn(next.value)) {
        next = iter.next()
      }
      return next
    })
  }

// from https://stackoverflow.com/a/61507516/1521496
type DeIterable<T extends IteratorLike<any>> = T extends IteratorLike<infer U>
  ? U
  : never

const flatten = <T extends IteratorLike<IteratorLike<any>>>(
  iterator: T,
): Iterator<DeIterable<DeIterable<T>>> => {
  const iter = Definitions.asIterator(iterator)
  const _nextInnerIter = () =>
    X.pipe(iter.next(), Result.map(Definitions.asIterator))
  let inner = _nextInnerIter()
  return Constructors.create(() => {
    if (inner.done) {
      return Result.stop
    }
    const next = inner.value.next()
    if (next.done) {
      inner = X.pipe(iter.next(), Result.map(Definitions.asIterator))
      return Result.stop
    }
    return next
  })
}

const flatMap = <A, B>(fn: (value: A) => IteratorLike<B>) =>
  X.flow(map(fn), flatten)

const Transformers = { map, filter, flatten, flatMap }

export { Transformers }
