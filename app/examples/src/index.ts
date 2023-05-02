import { Iter, X } from "@siddthesquid/prelude"

const program = X.pipe(
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  Iter.flatten,
  Iter.filter((x) => x % 2 === 0),
  Iter.map((x) => x * 2),
  Iter.map((x) => x.toFixed(2)),
  Iter.join(", "),
)

console.log(program)

const a = Iter.flatten([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
])
