import { flow, pipe, X } from "#"

const main = async () => {
  const double = (x: number) => x * 2
  const asString = (x: number) => x.toString()
  const repeat = (x: string) => x.repeat(2)
  const parse = (x: string) => {
    const result = parseInt(x, 10)
    if (isNaN(result)) {
      throw new Error("NaN")
    }
    return result
  }
  const concat = (x: string) => (y: string) => x.concat(y)

  let a: string

  const program = flow(
    double,
    flow(
      asString,
      X.tap((x) => {
        a = x
      }),
      X.debug,
      repeat,
      X.debugWith(),
      repeat,
      X.as("4213"),
      X.debugWith(),
    ),
    parse,
    flow(double, double, double),
    asString,
    (s) => pipe(s, parse),
    X.tap((x) => console.log(x)),
    X.debugWith("yoo: "),
    X.tap(double),
    (x) => x + 1,
    (x) => () => x,
    X.provide(2),
    X.sync(() => 100),
    X.tap(() => {
      console.log(a)
    }),
    X.debug,
  )

  const result = program(2)

  console.log(result)
}

const main2 = async () => {
  const program = flow(
    X.declare<Buffer>(), //
    X.tap(
      flow(X.hexStringCustom({ bytesPerBlock: 8, blocksPerLine: 8 }), X.debug),
    ),
    X.mapMemoryBlock(4, (index) => X.fill(index)),
    X.tap(
      flow(X.hexStringCustom({ bytesPerBlock: 8, blocksPerLine: 8 }), X.debug),
    ),
    X.zero,
  )
  console.log(X.hexString(program(X.mallocRandom(245))))
}

const main3 = async () => {
  process.stdout.on("resize", () => {
    console.log("screen size has changed!")
    console.log(`${process.stdout.columns}x${process.stdout.rows}`)
  })
  process.stdout.cursorTo(0, 0)
  process.stdout.clearScreenDown()
  process.stdout.write("hello")
  process.stdout.cursorTo(0, 1)
  process.stdout.write("hello")
  process.stdout.cursorTo(0, 2)
  process.stdout.write("hello")
  process.stdout.cursorTo(0, 3)
  process.stdout.write("hello")
  await new Promise((resolve) => setTimeout(resolve, 10000))
}

const main4 = async () => {
  const someFunc = () => {
    throw new Error("somefunc")
  }
  someFunc()
}

const main5 = async () => {
  const longstring = "hello".repeat(10501)

  // we want to time two different ways of making a giant string
  // - concatenation of 100 longstrings
  // - array of 100 longstrings joined with empty string
  // this a third version where we preallocate a buffer and fill it with the
  // strings
  const buffer = Buffer.allocUnsafe(10000 * longstring.length)
  const longStringAsBuffer = Buffer.from(longstring)
  const start3 = performance.now()
  let offset = 0
  for (let i = 0; i < 10000; i++) {
    offset += buffer.copy(longStringAsBuffer, offset)
  }
  const end3 = performance.now()
  console.log("buffer write took", end3 - start3, "ms")

  // use performance.now() instead of Date.now() for more accurate results
  const start = performance.now()
  let result = ""
  for (let i = 0; i < 10000; i++) {
    result += longstring
  }
  const end = performance.now()
  console.log("concatenation took", end - start, "ms")

  const prefilled = Array(10000).fill(longstring)
  const start2 = performance.now()
  const result2 = prefilled.join("")
  const end2 = performance.now()
  console.log("array join took", end2 - start2, "ms")
}

Array.prototype.join

main5()

/*
List of data structures:
  Array
  LinkedList
  Stack
  Queue
  PriorityQueue
  Tree
  Trie
  HashSet
  SortedSet
  OrderedSet
  HashMap
  SortedMap
  OrderedMap
  BloomFilter
  Graph
  DisjointSet
  Heap
  BinaryHeap
  FibonacciHeap
  UnionFind
  SegmentTree
  FenwickTree
  SuffixArray
  SuffixTree
  SparseTable
  DisjointSparseTable
  WaveletMatrix
  CartesianTree
  ScapegoatTree
  Treap
  AVLTree
  RedBlackTree
  BTree
  BPlusTree
  BStarTree
  SplayTree
  LeftistTree
  KdTree
  IntervalTree
  RangeTree
  SuffixTree
  SuffixArray
  SuffixAutomaton
  SuffixTrie
  SuffixLinkTree
  SuffixLinkArray
  SuffixLinkAutomaton


List of algorithms:
  Binary Search
  Linear Search
  Jump Search
  Interpolation Search
  Exponential Search
  Ternary Search
  Fibonacci Search
  Sublist Search (Search a linked list in another list)
  Recursive program to linearly search an element in a given array
  Recursive function to do substring search
  Iterative Function to do substring search
  Naive Pattern Searching
  Rabin Karp Algorithm for Pattern Searching
  Finite Automata Pattern Searching
  KMP Algorithm for Pattern Searching
  Boyer Moore Algorithm for Pattern Searching
  Z Algorithm for Pattern Searching
  Naive Algorithm for Pattern Searching
  Djikstra's Algorithm
  Bellman Ford Algorithm
  Floyd Warshall Algorithm
  Kruskal's Algorithm
  Prim's Algorithm
  Topological Sorting
  Johnson's Algorithm
  Tarjan's Algorithm
  Kosaraju's Algorithm
  Ford Fulkerson Algorithm
  Edmonds Karp Algorithm
  Dinic's Algorithm
  Hopcroft Karp Algorithm
  Hungarian Algorithm

*/
