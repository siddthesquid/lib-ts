const fold =
  <A, B>(ifHasNext: (value: A) => B, elseIfDone: () => B) =>
  (next: IteratorResult<A>): B =>
    next.done ? elseIfDone() : ifHasNext(next.value)

export { fold }
