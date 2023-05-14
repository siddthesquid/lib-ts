import { compose } from "./compose"
import { debug, debugWith } from "./debug"
import { provide } from "./provide"
import { tap } from "./tap"

const Transformers = {
  tap,
  provide,
  compose,
  debug,
  debugWith,
}

export { Transformers }
