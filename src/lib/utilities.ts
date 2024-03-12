/**
 * Given an array, picks a random element in the array and then returns it
 * @param arr an array containing any number of elements of the same type
 * @returns a psuedorandom element in the array
 */
export const randomPick = <Type>(array: Type[]): Type =>
  array[Math.floor(Math.random() * array.length)]
