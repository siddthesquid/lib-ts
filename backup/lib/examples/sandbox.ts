import { flow, pipe, X } from "#"

const main1 = async () => {
  const program = flow(
    //
    flow(
      X.declare<number>(),
      X.tap((_) => console.log(_)),
      X.debugWith("BLAG: "),
      (_) => _.toString(),
      X.succeed,
      X.then(parseInt),
      X.then((_) => _ + 1),
      X.then((n) => {
        if (n > 10) {
          throw new Error("BLAR")
        }
        return n
      }),
      X.finally(() => console.log("FINALLY")),
    ),
    X.catch((error) => {
      console.log("ERROR", error)
      return "yo"
    }),
  )
  return program(10)
}

const main2 = async () => {
  const program = flow(
    //
    X.declare<(n: number) => number>(),
    X.compose((_) => _ * 2),
    X.compose((_) => _.toString()),
    X.compose((_) => parseInt(_)),
  )
  return program((n) => n)(10)
}

const main = main2

// main().then(console.log)

const a: number | { a: number } = { a: 1 } as number | { a: number }
const b = a
if (typeof b === "number") {
  console.log(b)
} else {
  console.log(b.a)
  b.a = 20
  console.log(b.a)
  if (typeof a !== "number") {
    console.log(a.a)
  } else {
    console.log(a)
  }
}
