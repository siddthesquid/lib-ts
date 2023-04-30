type Bitmap = {
  getBit: (index: number) => boolean | null
  setBit: (index: number, value: boolean) => void
}
