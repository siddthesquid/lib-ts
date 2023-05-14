const tap =
  <T = never>(fn: (value: T) => any) =>
  <T2 extends Parameters<typeof fn>[0]>(value: T2): T2 => {
    fn(value)
    return value
  }

export { tap }
