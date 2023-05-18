import { X } from "../../function"
import { createTransformer } from "./createTransformer"

const map = <A, B>(fn: (value: A) => B) =>
  createTransformer((next) => X.flow(next, Result.map(fn)))
