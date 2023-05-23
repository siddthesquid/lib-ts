import { Opt, Option } from "./opt"

type Sequence<T> = {
  next: () => Option<T>
  buffer: (transform: (_: Sequence<T>) => Sequence<T>) => T[]
}

// const create = <T>(next: () => Option<T>): Sequence<T> => {
//   let buffer: T[] = []

/*
Sequence has a memo, which allows it to buffer values, but
*/
