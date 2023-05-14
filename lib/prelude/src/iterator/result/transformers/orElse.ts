import { X } from "../../.."

import { Constructors } from "../constructors"
import { Reducers } from "../reducers"

const orElse = <A>(fn: () => A) =>
  Reducers.fold(X.id, Constructors.submit(fn()))

export { orElse }
