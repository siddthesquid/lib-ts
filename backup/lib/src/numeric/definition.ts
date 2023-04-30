/*
Numeric types can broadly be categorized into:
- fixed length signed integers
- fixed length unsigned integers
- variable length signed integers
- floats (not doubles, because we want to use js numbers)
- fixed point numbers
*/

type IntLength = 8 | 16 | 32 | 64

type BaseInt = {
  readonly _type: "Int"
  readonly _length: IntLength
  readonly _signed: boolean
}

type Int8 = {
  readonly _type: "Int"
  readonly _length: 8
  readonly _signed: boolean
}

type VarInt = bigint

type Float = number
