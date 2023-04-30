// reduce an iterable to a single value
const reduce =
  <State, Value>(
    initial: State,
    reducer: (state: State, value: Value) => State,
  ) =>
  (iter: Iterator<Value>): State => {
    let state = initial
    let result = iter.next()
    while (!result.done) {
      state = reducer(state, result.value)
      result = iter.next()
    }
    return state
  }

const count = <Value>(iter: Iterator<Value>) =>
  reduce(0, (currentCount) => currentCount + 1)(iter)

const join =
  (seperator: string) =>
  <Value>(iter: Iterator<Value>) => {
    const initialElement = iter.next()
    const initialString = initialElement.done ? "" : `${initialElement.value}`
    const remainingString = reduce(
      "",
      (currentString, nextString) =>
        `${currentString}${seperator}${nextString}`,
    )(iter)
    return `${initialString}${remainingString}`
  }

const forEach =
  <Value>(effect: (value: Value) => void) =>
  (iter: Iterator<Value>) => {
    let result = iter.next()
    while (!result.done) {
      effect(result.value)
      result = iter.next()
    }
  }

const Reducers = {
  reduce,
  count,
  join,
  forEach,
}

export { Reducers }
