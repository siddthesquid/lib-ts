const compose =
  <U, V>(fn1: (value: U) => V) =>
  <T>(fn0: (value: T) => U) =>
  (value: T) =>
    fn1(fn0(value))

export { compose }
