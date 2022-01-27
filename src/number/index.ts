import { isEmpty } from '../general';

/**
 * This method can be used to add commas as per Indian system to any valid number of type string or number.
 *
 * @param {number | string} x - Number that you want to be formatted with commas as per Indian system
 *
 * @remarks
 * It's strongly recommended to pass number only but method can also handle valid string.
 *
 * @example
 * ```
 * addingCommasToNumber(1)); // 1
 * addingCommasToNumber(11)); // 11
 * addingCommasToNumber(111)); // 111
 * addingCommasToNumber('-1111')); // -1,111
 * addingCommasToNumber('11111')); // 11,111
 * addingCommasToNumber(-111111)); // -1,11,111
 * ```
 *
 * @category Number Based Method
 */
export function addingCommasToNumber(x: number | string): string {
  // ensuring that x is a valid number be in a string type or number
  if (isEmpty(x) || isNaN(x as number)) {
    console.error('Unable to insert commas to the number -', x);
    return '';
  }

  let isNegativeNumber = false;

  x = x.toString();

  if (x.charAt(0) === '-') {
    x = x.substring(1);
    isNegativeNumber = true;
  }

  let afterPoint = '';

  if (x.indexOf('.') > 0) { afterPoint = x.substring(x.indexOf('.'), x.length); }

  x = Math.floor(x as any as number);
  x = x.toString();
  let lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);

  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }

  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;

  if (isNegativeNumber) {
    return '-' + res;

  } else {
    return res;
  }
}


/**
 * This method can be used to validate 10 digit mobile number.
 *
 * @param {number | string} mobNumber - Mobile number that you want to validate
 *
 * @remarks
 * It's strongly recommended to pass number only but method can also handle valid string.
 *
 * @example
 * ```
 * isValidMobileNumber(1234567890) // true
 * isValidMobileNumber(-1234567890) // false
 * isValidMobileNumber(123) // false
 * isValidMobileNumber("123") // false
 * isValidMobileNumber("1234567890") // true
 * isValidMobileNumber("-1234567890") // false
 * ```
 *
 * @category Number Based Method
 */
export function isValidMobileNumber(mobNumber: number | string) {
  if (isNaN(mobNumber as number)) {
    return false;
  }

  const numberFormat = /^\d{10}$/;

  return numberFormat.test(mobNumber as any as string);
}


/**
 * This method can be used to convert paisa to rupees
 *
 * @param {number} value - Number that you want to be converted to rupee
 *
 * @remarks
 * Paise cannot be in decimal, so make sure you pass integer else it will return argument only without any change
 *
 * @example
 * ```
 * convertPaisaToRupee(100)); // 1
 * ```
 *
 * @category Number Based Method
 */
export function convertPaisaToRupee(value: number) {
  if (Number.isInteger(value)) { // Paisa cannot be in decimal
    return parseFloat(value as any as string) / 100;

  } else {
    console.error('Paisa cannot be in decimal');
    return value;
  }
}

/**
 * This method can be used to convert rupees to paisa
 *
 * @param {number} value - Number that you want to be converted to paise
 *
 * @example
 * ```
 * convertRupeeToPaisa(1)); // 100
 * ```
 *
 * @category Number Based Method
 */
export function convertRupeeToPaisa(value: number) {
  return parseFloat(value as any as string) * 100;
}


/**
 * This method can be used to find ordinal suffix of any number.
 *
 * @param {number} num - Number that you want to find ordinal suffix of
 *
 * @example
 * ```
 * ordinalSuffixOfNumber(1); // 1st
 * ordinalSuffixOfNumber(11); // 11th
 * ordinalSuffixOfNumber(21); // 21st
 * ordinalSuffixOfNumber(101); // 103rd
 * ```
 *
 * @category Number Based Method
 */
export function ordinalSuffixOfNumber(num: number): string {
  const j = (num % 10),
    k = (num % 100);

  if (j === 1 && k !== 11) {
    return num + 'st';
  }

  if (j === 2 && k !== 12) {
    return num + 'nd';
  }

  if (j === 3 && k !== 13) {
    return num + 'rd';
  }

  return num + 'th';
}


/**
 * This method can be used to add commas as per million format (thousands separator).
 *
 * @param {number} num - Number that you want to be formatted with commas
 *
 * @remarks
 * It returns the number as it is on error
 *
 * @example
 *
 * ```
 * millionWithCommas(1030120313); // 1,030,120,313
 * millionWithCommas(1000001); // 1,000,001
 * millionWithCommas(1000001.12432432); // 1,000,001.12432432
 * ```
 *
 * @category Number Based Method
 */
export function millionWithCommas(num: number) {
  try {
    // return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const parts = num.toString().split('.');

    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');

  } catch (err) {
    console.error('Error in adding commas in millions: ', err);
    return num;
  }
}


/**
 * This method can be used to get a random integer number between 2 number both inclusive.
 *
 * @param {number} min - Starting number
 * @param {number} max - Ending number
 *
 * @example
 * ```
 * getIntegerRandomNoBetweenTwoNo(0,500)); // will return anything between 0 to 500
 * ```
 *
 * @category Number Based Method
 */
export function getIntegerRandomNoBetweenTwoNo(min: number, max: number) { // min, max inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}