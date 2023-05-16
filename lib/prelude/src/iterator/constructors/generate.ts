import { Result } from "../result"
import { create } from "./create"

type GenerateOptions = {
  doWhile?: () => boolean
}

const GenerateDefaults = {
  doWhile: () => true,
}

const generate = <T>(fn: () => T, options?: GenerateOptions) => {
  const { doWhile: shouldContinue } = { ...GenerateDefaults, ...options }
  return create(() => (shouldContinue() ? Result.submit(fn()) : Result.stop))
}

export { generate }
