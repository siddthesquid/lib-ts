import { X } from ".."

const stop: IteratorResult<never> = { value: undefined, done: true }

const submit = <T>(value: T): IteratorResult<T> => ({ value, done: false })

const fold =
  <A, B>(elseIfDone: B, fnIfNotDone: (value: A) => B) =>
  (next: IteratorResult<A>): B =>
    next.done ? elseIfDone : fnIfNotDone(next.value)

const map = <A, B>(fn: (value: A) => B) => fold(stop, X.flow(fn, submit))

const orElse = <A>(fn: () => A) => fold(submit(fn()), X.id)

const Result = { stop, submit, map, orElse, fold }

export { Result }
