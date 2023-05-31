const tap =
  <T>(fn: (value: T) => any) =>
  (value: T): T => {
    fn(value)
    return value
  }

export { tap }
