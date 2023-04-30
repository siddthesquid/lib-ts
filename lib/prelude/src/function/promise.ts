const then =
  <T, U>(fn: (value: T) => U) =>
  (promise: Promise<T>) =>
    promise.then(fn)

const catch_ =
  <T, U>(fn: (error: unknown) => U) =>
  (promise: Promise<T>) =>
    promise.catch(fn)

const finally_ =
  <T, U>(fn: () => U) =>
  (promise: Promise<T>) =>
    promise.finally(fn)

const succeed = <T>(value: T) => Promise.resolve(value)

const fail = (error: unknown) => Promise.reject(error)

const Promise_ = {
  then,
  catch: catch_,
  finally: finally_,
  succeed,
  fail,
}

export { Promise_ }
