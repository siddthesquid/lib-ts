import { Result } from "../result"
import { create } from "./create"

type GenerateOptions = {
  shouldContinue?: () => boolean
}

const GenerateDefaults = {
  shouldContinue: () => true,
}

const generate = <T>(fn: () => T, options?: GenerateOptions) => {
  const { shouldContinue } = { ...GenerateDefaults, ...options }
  return create(() => (shouldContinue() ? Result.submit(fn()) : Result.stop))
}

export { generate }
