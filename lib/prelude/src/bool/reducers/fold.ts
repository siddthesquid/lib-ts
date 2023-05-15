type FoldParams<Result> = {
  fnIfFalse: () => Result
  fnIfTrue: () => Result
}

const fold =
  <Result>({ fnIfFalse, fnIfTrue }: FoldParams<Result>) =>
  (value: boolean) =>
    value ? fnIfTrue() : fnIfFalse()

export { fold }
