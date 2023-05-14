import { tap } from "./tap"

const debugWith = (tag: string = "DEBUG: ") =>
  tap((value_) => console.log(`${tag || ""}${JSON.stringify(value_, null, 2)}`))

const debug = debugWith("")

export { debug, debugWith }
