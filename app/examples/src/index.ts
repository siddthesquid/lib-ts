import { Iter, X } from "@siddthesquid/prelude"

const program = X.pipe(
  [[1, 2, 3], [4, 5, 6], [2], [], [7, 8, 9]],
  Iter.flatten,
  Iter.flatMap((x) => [x, x + 1]),
  Iter.filter((x) => x % 2 === 0),
  Iter.map((x) => x * 2),
  Iter.map((x) => x.toFixed(2)),
  Iter.join(", "),
)

console.log(program)

const someArr = [9, 8, 7]

const program2 = X.pipe(
  [1, 2, 3],
  X.flow(
    Iter.precat(someArr),
    Iter.precatMany([[7]]),
    Iter.concat([4, 5, 6]),
    Iter.concatMany([someArr, someArr, someArr]),
    // Iter.filter((x) => x < 7),
    // Iter.until((x) => x > 3),
    Iter.take(20),
    Iter.prepend(0),
    Iter.append(30),
  ),
  X.flow(X.tap(Iter.forEach((x) => console.log(x)))),
)
