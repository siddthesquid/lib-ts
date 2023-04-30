// Memory is just a wrapper around Buffer, but it's a little more convenient to
// use.

type Memory = Buffer

function range(end: number): Iterable<number>
function range(start: number, end: number, step?: number): Iterable<number>
function range(
  startOrEnd: number,
  endMaybe?: number,
  step: number = 1,
): Iterable<number> {
  const start = endMaybe === undefined ? 0 : startOrEnd
  const end = endMaybe === undefined ? startOrEnd : endMaybe
  return {
    [Symbol.iterator]: () => {
      let i = start
      return {
        next: () => {
          const value = i
          const done = i >= end
          i += step
          return { value, done }
        },
      }
    },
  }
}

const random = () => Math.floor(Math.random() * 256)

const malloc = (size: number): Memory => Buffer.alloc(size)

const mallocUnsafe = (size: number): Memory => Buffer.allocUnsafe(size)

const mallocRandom = (size: number): Memory => {
  const memory = mallocUnsafe(size)
  Array.from(range(0, memory.length)).forEach((i) => {
    memory[i] = random()
  })

  return memory
}

const DEFAULT_BYTES_PER_BLOCK = 2
const DEFAULT_BLOCKS_PER_LINE = 16

const hexStringCustom =
  (options?: { bytesPerBlock?: number; blocksPerLine?: number }) =>
  (memory: Memory): string => {
    const hexRaw = memory.toString("hex").toUpperCase()
    const blockSize = (options?.bytesPerBlock || DEFAULT_BYTES_PER_BLOCK) * 2
    const numBlocks = Math.ceil(hexRaw.length / blockSize)
    const blocksPerLine = options?.blocksPerLine || DEFAULT_BLOCKS_PER_LINE
    const numLines = Math.ceil(numBlocks / blocksPerLine)
    const blocks = [...range(numBlocks)].map((i) =>
      hexRaw.slice(i * blockSize, (i + 1) * blockSize),
    )
    const lines = [...range(numLines)].map((i) =>
      blocks.slice(i * blocksPerLine, (i + 1) * blocksPerLine).join(" "),
    )
    return lines.join("\n")
  }

const hexString = hexStringCustom({
  blocksPerLine: DEFAULT_BLOCKS_PER_LINE,
  bytesPerBlock: DEFAULT_BYTES_PER_BLOCK,
})

const mapMemoryBlock =
  (blockSize: number, f: (index: number) => (block: Buffer) => any) =>
  (memory: Memory): Memory => {
    const numBlocks = Math.ceil(memory.length / blockSize)
    Array.from(range(numBlocks)).forEach((i) => {
      const block = memory.subarray(i * blockSize, (i + 1) * blockSize)
      f(i)(block)
    })
    return memory
  }

// const mapMemoryMatrix =
//   <N extends number[]>(dimensions: N, f: (index: N) => (block: Buffer) => any) =>
//   (memory: Memory): Memory => {
//     dimensions.
//     const numBlocks = dimensions.reduce((a, b) => a * b, 1)
//     Array.from(range(numBlocks)).forEach((i) => {
//     return memory
//   }
const fill =
  (value: number) =>
  (memory: Memory): Memory => {
    memory.fill(value)
    return memory
  }

const zero = (memory: Memory): Memory => {
  memory.toJSON
  memory.fill(0)
  return memory
}

const _MemoryUtil = {
  malloc,
  mallocUnsafe,
  mallocRandom,
  hexStringCustom,
  hexString,
  mapMemoryBlock,
  fill,
  zero,
}

export default _MemoryUtil
