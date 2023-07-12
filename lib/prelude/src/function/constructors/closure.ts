const closure = <T, U>(fn: () => (_: T) => U) => fn()

export { closure }
