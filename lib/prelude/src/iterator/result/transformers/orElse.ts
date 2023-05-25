import { X } from "../../.."

import { Constructors } from "../constructors"
import { Reducers } from "../reducers"

const orElse = <B>(fn: () => B) =>
  Reducers.fold(X.id, X.flow(fn, Constructors.submit))

export { orElse }
