import { catch_ } from "./catch"
import { finally_ } from "./finally"
import { then } from "./then"

const Transformers = {
  catch: catch_,
  finally: finally_,
  then,
}

export { Transformers }
