type BoolLike = () => boolean | boolean

const asBool = (value: BoolLike): boolean =>
  typeof value === "function" ? value() : value

const Definitions = {
  asBool,
}

export { Definitions }

const f1 = (a: number, b: string) => {}
const f2 = (c: boolean, d: void, e?: number) => {}

type F1 = Parameters<typeof f1>
type F2 = Parameters<typeof f2>
type F1F2 = [...F1, ...F2]
