import { isEmpty } from '../general';

=======
/**
 * @module String
 */

import { isEmpty } from '../general';

/**
 * This method can be used to validate email id given in string.
 * Special characters allowed before @ are -+._
 *
 * @param {emailId} str - String that you want to validate as email
 *
 * @example
 * ```
 * isValidEmail('johndoe@gmail.com'); // Output is an array
 * isValidEmail('johndoe@gmail'); // Output is null
 * isValidEmail('john-doe@gmail.com'); // Output is an array
 * isValidEmail('john+doe@gmail.com'); // Output is an array
 * isValidEmail('john.doe@gmail.com'); // Output is an array
 * isValidEmail('john.doe@mail.in'); // Output is an array
 * isValidEmail('john_doe@mail.in'); // Output is an array
 *
 * @returns boolean if input string matches the email vaildation regex
 *
 * @category String Based Method
 */
>>>>>>> aa92a6c351aba7e67d2bf7638b09fd1737f967e7
export function isValidEmail(emailId: string) {
  const mailformat = /^\w+([\+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;

  return emailId.match(mailformat);
}


/**
 * This method can be used to convert any html string to normal string.
 *
 * @param {string} htmlString - HTML String that you want to convert to normal text
 *
 * @example
 * ```
 * convertHtmlToText('<p>Hello <b>World</b></p>') // Hello World
 * ```
 */
export function convertHtmlToText(htmlString: string) {
  if (htmlString != null) {
    //-- remove BR tags and replace them with empty string
    htmlString = htmlString.replace(/<br>/gi, ' ');
    htmlString = htmlString.replace(/<br\s\/>/gi, ' ');
    htmlString = htmlString.replace(/<br\/>/gi, ' ');

    //-- Remove all /n from string
    htmlString = htmlString.replace(/\\n/gi, ' ');

    //-- its a first check which replaces everything inside angular bracket with empty string
    htmlString = htmlString.replace(/<(?:.|\n)*?>/gm, '');

    //-- remove P and A tags but preserve what's inside of them
    htmlString = htmlString.replace(/<p.*>/gi, ' ');
    htmlString = htmlString.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, ' $2 ($1)');

    //-- remove all inside SCRIPT and STYLE tags
    htmlString = htmlString.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, '');
    htmlString = htmlString.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, '');

    //-- remove all else
    htmlString = htmlString.replace(/<(?:.|\s)*?>/g, '');

    //-- get rid of more than 2 multiple line breaks:
    htmlString = htmlString.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, '');

    //-- get rid of more than 2 spaces:
    htmlString = htmlString.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters with & also encoded:
    htmlString = htmlString.replace(/&amp;nbsp;/gi, ''); //space
    htmlString = htmlString.replace(/&amp;quot;/gi, ''); // "
    htmlString = htmlString.replace(/&amp;lt;/gi, ''); // <
    htmlString = htmlString.replace(/&amp;gt;/gi, ''); // >
    htmlString = htmlString.replace(/&amp;rsquo;/gi, ''); // '

    //-- get rid of html-encoded characters with & not encoded
    htmlString = htmlString.replace(/&nbsp;/gi, '');
    htmlString = htmlString.replace(/&quot;/gi, '');
    htmlString = htmlString.replace(/&lt;/gi, '');
    htmlString = htmlString.replace(/&gt;/gi, '');
    htmlString = htmlString.replace(/&rsquo;/gi, '');

    // now at last if still &amp left that is &
    htmlString = htmlString.replace(/&amp;/gi, '');

    htmlString = htmlString.replace(/\\n/gi, '');

    return htmlString;

  } else {
    return '';
  }
}


/**
 * This method can be used to check if a name is Valid or not
 *
 * @param {string} name - Name that you want to validate
 *
 * @remarks
 * Valid name - Only alphanumeric with space allowed (no other special chars) and min char should be 2
 */
export function isValidName(name: string): boolean {
  if (name) {
    name = name.trim();
    const nameFormat = /^[a-zA-Z ]*$/;

    return name ? (nameFormat.test(name) && name.length >= 2) : false;
  }

  return false;
}


/**
 * This method can be used to convert any string to sentence case.
 *
 * @param {string} str - String that you want to convert to sentence case
 *
 * @example
 * ```
 * convertToSentenceCase('Enter investment amount'); // Enter investment amount
 * convertToSentenceCase('Enter SIP amount'); // Enter sip amount
 * convertToSentenceCase('My NAME Is kHan'); // My name is khan
 * convertToSentenceCase('My NAME Is kHan. i am not a terrorist. Understood?'); // My name is khan. I am not a terrorist. Understood?
 * ```
 */
export function convertToSentenceCase(str: string) {
  try {
    const newString = str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) { return c.toUpperCase(); });

    return newString;

  } catch (e) {
    console.error('Error in converting string, original string returned ', e);
    return str;
  }
}


/**
 * This method can be used to capitalize first letter of each work and touch nothing else.
 *
 * @param {string} str - String that you want to transform
 *
 * @example
 * ```
 * capitalizeFirstLetter('Enter investment amount'); // Enter Investment Amount
 * capitalizeFirstLetter('Enter SIP amount'); // Enter SIP Amount
 * capitalizeFirstLetter('My NAME Is kHan'); // My NAME Is KHan
 * capitalizeFirstLetter('My NAME Is kHan. i am not a terrorist. Understood?'); // My NAME Is KHan. I Am Not A Terrorist. Understood?
 * ```
 */
export function capitalizeFirstLetter(str: string) {
  try {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substring(1); });

  } catch (e) {
    console.error('capitalize letter', e);
    return str;
  }
}


/**
 * This method can be used to convert any string to title case.
 *
 * @param {string} str - String that you want to convert to title case
 *
 * @example
 * ```
 * toTitleCase('Enter investment amount'); // Enter Investment Amount
 * toTitleCase('Enter SIP amount'); // Enter Sip Amount
 * toTitleCase('My NAME Is kHan'); // My Name Is Khan
 * toTitleCase('My NAME Is kHan. i am not a terrorist. Understood?'); // My Name Is Khan. I Am Not A Terrorist. Understood?
 * ```
 */
export function toTitleCase(str: string) {
  try {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(); });

  } catch (e) {
    console.error('title case error', e);
  }
}


/**
 * This function keeps last specified number of characters from a string.
 * Used while displaying Account Number where it is too long, to reduce the length by specified number of characters.
 *
 * @param {string} inputString - Input string to be truncated
 * @param {number} truncatedCharactersCount - Number of characters which should be kept from the ending of inputString
 *
 * @example
 * ```
 * truncateStringByCharacters('XXXXXXXX0900', 8); // Output will be 'XXXX0900'
 * truncateStringByCharacters('XXXXXXXX0900', 12); // Output will be 'XXXXXXXX0900'
 * truncateStringByCharacters('XXXXXXXX0900', 13); // Output will be ''
 * ```
 *
 * @category String Based Method
 */
export function truncateStringByCharacters(inputString: string = '', truncatedCharactersCount: number = 8) {
  if (!isEmpty(inputString) && inputString.length >= truncatedCharactersCount) {
    return inputString.substr(inputString.length - truncatedCharactersCount);

  } else {
    return '';
  }
}

;


/**
 * This method replaces everything apart from last 4 characters in a string with X.
 * We can give an option to truncate the string as well with truncate boolean paramter.
 *
 * @param {string} inputString - Input string to be masked and/or truncated
 * @param {boolean} truncate - Boolean to enable truncation of inputString
 * @param {number} truncatedCharactersCount - Number of characters which should be kept from the ending of inputString
 *
 * @example
 * ```
 * maskInputStringAndTruncate('301634570900'); // Output will be 'XXXXXXXX0900'
 * maskInputStringAndTruncate('301634570900', true); // Output will be 'XXXX0900'
 * maskInputStringAndTruncate('301634570900', true, 8); // Output will be 'XXXX0900'
 * maskInputStringAndTruncate('301634570900', true, 5); // Output will be 'XXXX0900'
 * maskInputStringAndTruncate('301634570900', true, 3); // Output will be ''
 * maskInputStringAndTruncate('301634570900', true, 13); // Output will be ''
 * ```
 *
 * @category String Based Method
 */
export function maskInputStringAndTruncate(inputString: string = '', truncate: boolean = false, truncatedCharactersCount: number = 8) {
  if (!isEmpty(inputString)) {
    if (truncate) {
      const truncateAcc = truncateStringByCharacters(inputString, truncatedCharactersCount);

      if (truncateAcc.length >= 4) {
        return 'XXXX' + truncateAcc.substr(truncateAcc.length - 4);

      } else {
        return '';
      }
    }

    return new Array(inputString.length - 3).join('X') + inputString.substr(inputString.length - 4);
  }

  return inputString;
}

;


/**
 * This method is used to check if the given string check for characters from a-z, A-Z, 0-9.
 *
 * @param str - String that you want to check for the above characters
 *
 * @example
 * ```
 * isAlphanumericString('aaAa123')  // true
 * isAlphanumericString('aaAa_98-') // false
 * ```
 */
export function isAlphanumericString(str: string) {
  const regexForAlphaNumericString = /^[a-z0-9]+$/i;

  return regexForAlphaNumericString.test(str);
}

;


/**
 * This method checks for all characters to be number between 0-9 and pincode length to be 6
 *
 * @param {string | number} pincode - string or number entered in input element
 *
 * @example
 *```
 * isValidPincode('123456')  // true
 * isValidPincode('1234aa')  // false
 * isValidPincode(110018)    // true
 * isValidPincode('12345')   // false
 * ```
 */
export function isValidPincode(pincode: string | number) {
  //This regex checks for all characters to be number between 0-9
  const regexForOnlyNumbers = /^\d+$/;

  //converting number to string to support handling in case input is number
  const convertPincodeToString = pincode.toString();

  return regexForOnlyNumbers.test(convertPincodeToString) && convertPincodeToString.length === 6;
}

;


/**
 * The sequential number would always be a subset to "0123456789".
 * For instance, 1234, 4567, 2345, etc are all subset of "0123456789".
 * To validate, this function uses 'indexOf' method present on String Object.
 *
 * @param {string | number} digitsPattern - string or number entered in input element
 *
 * @example
 *```
 * isSequentialDigitsPattern('1234')   //true
 * isSequentialDigitsPattern('1235')   //false
 * isSequentialDigitsPattern('9876')   //true
 * ```
 */
export function isSequentialDigitsPattern(digitsPattern: string | number) {
  try {
    const sequentialNumbers = '01234567890';
    //If reverse sequence is also needed to be checked
    const reverseSequentialNumbers = '09876543210';

    //Returns false, if the number is in sequence
    return !((sequentialNumbers.indexOf(digitsPattern.toString()) === -1) &&
      (reverseSequentialNumbers.indexOf(digitsPattern.toString()) === -1));

  } catch (error) {
    console.error('Error in isSequentialDigitsPattern: ', error);

    return false;
  }
}


/**
 * This function checks if a string has all digits as the same digit
 *
 * @param {string} str - string entered in input element
 *
 * @example
 * ```
 * isSameDigitsString('1111')  //true
 * isSameDigitsString('2222')  //true
 * isSameDigitsString('1212')  //false
 * ```
 *
 * @category String Based Method
 */
export function isSameDigitsString(str: string) {
  try {

    if (isEmpty(str)) {
      return false;
    }

    //checks if every digit in string is same as first character
    return str.split('').every(char => char === str[0]);

  } catch (error) {
    console.error('Error in isSameDigitsString: ', error);

    return false;
  }
}
