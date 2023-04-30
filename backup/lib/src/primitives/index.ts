/*
here are the primitive types that javascript has. Primitive meaning possible
outputs of the typeof operator. The typeof operator returns a string
Base
------------
- number
- bigint
- string
- boolean

special
------------
- symbol
- object
- function

- No values
------------
- null
- undefined

- Types of special objects
------------
- Array
- Buffer
- Date
- Error
- Map

below are types that are common to have in other languages, starting with fixed
size primtives
-------------
- unit
- boolean
- char
- int (we are avoiding anything with "long". Prefer to have clearer names)
  - int8
  - int16
  - int32
  - int64
- uint
  - uint8
  - uint16
  - uint32
  - uint64
- double
  - we are going to skip `float` support
- pointer (allows you to modify things in place)

immutable array based (these are all pointers technically)
-----------
- array
- buffer
- varint
- string

mutable types
------------
- array
- buffer
- set, map, graphs, etc.


What is a graph?

Graph
  addEdge :: (a, b) -> Graph
  addVertex

Graph is a mapping from any pair of vertices to a weight. The weight can be
anything, but it is usually a number. The weight can be negative, but it is
usually positive. The weight can be zero, but it is usually not zero.

We want an easy way of iterating over the edges of a graph. We may also change
how we iterate through a graph based on where we have already been.

A graph is
- given a unique ID A
- given a unique ID B
- return a list of all possible weights

- given a unique ID A
- return a list of all edges going out of it

- return a list of all edges


- array
- object


Tag<"yo", X>

*/
