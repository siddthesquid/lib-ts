const submit = <T>(value: T): IteratorResult<T> => ({ value, done: false })

const stop: IteratorResult<never> = { value: undefined, done: true }

const map =
  <A, B>(fn: (value: A) => B) =>
  (result: IteratorResult<A>): IteratorResult<B> =>
    result.done ? result : submit(fn(result.value))

const flatMap =
  <A, B>(fn: (value: A) => IteratorResult<B>) =>
  (result: IteratorResult<A>): IteratorResult<B> =>
    result.done ? result : fn(result.value)

const filter =
  <T>(fn: (value: T) => boolean) =>
  (result: IteratorResult<T>): IteratorResult<T> =>
    result.done ? result : fn(result.value) ? result : stop

const else_ =
  <T>(fn: () => IteratorResult<T>) =>
  (result: IteratorResult<T>): IteratorResult<T> =>
    result.done ? fn() : result

const fold =
  <A, B>(fn: (value: A) => B, elseFn: () => B) =>
  (result: IteratorResult<A>): B =>
    result.done ? elseFn() : fn(result.value)

const Result = {
  submit,
  stop,
  map,
  flatMap,
  filter,
  else: else_,
  fold,
}

export { Result }
