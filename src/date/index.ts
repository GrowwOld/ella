/**
 * This method can be used to get month name abbreviation from month number.
 *
 * @param {number} monthNumber - Month number, eg: for Jan, it is 1
 *
 * @remarks
 * monthNumber should be in the range of 1-12
 *
 * @example
 * ```
 * getMonthAbbrByIndex(2) // Feb will be the output
 * ```
 *
 * @category Date Based Method
 */
export function getMonthAbbrByIndex(monthNumber:number):string {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return monthNames[ monthNumber - 1 ];
}
