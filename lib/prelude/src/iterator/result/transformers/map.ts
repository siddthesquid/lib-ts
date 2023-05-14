import { X } from "../../.."

import { Constructors } from "../constructors"
import { Reducers } from "../reducers"

const map = <A, B>(fn: (value: A) => B) =>
  Reducers.fold(X.flow(fn, Constructors.submit), () => Constructors.stop)

export { map }
