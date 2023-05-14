const stateful = <T, U>(fn: () => (_: T) => U) => fn()

export { stateful }
