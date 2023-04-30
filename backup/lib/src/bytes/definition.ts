/*
Bytes represents an immutable union of different data types with implicit
conversions to byte arrays (and therefore, each other).
- immutable: all operations create new byte arrays
- union of data types: utf8, hex, base64, bitmap, int, buffer
- implicit conversions: see below for the different conversions

[Byte 1] [Byte 2] [Bytes 3] [Byte 4]


Supported constructors (and their byte representations):
- string: utf8
- parseHex(string): hex
- parseBase64(string): base64
- bool[]: bitmap (LSB of byte comes before MSB in bitmap)
- parseNumber(numberLike)
- buffer: buffer

Supported types:
- utf8: string

Displays:
- utf8 string

A byte is 8 bits in

*/

namespace Bytes {
  export type Bytes = number
}

export = Bytes
