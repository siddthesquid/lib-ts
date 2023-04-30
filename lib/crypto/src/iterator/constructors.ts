const create = <T>(next: () => IteratorResult<T>) => ({ next })

// const createWhile = <T>(next: () => IteratorResult<T>, predicate: (x: T) => boolean) => {
//   const iterator = create(next)
//   const nextWhile = () => {
//     const result = iterator.next()
//     if (result.done) return result
//     if (predicate(result.value)) return result
//     return { done: true, value: undefined }
//   }

const Constructors = { create }

export { Constructors }
