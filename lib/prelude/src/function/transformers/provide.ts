const provide =
  <T>(value: T) =>
  <U>(fn: (value: T) => U) =>
    fn(value)

export { provide }
