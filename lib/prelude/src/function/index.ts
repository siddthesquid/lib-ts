import { Base } from "./base"
import { Compose } from "./compose"
import { Promise_ } from "./promise"

const X = {
  ...Base,
  ...Promise_,
  ...Compose,
}

export { X }
