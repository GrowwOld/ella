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
 *
 * @category String Based Method
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
 *
 * @category String Based Method
 */
export function isValidName(name: string): boolean {
  /*
    This method check name string should contain only alphabets with space, no special
    character and numbers are allowed and minimum length should be 2 character.
  */
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
 *
 * @category String Based Method
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
 *
 * @category String Based Method
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
 *
 * @category String Based Method
 */
export function toTitleCase(str: string) {
  try {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(); });

  } catch (e) {
    console.error('title case error', e);
  }
}
