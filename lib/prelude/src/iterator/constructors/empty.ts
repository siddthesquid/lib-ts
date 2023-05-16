import { generate } from "./generate"

const empty = generate(() => undefined, { doWhile: () => false })

export { empty }
