import { X } from "../../function"
import { create } from "../constructors/create"
import { Definitions, IteratorLike } from "../definitions"

type NextFn<A> = () => IteratorResult<A>

const createTransformer =
  <A, B>(transformNext: (fn: NextFn<A>) => NextFn<B>) =>
  <A2 extends A>(iterator: IteratorLike<A2>) =>
    create(
      X.pipe(
        iterator,
        Definitions.castIterator,
        (iter) => iter.next,
        transformNext,
      ),
    )

export { createTransformer }
