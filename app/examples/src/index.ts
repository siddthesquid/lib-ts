import { Iter, X } from "@siddthesquid/prelude"

const program = X.flow(
  X.declare<number>(),
  (x) => x + 1,
  (x) => x * 2,
  Buffer.alloc,
)
