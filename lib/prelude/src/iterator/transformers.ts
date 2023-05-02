/*
  Iterator transformers

  map
  filter
  flatMap
  flatten

  chunk
  chunkUntil
  chunkWhile
  prepend
  append
  until
  while

  mux
  concat
  zip
  zipOrElse
  zipLeft
  zipLeftOrElse
  zipRight
  zipRightOrElse
  enumerate
*/
import { X } from "../function"

import { Definitions, IteratorLike } from "./definitions"

const map =
  <A, B>(fn: (value: A) => B) =>
  (iterator: IteratorLike<A>): Iterator<B> =>


const Transformers = {}

export { Transformers }
