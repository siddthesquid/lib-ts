import { Constructors } from "./constructors"
import { Reducers } from "./reducers"
import { Transformers } from "./transformers"

const Result = {
  ...Constructors,
  ...Reducers,
  ...Transformers,
}

export { Result }
