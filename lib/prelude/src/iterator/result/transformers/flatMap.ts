import { Constructors } from "../constructors"
import { Reducers } from "../reducers"
import { orElse } from "./orElse"

const flatMap = <A, B>(fn: (value: A) => IteratorResult<B>) =>
  Reducers.fold(fn, () => Constructors.stop)

export { flatMap }
