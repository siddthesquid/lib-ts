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

declare global {
  interface Array<T> {
    snail(rowsCount: number, colsCount: number): number[][]
  }
}

type Position = "top" | "bottom"

Array.prototype.snail = function (
  rowsCount: number,
  colsCount: number,
): number[][] {
  if (rowsCount * colsCount != this.length || rowsCount <= 0 || colsCount <= 0)
    return []
  let result = []
  let row = 0

  while (row < rowsCount) {
    let position: Position = "top"

    let col = 0
    while (col < colsCount) {
      if (position == "top") {
        const index = col * rowsCount + row
        result.push(this[index])
        position = "bottom"
      } else {
        const index = col * rowsCount + (rowsCount - row - 1)
        result.push(this[index])
        position = "top"
      }
    }
  }

  return result
}
