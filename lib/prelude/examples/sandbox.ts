import { Iter, X } from "../src"

const program = X.pipe(
  10,
  (x) => x + 10,
  (x) => x.toFixed(2),
)

const arr: number[] = [1, 2, 3]

const program2 = X.pipe(
  //
  arr.values(),
  Iter.forEach((x) => console.log(x)),
)

console.log(program2)

const f =
  <A>(a: A) =>
  <B>(b: B): [A, B] =>
    [a, b]
const g = f(10)
