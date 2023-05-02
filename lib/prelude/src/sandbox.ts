import { EventEmitter } from "events"

const arr: number[] = []

const printArr = () => console.log(arr)

const emitter = new EventEmitter()
emitter.on("add", () => {
  printArr()
  arr.push(1)
  printArr()
})
