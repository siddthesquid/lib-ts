const create = <T>(next: () => IteratorResult<T>): Iterator<T> => ({ next })

export { create }
