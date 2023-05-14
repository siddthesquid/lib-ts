import { _Constructors } from "./constructors"
import { _Reducers } from "./reducers"
import { _Transformers } from "./transformers"

const Template = {
  ..._Constructors,
  ..._Reducers,
  ..._Transformers,
}

export { Template }
