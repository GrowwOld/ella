import { isEmpty } from "../general";

export function addingCommasToNumber(x: number | string):string {
  // ensuring that x is a valid number be in a string type or number
  if (isEmpty(x) || isNaN(x as number)) {
    console.error('Unable to insert commas to the number -', x);
    return '';
  }

  const isNegativeNumber = Math.sign(x as number) === -1; // Math.sign returns -1 if the number is negative

  x = x.toString();

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
