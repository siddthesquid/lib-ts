const stop: IteratorResult<never> = { value: undefined, done: true }

const submit = <T>(value: T): IteratorResult<T> => ({ value, done: false })

const map =
  <A, B>(fn: (value: A) => B) =>
  (iterator: IteratorResult<A>): IteratorResult<B> =>
    iterator.done ? stop : submit(fn(iterator.value))

const orElse =
  <A>(fn: () => A) =>
  (iterator: IteratorResult<A>): IteratorResult<A> =>
    iterator.done ? submit(fn()) : iterator

const Result = { stop, submit, map, orElse }

export { Result }
