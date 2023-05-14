const finally_ =
  <T, U>(fn: () => U) =>
  (promise: Promise<T>) =>
    promise.finally(fn)

export { finally_ }
