const THUNK = Symbol("thunk")

type Program<A> = PromiseLike<A> & {
  [THUNK]: () => Promise<A>
}

type ProgramOptions = {
  catch?: (error: any) => void
  finally?: () => void
  timeoutMs?: number
}

const sync = <A>(fn: () => A): Program<A> => {
  const thunk = () => Promise.resolve(fn())
  return {
    then: (onFulfilled, onRejected) => thunk().then(onFulfilled, onRejected),
    [THUNK]: thunk,
  }
}

const a: [10] = [10]
const d: [20] = [20]

const c: [10, 20] = [...a, ...d]

console.log(c[0])
console.log(c[1])
