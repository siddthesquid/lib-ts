/*
Weird example:

const iter1 = count(1,10) // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

const iter2 = iter1 || limit(5) // 1, 2, 3, 4, 5

const iter3 = iter1 || map(x => x * x) // 1, 4, 9, 16, 25, 36, 49, 64, 81, 100

const arr1 = iter3 || peek(limit(3)) // 1, 4, 9

const arr2 = iter3 || peek(limit(3)) // 1, 4, 9

const arr3 = iter1 || peek(limit(2)) // 1, 2

iter1 || limit(2) || forEach(console.log) // 1, 2

const arr4 = iter3 || peek(limit(3)) // 9, 16, 25

*/
