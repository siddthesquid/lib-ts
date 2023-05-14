const true_ = <Value>(_: Value) => true

const false_ = <Value>(_: Value) => false

const negate = (value: boolean) => !value

type FoldParams<Result> = {
  fnIfFalse: () => Result
  fnIfTrue: () => Result
}

const fold =
  <Result>({ fnIfFalse, fnIfTrue }: FoldParams<Result>) =>
  (value: boolean) =>
    value ? fnIfTrue() : fnIfFalse()

const Transformers = {
  true: true_,
  false: false_,
  negate,
  fold,
}

export { Transformers }
