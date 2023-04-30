// With an iterable, we can
// - map
// - filter
// - reduce
// - zip
// - zipOrElse
// - flatMap
// - traverse
// - repeat
// - take
// - concat
// - drop
// - first
// - rest
// - until
// - while
// - to
// - collect
// - mux
// - demux
// - tee
//
// - iterables are lazy, so we should try to maintain that
// - iterables have an end
//
// common iterables:
// - count => iterable<number>
// - range => iterable<number>
// - countn => iterable<bigint>
// - rangen => iterable<bigint>
//
//
// An iterable has the following structure
// {
//   [Symbol.iterator]: () => {
//     next: () => {
//       value: T | undefined
//       done: boolean
//     }
//   }
// }
// [Symbol.iterator] is called to get an iterator
//
//
import { flow, pipe, X } from "#"

type Mutable<T> = {
  access: () => T
  assign: (value: T) => void
  mutate: (_: (value: T) => void) => void
}

const throwIfUndefined =
  (message: string) =>
  <T>(value: T | undefined): T => {
    if (value === undefined) {
      throw new Error(message)
    }
    return value
  }

const stop: IteratorResult<never> = { value: undefined, done: true }

const submit = <T>(value: T): IteratorResult<T> => ({ value, done: false })

const createIterable = <S, T>(
  initial: S,
  next: (state: S) => IteratorResult<T>,
): Iterable<T> => ({
  [Symbol.iterator]: () => ({
    next: () => next(initial),
  }),
})

const createIterableClosure = <T>(
  next: () => IteratorResult<T>,
): Iterable<T> => ({
  [Symbol.iterator]: () => ({
    next,
  }),
})

const iter = <T>(iterable: Iterable<T>): Iterator<T> =>
  iterable[Symbol.iterator]()

function range(end: number): Iterable<number>

function range(start: number, end: number, step?: number): Iterable<number>

function range(
  startOrEnd: number,
  endMaybe?: number,
  step: number = 1,
): Iterable<number> {
  const start = endMaybe === undefined ? 0 : startOrEnd
  const end = endMaybe === undefined ? startOrEnd : endMaybe
  let current = start
  return createIterableClosure(() => {
    const value = current
    const done = current >= end
    current += step
    return done ? stop : submit(value)
  })
}

const count = (start: number = 0): Iterable<number> => {
  let current = start
  return createIterableClosure(() => {
    const value = current
    current += 1
    return submit(value)
  })
}

const constant = <T>(value: T): Iterable<T> =>
  createIterableClosure(() => submit(value))

const take =
  (n: number) =>
  <T>(iterable: Iterable<T>): Iterable<T> => {
    const iterator = iter(iterable)
    let numTaken = 0
    return createIterableClosure(() => {
      if (numTaken >= n) {
        return stop
      }
      numTaken += 1
      return iterator.next()
    })
  }

const drop =
  (n: number) =>
  <T>(iterable: Iterable<T>): Iterable<T> => {
    const iterator = iter(iterable)
    let numDropped = 0
    return createIterableClosure(() => {
      while (numDropped < n) {
        iterator.next()
        numDropped += 1
      }
      return iterator.next()
    })
  }

const collect = <T>(iterable: Iterable<T>): T[] => {
  const result: T[] = []
  const iterator = iter(iterable)
  while (true) {
    const { value, done } = iterator.next()
    if (done) {
      return result
    }
    result.push(value)
  }
}

const head = <T>(iterable: Iterable<T>): T | undefined => {
  const iterator = iter(iterable)
  const { value, done } = iterator.next()
  return done ? undefined : value
}

const tail = <T>(iterable: Iterable<T>): Iterable<T> | undefined => {
  const iterator = iterable[Symbol.iterator]()
  const { done } = iterator.next()
  return done ? undefined : { [Symbol.iterator]: () => iterator }
}

const map =
  <A, B>(f: (a: A) => B) =>
  (iterable: Iterable<A>): Iterable<B> =>
    createIterable(iter(iterable), (iterator) => {
      const { value, done } = iterator.next()
      return done ? stop : submit(f(value))
    })

const filter =
  <T>(predicate: (t: T) => boolean) =>
  (iterable: Iterable<T>): Iterable<T> =>
    createIterable(iter(iterable), (iterator) => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { value, done } = iterator.next()
        if (done) {
          return stop
        }
        if (predicate(value)) {
          return submit(value)
        }
      }
    })

const forEach =
  <T>(f: (t: T) => void) =>
  (iterable: Iterable<T>): Iterable<T> => {
    const iterator = iter(iterable)
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { value, done } = iterator.next()
      if (done) {
        return iterable
      }
      f(value)
    }
  }

const reduce =
  <A, I>(initial: I, f: (acc: I, next: A) => I) =>
  (iterable: Iterable<A>): I => {
    let result = initial
    forEach((next: A) => {
      result = f(result, next)
    })(iterable)
    return result
  }

const zip = <T extends Iterable<any>[]>(
  ...iterables: T
): Iterable<{
  [K in keyof T]: T[K] extends Iterable<infer U> ? U : never
}> => {
  const iterators = iterables.map(iter)
  return createIterableClosure(() => {
    const values = iterators.map((iterator) => {
      const { value, done } = iterator.next()
      return done ? stop : submit(value)
    })
    if (values.some((value) => value.done)) {
      return stop
    }
    return submit(values.map((value) => value.value)) as any
  })
}

const zipOrElse = <T extends Iterable<any>[], I>(
  defaultValue: I,
  ...iterables: T
): Iterable<{
  [K in keyof T]: T[K] extends Iterable<infer U> ? U | I : never
}> => {
  const iterators = iterables.map(iter)
  return createIterableClosure(() => {
    const values = iterators.map((iterator) => iterator.next())
    if (values.every((value) => value.done)) {
      return stop
    }
    return submit(
      values.map(({ done, value }) => (done ? defaultValue : value)),
    ) as any
  })
}

const peek = <T>(iterable: Iterable<T>): IteratorResult<T> => {
  const iterator = iter(iterable)
  const result = iterator.next()
  return result
}

// const until =
//   <T>(predicate: (t: T) => boolean) =>
//   (iterable: Iterable<T>): Iterable<T> =>

// `until` takes a predicate and an iterable and returns an iterable

const program = flow(
  X.as(count()), //
  take(10),
  drop(3),
  collect,
  X.tap(forEach(X.debugWith(""))),
  reduce(0, (acc, next) => acc + next),
  X.debugWith(""),
)

program()
