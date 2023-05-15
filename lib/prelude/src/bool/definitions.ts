type BoolLike = () => boolean | boolean

const asBool = (value: BoolLike): boolean =>
  typeof value === "function" ? value() : value

const Definitions = {
  asBool,
}

export { Definitions }
