import { Memo, _Memo } from "./memo"
import { Result } from "./result"

type Memoizable<T> = {
  _memo: Memo<T>
}

type Sequence<T> = Iterator<T> &
  Iterable<T> &
  Memoizable<T>

const create = <T>(fn: () => IteratorResult<T>): Sequence<T> => {
  const _memo = _Memo.create<T>()

  const next = () => (_memo.hasNext() ? Result.submit(_memo.pop()) : fn())

  return {
    next,
    _memo,
    [Symbol.iterator]: () => ({
      next,
    }),
  }
}

const _peekableSequence = <T>(seq: Sequence<T>): Sequence<T> => {

const peek =
  <T>(transform: (_: Sequence<T>) => Sequence<T>) =>
  (seq: Sequence<T>): T[] => {
    const subseq = transform(seq)
    const values = [...seq]
    _Memo.replace(values)(subseq._memo)
    return values
  }

const

// const create = <T>(next: () => Option<T>): Sequence<T> => {
//   let buffer: T[] = []

/*
Sequence has a memo, which allows it to buffer values, but
*/
