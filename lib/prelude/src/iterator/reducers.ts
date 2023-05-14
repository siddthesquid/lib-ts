const reduce =
  <State, Value_>(
    initial: State,
    reducer: (state: State, value: Value_) => State,
  ) =>
  <Value extends Value_>(iter: Iterator<Value>): State => {
    let state = initial
    let result = iter.next()
    while (!result.done) {
      state = reducer(state, result.value)
      result = iter.next()
    }
    return state
  }

const count = reduce(0, (currentCount) => currentCount + 1)

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

const collect = <Value>(iter: Iterator<Value>) => {
  const values: Value[] = []
  forEach((value) => values.push(value))(iter)

const Reducers = {
  reduce,
  count,
  join,
  forEach,
}

export { Reducers }
