import { Base } from "./base"
import { flow } from "./flow"
import { pipe } from "./pipe"
import { Promise_ } from "./promise"

const X = {
  ...Base,
  ...Promise_,
}

export { flow, pipe, X }
