import { isEmpty } from "../general";

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
export function addingCommasToNumber(x: number | string):string {
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
export function isValidMobileNumber(mobNumber:number | string) {
  if (isNaN(mobNumber as number)) {
    return false;
  }

  const numberFormat = /^\d{10}$/;

  return numberFormat.test(mobNumber as any as string);
}


export function convertPaisaToRupee(value:number) {
  /**
   * This function converts paise to rupee
   * Example: for convertPaisaToRupee(10000), we get result 100.
   */
  return parseFloat(value as any as string) / 100;
}

export function convertRupeeToPaisa(value:number) {
  /**
   * This function converts rupee to paisa
   * Example: for convertRupeeToPaisa(100), we get result 10000.
   */
  return parseFloat(value as any as string) * 100;
}


/**
 * This method can be used to find ordinal suffix of any number.
 *
 * @param {number} num - Number that you want to find ordinal suffix of
 *
 * @example
 * ```
 * listenToCustomEvent(CUSTOM_EVENTS.file_loaded, this.xyz)
 * ```
 *
 * @category Number Based Method
 */
export function ordinalSuffixOfNumber(num:number):string {
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


export function millionWithCommas(num:number) {
  /**
   * This function returns a string with commas and in millions international format
   */
  try {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  } catch (err) {
    console.error('Error in adding commas in millions: ', err);
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
export function getIntegerRandomNoBetweenTwoNo(min:number, max:number) { // min, max inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
