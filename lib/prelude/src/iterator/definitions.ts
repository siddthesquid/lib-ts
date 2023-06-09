type IteratorLike<T> = Iterator<T> | Iterable<T>

const isIterator = (value: any): value is Iterator<any> =>
  typeof value === "object" && typeof value.next === "function"

const isIterable = (value: any): value is Iterable<any> =>
  typeof value === "object" && typeof value[Symbol.iterator] === "function"

const castIterator = <T>(value: IteratorLike<T>): Iterator<T> =>
  isIterator(value) ? value : value[Symbol.iterator]()

const Definitions = {
  isIterator,
  isIterable,
  castIterator,
}

export { Definitions }
export type { IteratorLike }
