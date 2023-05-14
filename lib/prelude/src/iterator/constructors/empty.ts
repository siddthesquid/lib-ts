import { Result } from "../result"
import { create } from "./create"

const empty = create<never>(() => Result.stop)

export { empty }
