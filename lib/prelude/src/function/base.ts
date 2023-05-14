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
  <T = never>(fn: (value: T) => any) =>
  <T2 extends Parameters<typeof fn>[0]>(value: T2): T2 => {
    fn(value)
    return value
  }

const provide =
  <T>(value: T) =>
  <U>(fn: (value: T) => U) =>
    fn(value)

const stateful = <T, U>(fn: () => (_: T) => U) => fn()

const compose =
  <U, V>(fn1: (value: U) => V) =>
  <T>(fn0: (value: T) => U) =>
  (value: T) =>
    fn1(fn0(value))

const debugWith = (tag: string = "DEBUG: ") =>
  tap((value_) => console.log(`${tag || ""}${JSON.stringify(value_, null, 2)}`))

const debug = debugWith("")

const Base = {
  as,
  sync,
  id,
  declare,
  tap,
  provide,
  compose,
  stateful,
  debug,
  debugWith,
}

export { Base }
