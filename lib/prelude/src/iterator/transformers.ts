/*
  Iterator transformers

  map
  filter
  flatMap
  flatten

  concat
  concatMany
  precat,
  precatMany,
  prepend
  append

  until
  untilWith
  while
  chunk

  mux
  zip
  zipMap
  zipOrElse
  zipLeft
  zipLeftOrElse
  zipRight
  zipRightOrElse
  enumerate
*/
import { Bool } from "../bool"
import { X } from "../function"

import { Constructors } from "./constructors"
import { Definitions, IteratorLike } from "./definitions"
import { Result } from "./result"

const createIterTransformer =
  <A, B>(fn: (iter: Iterator<A>) => Iterator<B>) =>
  (iterator: IteratorLike<A>) =>
    X.pipe(iterator, Definitions.castIterator, fn)

type ResultFnParamToIteratorLike<
  Fn extends (next: IteratorResult<any>) => IteratorResult<any>,
> = Fn extends (next: IteratorResult<infer P>) => any ? IteratorLike<P> : never

const _createTransformer =
  <A, B>(fn: (next: IteratorResult<A>) => IteratorResult<B>) =>
  <A2 extends ResultFnParamToIteratorLike<typeof fn>>(
    iterator: A2,
  ): Iterator<B> =>
    Constructors.create(() =>
      X.pipe(iterator, Definitions.castIterator, (iter) => iter.next(), fn),
    )

const map = <A, B>(fn: (value: A) => B) =>
  createIterTransformer((iter: Iterator<A>) => {
    const nextFn = X.flow(iter.next, Result.map(fn))
    return Constructors.create(nextFn)
  })

const filter = <A>(fn: (value: A) => boolean) =>
  createIterTransformer((iter: Iterator<A>) =>
    Constructors.create(() => {
      let next = iter.next()
      while (!next.done && !fn(next.value)) {
        next = iter.next()
      }
      return next
    }),
  )

// from https://stackoverflow.com/a/61507516/1521496
type DeIterator<T extends IteratorLike<any>> = T extends IteratorLike<infer U>
  ? U
  : never

const flatten = <T extends IteratorLike<IteratorLike<any>>>(
  iterator: T,
): Iterator<DeIterator<DeIterator<T>>> => {
  const iter = Definitions.castIterator(iterator)
  const _nextInnerIter = () =>
    X.pipe(iter.next(), Result.map(Definitions.castIterator))
  let inner = _nextInnerIter()

  return Constructors.create(() => {
    if (inner.done) {
      return Result.stop
    }
    let next = inner.value.next()
    while (next.done) {
      inner = _nextInnerIter()
      if (inner.done) {
        return Result.stop
      }
      next = inner.value.next()
    }
    return next
  })
}

const flatMap = <A, B>(fn: (value: A) => IteratorLike<B>) =>
  X.flow(map(fn), flatten)

const concat = <T>(other: IteratorLike<T>) =>
  createIterTransformer((iter: Iterator<T>) => {
    const otherIter = Definitions.castIterator(other)
    let current = iter
    return Constructors.create(() => {
      let next = current.next()
      if (next.done) {
        current = otherIter
        next = current.next()
      }
      return next
    })
  })

const concatMany = X.flow(flatten, concat)

const append = X.flow(Constructors.single, concat)

const precat =
  <T>(other: IteratorLike<T>) =>
  (iterator: IteratorLike<T>) =>
    X.pipe(other, concat(iterator))

const precatMany = X.flow(flatten, precat)

const prepend = X.flow(Constructors.single, precat)

const limit =
  (n: number) =>
  <T>(iterator: IteratorLike<T>): Iterator<T> => {
    const iter = Definitions.castIterator(iterator)
    let count = 0
    return Constructors.create(() => {
      if (count >= n) {
        return Result.stop
      }
      count += 1
      return iter.next()
    })
  }

const until = <T>(fn: (value: T) => boolean) =>
  createIterTransformer((iter: Iterator<T>) => {
    let done = false
    return Constructors.create(() => {
      if (done) {
        return Result.stop
      }
      const next = iter.next()
      if (next.done || fn(next.value)) {
        done = true
        return Result.stop
      }
      return next
    })
  })

// TODO: Should share code with until
const untilWith = <T>(fn: (value: T) => boolean) =>
  createIterTransformer((iter: Iterator<T>) => {
    let done = false
    return Constructors.create(() => {
      if (done) {
        return Result.stop
      }
      const next = iter.next()
      if (next.done || fn(next.value)) {
        done = true
      }
      return next
    })
  })

const while_ = <T>(fn: (value: T) => boolean) => until(X.flow(fn, Bool.negate))

const chunk = <T>(transform: (iterator: IteratorLike<T>) => Iterator<T>) =>
  createIterTransformer((iter: Iterator<T>) =>
    Constructors.create(() => {
      const anyNext = iter.next()
      if (anyNext.done) {
        return Result.stop
      }
      return Result.submit(X.pipe(iter, prepend(anyNext.value), transform))
    }),
  )

const Transformers = {
  map,
  filter,
  flatten,
  flatMap,
  concat,
  concatMany,
  append,
  precat,
  precatMany,
  prepend,
  limit,
  until,
  untilWith,
  while: while_,
  chunk,
}

export { Transformers }
