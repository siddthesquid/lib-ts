const catch_ =
  <T, U>(fn: (error: unknown) => U) =>
  (promise: Promise<T>) =>
    promise.catch(fn)

export { catch_ }
