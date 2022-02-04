/**
 * @module Date
 */

import dayjs from 'dayjs';

import { isEmpty } from '../general';

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
 */
export function getMonthAbbrByIndex(monthNumber: number): string {
  if (monthNumber < 1 || monthNumber > 12) {
    return '';
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return monthNames[ monthNumber - 1 ];
}


/**
 * This function converts date input coming from backend (generally in long format (ex. '2022-02-01T12:16:13'))
 * to a specified format provided in 2nd paramter
 *
 * @param {Date} longDateValue - Date input to be converted to another format. This generally comes from backend and is
 * in long format. For example '2022-02-01T12:16:13'
 * @param {string} dateFormat - Format in which the date needs to be converted to.
 *
 * @example
 * ```
 * getDateFromLongValue('2022-02-01T12:16:13', 'DD MMM, hh:mm A');  // Output will be '01 Feb, 12:16 PM'
 * getDateFromLongValue('2022-01-28T12:54:40', 'DD MMM, hh:mm A');  // Output will be '28 Jan, 12:54 PM'
 * getDateFromLongValue('2022-01-25T12:08:12', 'DD MMM YYYY,  hh:mm A);  // Output will be '25 Jan 2022,  12:08 PM'
 * ```
 */
export function getDateFromLongValue(longDateValue: Date, dateFormat: string = 'DD MMM YYYY') {
  try {
    if (!isEmpty(dateFormat)) {
      const str = dayjs(longDateValue).format(dateFormat);

      if (str === 'Invalid Date') {
        return '';

      } else {
        return str;
      }
    }

  } catch (error) {
    console.error('Error in getDateFromLongValue: ', error);
  }
}


/**
 * This function returns age as a number from the date of birth as an input
 *
 * @param {Date} birthDate - birth date of a person in Date format
 *
 * @example
 * ```
 * getAgeFromDateOfBirth(new Date());  // Output is 0
 * getAgeFromDateOfBirth('Sun Oct 10 1993 05:30:00 GMT+0530 (India Standard Time)');  // Output is 28
 * getAgeFromDateOfBirth('1993-10-10');  // Output is 28
 * getAgeFromDateOfBirth();  // Output is NaN
 * ```
 */
export function getAgeFromDateOfBirth(birthDate: Date) {
  try {
    const today = new Date();

    birthDate = new Date(birthDate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;

  } catch (error) {
    console.error('Error im getAgeFromDateOfBirth: ', error);
  }
}


/**
 * This method is used for getting previous month with same date to the date provided through argument.
 *
 * @param {Date} date - Date in valid Date format
 *
 * @example
 * ```
 * getPreviousMonthDate('Mon Mar 15 2021 10:21:35 GMT+0530 (India Standard Time)');  // Output will be 'Mon Feb 15 2021 10:21:35 GMT+0530 (India Standard Time)'
 * getPreviousMonthDate('1992-10-10');  // Output will be 'Thu Sep 10 1992 05:30:00 GMT+0530 (India Standard Time)'
 * getPreviousMonthDate(new Date());  // Output will be 'Tue Jan 04 2022 02:28:43 GMT+0530 (India Standard Time)'
 * getPreviousMonthDate('03/25/2015');  // Output will be 'Wed Feb 25 2015 00:00:00 GMT+0530 (India Standard Time)'
 * getPreviousMonthDate();  // Output will be 'Invalid date'
 * getPreviousMonthDate('03/31/2022');  // Output will be 'Thu Mar 03 2022 00:00:00 GMT+0530 (India Standard Time)'
 * ```
 */
export function getPreviousMonthDate(date: Date) {
  try {
    const newDate = new Date(date);

    newDate.setMonth(newDate.getMonth() - 1);

    return newDate;

  } catch (error) {
    console.error('Error in getPreviousMonthDate: ', error);
  }
}


/**
 * This method is used for getting previous date to the date provided through argument. argument should come through
 * only new Date()
 *
 * @param {Date} date - Date as only new Date()
 *
 * @example
 * ```
 * getPreviousDayDate(new Date());  // Output will be 'Thu Feb 03 2022 03:28:49 GMT+0530 (India Standard Time)'
 * ```
 */
export function getPreviousDayDate(date: Date) {
  try {
    const newDate = new Date(date.getTime() - (1000 * 60 * 60 * 24));

    return newDate;

  } catch (error) {
    console.error('Error in getPreviousDayDate: ', error);
  }
}


/**
 * This function returns todya's date in ISO format. Input should only be
 * new Date()
 *
 * @param {Date} date - Date as only new Date()
 *
 * @example
 * ```
 * getDateInISOFormat(new Date());  // Output will be '2022-02-04'
 * ```
 */
export function getDateInISOFormat(date: Date) {
  try {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const d = ('0' + (date.getDate())).slice(-2);

    return `${year}-${month}-${d}`;

  } catch (error) {
    console.error('Error in getDateInISOFormat: ', error);
  }
}


/**
 * This function converts DD/MM/YYYY to YYYY-MM-DD.
 * JavaScript new Date() method accept date in YYYY-MM-DD or YYYY/MM/DD
 * format that's why we needed this method
 *
 * @param {Date} date - Input date string in DD/MM/YYYY or DD-MM-YYYY format
 *
 * @example
 * ```
 * convertStrToValidDateFormat('22/11/2021');  - // Output will be '2021-11-22'
 * convertStrToValidDateFormat('03/25/2015');  - // Output will be '2015-25-03'
 * convertStrToValidDateFormat('03-25-2015');  - // Output will be '2015-25-03'
 * ```
 */
export function convertStrToValidDateFormat(date: Date) {
  try {
    const str = date.replace(/[^0-9]/g, '');

    if (str.length !== 8) {
      throw new Error('Error in converting date\'s format');
    }

    const result = str.slice(4, 8) + '-' + str.slice(2, 4) + '-' + str.slice(0, 2);

    return result;

  } catch (err) {
    console.error('Error in converting date\'s format', err);
    return '';
  }
}


/**
 * This function checks if input date is valid or not.
 *
 * @param {string} date - Input date in YYYY-MM-DD format
 * eg. 2021-11-22 (22nd November 2021)
 * @param {string} delimiter - Provide delimiter in case date uses
 * other delimiter than '-'.
 *  * eg. Pass '/' in case date is in format of YYYY/MM/DD
 *
 * @example
 * ```
 * isValidDate();  // Output is false
 * ```
 */
export function isValidDate(date: Date, delimiter: string = '-') {
  try {
    if (date) {
      const bits = date.split(delimiter);
      const date = new Date(bits[ 0 ], bits[ 1 ] - 1, bits[ 2 ]);

      return date && (date.getMonth() + 1) === bits[ 1 ];

    } else {
      return false;
    }

  } catch (err) {
    console.error('Error in validating date', err);
    return false;
  }
}


/**
 * This function returns an array of objects which specify financial years from last supported year to offset
 * year from current financial year.
 *
 * @param {number} lastSupportedYear - last year in number from which array of values needs to be returned
 * @param {number} offsetFromCurrentFinancialYear - offset from current year of the year upto which the values have to be returned
 *
 * @example
 * ```
 * getReportDateInput(2020, 1);  // Output will be [{startDate: 'Apr 2020', endDate: 'Mar 2021'}]
 * getReportDateInput(2020);  // Output will be [{startDate: 'Apr 2021', endDate: 'Mar 2022'}, {startDate: 'Apr 2020', endDate: 'Mar 2021'}]
 * ```
 */
export function getReportDateInput(lastSupportedYear: number, offsetFromCurrentFinancialYear: number = 0) {
  try {
    const dateInput = [];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentFinancialYear = currentMonth < 4
      ? currentYear - 1 - offsetFromCurrentFinancialYear
      : currentYear - offsetFromCurrentFinancialYear;

    for (let financialYear = currentFinancialYear; financialYear >= lastSupportedYear; financialYear--) {
      const dateEntry = {
        startDate: `Apr ${financialYear}`,
        endDate: `Mar ${financialYear + 1}`
      };

      dateInput.push(dateEntry);
    }

    return dateInput;

  } catch (error) {
    console.error('Report-date generation error:', error);
    return [];
  }
}


/**
 * This method inserts "/" while entering dates in input element
 *
 * @param {string} inputDate - string entered in input element
 *
 * @example
 * ```
 * formatDateWithBackSlash('121');  // Output will be '12/1'
 * formatDateWithBackSlash('12');  // Output will be '12/'
 * formatDateWithBackSlash('1');  // Output will be '1'
 * formatDateWithBackSlash('1213');  // Output will be '12/13'
 * formatDateWithBackSlash('12121212');  // Output will be '12/12/1212'
 * ```
 */
export function formatDateWithBackSlash(inputDate: string) {
  try {
    const str = inputDate.replace(/[^0-9]/g, '');
    const { length } = str;
    let result = str;

    if (length > 2) {
      if (length >= 4) {
        result = str.slice(0, 2) + '/' + str.slice(2, 4) + '/' + str.slice(4, length);

      } else {
        result = str.slice(0, 2) + '/' + str.slice(2, length);
      }

    } else if (length === 2) {
      result = str.slice(0, 2) + '/';
    }

    return result;

  } catch (error) {
    console.log('Error in formatDateWithBackSlash: ', error);
  }
}


/**
 * This method Checks whether date string is Valid Date of birth or not.
 * NOTE:- Doesn't check for Minor (Age < 18).
 *
 * @param {string} inputDate - string entered in input element (ddmmyyyy or dd/mm/yyyy)
 *
 * @example
 * ```
 * dobValidationCheck('10/10/2000');  // Output will be true
 * dobValidationCheck('10/10/1500');  // Output will be false
 * ```
 * @return {boolean} result - return true or false
 * Validations :- isValidDate , Future date, formatted length = 10, age not more than 120.
*/
export function dobValidationCheck(inputDob: Date) {
  const formattedDOBStr = convertStrToValidDateFormat(inputDob);

  if (!isValidDate(formattedDOBStr)) {
    return false;
  }

  const formattedDOBDate = new Date(formattedDOBStr);
  const timeDifference = ((new Date().getTime()) - (formattedDOBDate.getTime())); //typeScript doesn't allow subtraction of Date.
  const age = getAgeFromDateOfBirth(formattedDOBDate);

  if (age > 120 || timeDifference < 0) {
    return false;
  }

  return true;
}


/** This method Checks whether Age is less than 18 or not.
 *
 * @param {string} dob - string entered in input element (ddmmyyyy or dd/mm/yyyy)
 *
 * @example
 * ```
 * isAgeMinor('10/10/1995');  // Output will be false
 * isAgeMinor('10/10/2020');  // Output will be true
 * ```
 * */
export function isAgeMinor(dob: Date) {
  if (dob) {
    const formattedDOBStr = convertStrToValidDateFormat(dob);
    const formattedDOBDate = new Date(formattedDOBStr);

    if (isValidDate(formattedDOBStr)) {
      const age = getAgeFromDateOfBirth(formattedDOBDate);

      return age < 18;
    }
  }

  return false;
}
