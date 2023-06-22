import { X } from "../function"
import { Memo } from "./memo"
import { Result } from "./result"

const HAS_NEXT: unique symbol = Symbol("hasNext")
const PEEK: unique symbol = Symbol("peek")

type Sequence<A> = Iterator<A> &
  Iterable<A> & {
    [HAS_NEXT]: () => boolean
    [PEEK]: <B>(transform: (self: Iterator<A>) => Iterator<B>) => B[]
  }

const construct = <A>(fn: () => IteratorResult<A>): Sequence<A> => {
  const memo = Memo.create<A>()

  const hasNext = () => {
    if (memo.hasNext()) {
      return true
    }
    const result = next()
    if (!result.done) {
      memo.replace([result.value])
    }
    return !result.done
  }

  const next = () => (memo.hasNext() ? Result.submit(memo.pop()) : fn())

  const peek = <B>(transform: (self: Iterator<A>) => Iterator<B>): B[] => {
    const memoBuffer: A[] = []
    const resultBuffer: B[] = []
    const bufferedIterator = {
      next: () => {
        const result = next()
        if (!result.done) {
          memoBuffer.push(result.value)
        }
        return result
      },
    }
    const transformedIterator = transform(bufferedIterator)

    // TODO: cleanup
    let result = transformedIterator.next()
    while (!result.done) {
      resultBuffer.push(result.value)
      result = transformedIterator.next()
    }

    Memo.replace(memoBuffer)(memo)
    return resultBuffer
  }

  return {
    next,
    [HAS_NEXT]: hasNext,
    [PEEK]: peek,
    [Symbol.iterator]: () => ({
      next,
    }),
  }
}

type SequenceLike<A> = Sequence<A> | Iterator<A> | Iterable<A>

const isSequence = <A>(value: any): value is Sequence<A> =>
  typeof value === "object" &&
  typeof value.next === "function" &&
  typeof value[HAS_NEXT] === "function" &&
  typeof value[PEEK] === "function"

const isIterable = <A>(value: any): value is Iterable<A> =>
  typeof value === "object" &&
  value !== null &&
  value[Symbol.iterator] !== undefined &&
  typeof value[Symbol.iterator] === "function"

const isIterator = <A>(value: any): value is Iterator<A> =>
  typeof value === "object" && typeof value.next === "function"

const castSequence = <A>(value: SequenceLike<A>): Sequence<A> =>
  isSequence(value)
    ? value
    : isIterable(value)
    ? // TODO: Can this be cleaned up?
      construct(X.pipe(value[Symbol.iterator](), (iter) => () => iter.next()))
    : construct(() => value.next())

const reduce =
  <State, A>(initial: State, fn: (state: State, value: A) => State) =>
  (iterator: SequenceLike<A>): State => {
    const sequence = castSequence(iterator)
    let state = initial
    let result = sequence.next()
    while (!result.done) {
      state = fn(state, result.value)
      result = sequence.next()
    }
    return state
  }

const forEach = <A>(fn: (value: A) => any) =>
  reduce<void, A>(undefined, (_, value: A) => {
    fn(value)
  })

const collect = <A>(iterator: SequenceLike<A>): A[] => {
  const sequence = castSequence(iterator)
  return [...sequence]
}

const program = X.pipe(
  [1, 2, 3],
  castSequence,
  // forEach(console.log),
  // reduce(0, (sum, value) => sum + value),
  X.tap((x) => x[PEEK]((x) => x)),
  console.log,
)

// type Memoizable<T> = {
//   _memo: Memo<T>
// }

// type Sequence<T> = Iterator<T> &
//   Iterable<T> &
//   Memoizable<T>

// const create = <T>(fn: () => IteratorResult<T>): Sequence<T> => {
//   const _memo = _Memo.create<T>()

//   const next = () => (_memo.hasNext() ? Result.submit(_memo.pop()) : fn())

//   return {
//     next,
//     _memo,
//     [Symbol.iterator]: () => ({
//       next,
//     }),
//   }
// }

// const peek =
//   <T>(transform: (_: Sequence<T>) => Sequence<T>) =>
//   (seq: Sequence<T>): T[] => {
//     const subseq = transform(seq)
//     const values = [...seq]
//     _Memo.replace(values)(subseq._memo)
//     return values
//   }

// const create = <T>(next: () => Option<T>): Sequence<T> => {
//   let buffer: T[] = []
