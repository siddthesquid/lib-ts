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
    Iter.untilWith((x) => x === 2),
    Iter.prepend(0),
    Iter.append(30),
    Iter.chunk(Iter.untilWith((x) => x < 7)),
  ),
  X.flow(
    Iter.map(Iter.reduce(0, (acc, x: number) => acc + x)),
    Iter.forEach((x) => console.log(x)),
  ),
)

/*
until x < 7
0, 7, 9, 8, 7, 1, 2, 39
*/
