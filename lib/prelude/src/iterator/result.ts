const stop: IteratorResult<never> = { value: undefined, done: true }

const submit = <T>(value: T): IteratorResult<T> => ({ value, done: false })

const Result = { stop, submit }

export { Result }
