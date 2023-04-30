const as =
  <T>(value: T) =>
  () =>
    value

const sync = <T>(value: () => T) => value

const id = <T>(value: T) => value

const declare =
  <T>() =>
  (value: T) =>
    value

const tap =
  <T>(fn: (value: T) => any) =>
  (value: T): T => {
    fn(value)
    return value
  }

const provide =
  <T>(value: T) =>
  <U>(fn: (value: T) => U) =>
    fn(value)

const compose =
  <U, V>(fn1: (value: U) => V) =>
  <T>(fn0: (value: T) => U) =>
  (value: T) =>
    fn1(fn0(value))

const debugWith =
  (tag: string = "DEBUG: ") =>
  <T>(value: T) =>
    tap<T>((value_) =>
      console.log(`${tag || ""}${JSON.stringify(value_, null, 2)}`),
    )(value)

const debug = debugWith("")

const Base = {
  as,
  sync,
  id,
  declare,
  tap,
  provide,
  compose,
  debug,
  debugWith,
}

export { Base }
