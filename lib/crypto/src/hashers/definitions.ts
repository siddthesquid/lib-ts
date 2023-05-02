type Bytes = Buffer

type Hasher = {
  hash: (data: Bytes) => Promise<Bytes>
}
