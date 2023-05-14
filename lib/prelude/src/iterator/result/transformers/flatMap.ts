import { Constructors } from "../constructors"
import { Reducers } from "../reducers"

const flatMap = <A, B>(fn: (value: A) => IteratorResult<B>) =>
  Reducers.fold(fn, () => Constructors.stop)

export { flatMap }
