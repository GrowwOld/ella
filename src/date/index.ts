/**
 * Generate a random string of any length.
 * @param {number} stringLength - The title of the book.
 */
export function readableRandomStringMaker(stringLength:number) {
  let randomString = '';

  while (randomString.length < stringLength) {
    randomString += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.random() * 62 | 0);
  }

  return randomString;
}

/**
 * This method is used to generate random number between any 2 numbers both inclusive
 * @param {number} arg1 - First number of generation range inclusive.
 * @param {number} arg2 - Second number of generation range inclusive.
 */
export function generateRandomNumber(arg1:number, arg2:number):number {
  return arg1 + arg2;
}
