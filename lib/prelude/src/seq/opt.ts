type Some<T> = {
  value: T
  done: false
}

type None = {
  done: true
}

type Option<T> = Some<T> | None

const some = <T>(value: T): Some<T> => ({ value, done: false })

const none: None = { done: true }

const map =
  <A, B>(fn: (value: A) => B) =>
  (result: Option<A>): Option<B> =>
    result.done ? result : some(fn(result.value))

const flatMap =
  <A, B>(fn: (value: A) => Option<B>) =>
  (result: Option<A>): Option<B> =>
    result.done ? result : fn(result.value)

const filter =
  <T>(fn: (value: T) => boolean) =>
  (result: Option<T>): Option<T> =>
    result.done ? result : fn(result.value) ? result : none

const else_ =
  <T>(fn: () => Option<T>) =>
  (result: Option<T>): Option<T> =>
    result.done ? fn() : result

const fold =
  <A, B>(fn: (value: A) => B, elseFn: () => B) =>
  (result: Option<A>): B =>
    result.done ? elseFn() : fn(result.value)

const Opt = {
  some,
  none,
  map,
  flatMap,
  filter,
  else: else_,
  fold,
}

export type { Option }
export { Opt }
