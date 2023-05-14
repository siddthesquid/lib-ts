const stop: IteratorResult<never> = { value: undefined, done: true }

const submit = <T>(value: T): IteratorResult<T> => ({ value, done: false })

const map =
  <A, B>(fn: (value: A) => B) =>
  (next: IteratorResult<A>): IteratorResult<B> =>
    next.done ? stop : submit(fn(next.value))

const orElse =
  <A>(fn: () => A) =>
  (next: IteratorResult<A>): IteratorResult<A> =>
    next.done ? submit(fn()) : next

const fold =
  <A, B>(fnIfDone: () => B, fnIfNotDone: (value: A) => B) =>
  (next: IteratorResult<A>): B =>
    next.done ? fnIfDone() : fnIfNotDone(next.value)

const Result = { stop, submit, map, orElse, fold }

export { Result }
