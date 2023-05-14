import { Compose } from "./compose"
import { Constructors } from "./constructors"
import { Transformers } from "./transformers"

const X = {
  ...Compose,
  ...Constructors,
  ...Transformers,
}

export { X }
