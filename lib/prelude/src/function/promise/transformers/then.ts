const then =
  <T, U>(fn: (value: T) => U) =>
  (promise: Promise<T>) =>
    promise.then(fn)

export { then }
