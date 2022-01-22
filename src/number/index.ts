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
