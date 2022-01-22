export function isValidEmail(emailId:string) {
  const mailformat = /^\w+([\+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;

  return emailId.match(mailformat);
}


/**
 * This method can be used to convert any string to title case.
 *
 * @param {string} str - String that you want to convert to title case
 *
 * @example
 * ```
 * toTitleCase('Enter investment amount'); // 'Enter Investment Amount'
 * toTitleCase('"Enter SIP amount"'); // 'Enter Sip Amount'
 * ```
 *
 * @category String Based Method
 */
export function toTitleCase(str:string) {
  try {
    return str.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

  } catch (e) {
    console.error('title case error', e);
  }
}
