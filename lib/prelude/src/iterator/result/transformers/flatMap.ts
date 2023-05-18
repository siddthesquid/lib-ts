import { Constructors } from "../constructors"
import { Reducers } from "../reducers"
import { orElse } from "./orElse"

type FlatMapResult<
  A extends IteratorResult<any>,
  B extends IteratorResult<any>,
> = A extends IteratorResult<infer A2>
  ? B extends IteratorResult<infer B2>
    ? IteratorResult<A2 | B2>
    : never
  : never

const flatMap = <A, B, C = never>(
  fn: (value: A) => IteratorResult<B>,
  ifDone?: () => IteratorResult<C>,
) => Reducers.fold(fn, ifDone || (() => Constructors.stop))

export { flatMap }
