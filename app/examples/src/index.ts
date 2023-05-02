import { Iter, X } from "@siddthesquid/prelude"

const program = X.pipe(
  Iter.from(10, { end: 20 }),
  Iter.reduce(0, (sum, next) => sum + next),
  X.debugWith("sum: "),
)

console.log(program)
