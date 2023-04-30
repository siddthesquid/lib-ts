type IteratorResultLike<T> = IteratorResult<T> | T

const isIteratorResult = (value: any): value is IteratorResult<any> =>
  typeof value === "object" && typeof value.done === "boolean"

const asIteratorResult = <T>(value: IteratorResultLike<T>): IteratorResult<T> =>
  isIteratorResult(value) ? value : { done: false, value }

type IteratorLike<T> = Iterator<T> | Iterable<T>

const isIterator = (value: any): value is Iterator<any> =>
  typeof value === "object" && typeof value.next === "function"

const isIterable = (value: any): value is Iterable<any> =>
  typeof value === "object" && typeof value[Symbol.iterator] === "function"

const asIterator = <T>(value: IteratorLike<T>): Iterator<T> =>
  isIterator(value) ? value : value[Symbol.iterator]()

const Definitions = {
  isIteratorResult,
  asIteratorResult,
  isIterator,
  isIterable,
  asIterator,
}

export { Definitions }
