import { Constructors } from "./constructors"
import { Definitions } from "./definitions"
import { Reducers } from "./reducers"
import { Transformers } from "./transformers"

const Iter = { ...Definitions, ...Constructors, ...Transformers, ...Reducers }

export { Iter }
