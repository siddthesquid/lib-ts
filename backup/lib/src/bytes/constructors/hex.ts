import { z } from "#"

type Hex = {
  readonly _tag: "hex"
  readonly value: string
}

const _hex = (value: string) =>
  ({
    _tag: "hex" as const,
    value,
  } as Hex)

const HexZod = z
  .string()
  .regex(/^(0x)?[0-9a-fA-F]+$/)
  .transform((str) => str.replace(/^0x/, ""))

// const parseHex = flow(Zod.prettyParser(HexZod), _hex)

const isHex = (hex: unknown): hex is Hex =>
  typeof hex == "object" &&
  hex !== null &&
  "value" in hex &&
  "_tag" in hex &&
  (hex as Hex)._tag === "hex"
