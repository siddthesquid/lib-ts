const negate = (value: boolean) => !value

const fold =
  <Result>(fnIfTrue: () => Result, fnIfFalse: () => Result) =>
  (value: boolean) =>
    value ? fnIfTrue() : fnIfFalse()

const Transformers = {
  negate,
  fold,
}

export { Transformers }
