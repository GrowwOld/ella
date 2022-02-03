import {
  addingCommasToNumber,
  changeFormatToLakhCrore,
  convertPaisaToRupee,
  convertRupeeToPaisa,
  convertToBillionTrillionFormat,
  getNumberSign,
  millionWithCommas
} from '../';
import { isEmpty } from '../../general';
import { CURRENCY_NAME, CURRENCY_SYMBOL } from './constants';

const defaultNumberConfig = {
  addCommas: true,                  // whether you need commas in your number
  millionCommas: false,             // used for US-stocks commas
  fallback: 'NA',                   // fallback if the backend fails and we are getting null or undefined or isNaN true or Infinite number
  toFixedValue: 2,                  // very well explanatory , eg. 10 = 10.00
  formatToLakhCrore: false,         // it will convert to lakhs and crore accordingly with no currency sign
  formatToBillionTrillion: false,   // it will convert to million,billion trillion , specific to US-stocks
  decimals: 2,                      // used in lakhs and crore, can be used further for other categories also
  isCurrency: false,                // specify 'true' for currency format, only use for currency formatting, no other use
  currency: CURRENCY_NAME.INR,      // default is INR, specify USD for US-stocks
  absoluteValue: false,             // absolute value of the number eg. -10 = 10
  roundValue: false,                // rounding off of a number eg. 83.56 = 84
  withSign: false,                  // this will return string with sign of the number, eg. +21.34
  spaceBetweenSignValue: false,     // if you need +3.54 then it should be false, if you need + 3.54 , make it true, applicable only when withSign is true
  formatPaisaToRupee: false,        // converting number from paisa to rupee
  formatRupeeToPaisa: false,        // converting number from rupee to paisa
  plainNumber: false                // converting only to number
};


/**
 * This function is used as a Wrapper around number (Handle every case currently used in Groww Web Project).
 * @param {number | string} x - Number that you want to format with NumberFormatter
 * @param {
 *  addCommas?: boolean;
 *  millionCommas?: boolean;
 *  fallback?: any;
 *  toFixedValue?: number;
 *  formatToLakhCrore?: boolean;
 *  formatToBillionTrillion?: boolean;
 *  decimals?: number ;
 *  isCurrency?:boolean;
 *  currency?: string;
 *  absoluteValue?: boolean;
 *  roundValue?:boolean;
 *  withSign?: boolean;
 *  spaceBetweenSignValue?:boolean;
 *  formatPaisaToRupee?: boolean;
 *  formatRupeeToPaisa?:boolean;
 *  plainNumber?:boolean;
 * } numberConfig
 *
 * @remarks
 * <br/>
 * <h4>numberConfig properties</h4>
 * <ul>
 *  <li> <span style="font-weight: bold;">addCommas</span> => Whether you need commas in your number </li>
 *  <li> <span style="font-weight: bold;">millionCommas</span> => Used for US-stocks commas </li>
 *  <li> <span style="font-weight: bold;">fallback</span> => Fallback if the backend fails and we are getting null or undefined or isNaN true or Infinite number (Default is 'NA') </li>
 *  <li> <span style="font-weight: bold;">toFixedValue</span> => Very well explanatory , eg. 10 = 10.00 </li>
 *  <li> <span style="font-weight: bold;">formatToLakhCrore</span> => It will convert to lakhs and crore accordingly with no currency sign </li>
 *  <li> <span style="font-weight: bold;">formatToBillionTrillion</span> => It will convert to million,billion trillion , specific to US-stocks </li>
 *  <li> <span style="font-weight: bold;">decimals</span> => Used in lakhs and crore, can be used further for other categories also </li>
 *  <li> <span style="font-weight: bold;">isCurrency</span> => Specify 'true' for currency format, only use for currency formatting, no other use </li>
 *  <li> <span style="font-weight: bold;">currency</span> => Default is 'INR', specify USD for US-stocks </li>
 *  <li> <span style="font-weight: bold;">absoluteValue</span> => Absolute value of the number eg. -10 = 10 </li>
 *  <li> <span style="font-weight: bold;">roundValue</span> => Rounding off of a number eg. 83.56 = 84 </li>
 *  <li> <span style="font-weight: bold;">withSign</span> => This will return string with sign of the number, eg. '+21.34' </li>
 *  <li> <span style="font-weight: bold;">spaceBetweenSignValue</span> => if you need +3.54 then it should be false, if you need '+ 3.54' , make it true, applicable only when withSign is true </li>
 *  <li> <span style="font-weight: bold;">formatPaisaToRupee</span> => Converting number from paisa to rupee </li>
 *  <li> <span style="font-weight: bold;">formatRupeeToPaisa</span> => Converting number from rupee to paisa </li>
 *  <li> <span style="font-weight: bold;">plainNumber</span> => Converting only to number </li>
 * </ul>
 * <br/>
 * <div>
 * <div style="font-weight:bold">defaultNumberConfig = { <br/></div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">addCommas: </div>
 *    <div style="margin-left:4px">true</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">millionCommas: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">fallback: </div>
 *    <div style="margin-left:4px">'NA'</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">toFixedValue: </div>
 *    <div style="margin-left:4px">2</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">formatToLakhCrore: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">formatToBillionTrillion: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">decimals: </div>
 *    <div style="margin-left:4px">2</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">isCurrency: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">currency: </div>
 *    <div style="margin-left:4px">'INR'</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">absoluteValue: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">roundValue: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">withSign: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">spaceBetweenSignValue: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">formatPaisaToRupee: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">formatRupeeToPaisa: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * <div style="display:flex;">
 *   <div style="font-weight:bold">plainNumber: </div>
 *    <div style="margin-left:4px">false</div>
 * </div>
 * };
</div>
 *
 * @example
 * ```
 * NumberFormatter(100023) // '1,00,023.00'
 * ```
 *
 */
export function NumberFormatter(num: string | number, numberConfig: numberConfigType = {}) {

  const initNumberConfig = {
    ...defaultNumberConfig, // will add all the default config and then overwrite with existing numberConfig which is passed.
    ...numberConfig
  };

  const {
    fallback,
    toFixedValue,
    formatToLakhCrore,
    addCommas,
    decimals,
    isCurrency,
    currency,
    absoluteValue,
    roundValue,
    millionCommas,
    formatToBillionTrillion,
    withSign,
    spaceBetweenSignValue,
    formatPaisaToRupee,
    formatRupeeToPaisa,
    plainNumber
  } = initNumberConfig;

  let formatNumber = Number(num);

  if (isEmpty(num) || isNaN(formatNumber) || !isFinite(formatNumber)) { // edge cases checking for numbers.
    if (withSign) { // added so that the programmer need not to handle on the file itself.
      return returnSignValueStr('', fallback, spaceBetweenSignValue);
    }

    return fallback; // it anything fails, fallback is triggered.
  }

  const sign = getNumberSign(formatNumber); // to get sign of a number, positive or negative or no sign at all.

  formatNumber = absoluteValue || withSign ? Math.abs(formatNumber) : formatNumber;

  formatNumber = roundValue ? Math.round(formatNumber) : formatNumber;

  formatNumber = formatPaisaToRupee ? convertPaisaToRupee(formatNumber) : formatNumber;

  formatNumber = formatRupeeToPaisa ? convertRupeeToPaisa(formatNumber) : formatNumber;

  let answer: any = null; // can be a number or string or object so better to use it as any if other function also included in future.

  if (plainNumber) {
    answer = Number(formatNumber);
  }

  if (formatToBillionTrillion) {
    answer = convertToBillionTrillionFormat(formatNumber, toFixedValue) || fallback;
  }

  if (formatToLakhCrore) {
    answer = changeFormatToLakhCrore(formatNumber, decimals);
  }

  if (isCurrency) {
    answer = currencyFormat(formatNumber, currency, toFixedValue);
  }

  if (millionCommas) {
    answer = millionWithCommas(formatNumber.toFixed(toFixedValue));
  }

  if (!isEmpty(answer)) {
    if (withSign) {
      return returnSignValueStr(sign, answer, spaceBetweenSignValue);
    }

    return answer;
  }

  if (addCommas) {
    const returnValue = addingCommasToNumber(formatNumber.toFixed(toFixedValue));

    if (withSign) {
      return returnSignValueStr(sign, returnValue, spaceBetweenSignValue);
    }

    return returnValue;
  }


  const finalReturnValue = Number(formatNumber).toFixed(toFixedValue); // if you don't want to include commas even, default conversion to number(as string) will take place

  if (withSign) {
    return returnSignValueStr(sign, finalReturnValue, spaceBetweenSignValue);
  }

  return finalReturnValue;
}


/**
 *
 *
 * @param {number} num
 * @param {string} currency
 * @param {number} toFixedValue
 * @return {(string)}
 */
function currencyFormat(num: number, currency: string, toFixedValue: number) {
  const locales = currency === CURRENCY_NAME.USD ? 'en-US' : 'en-IN'; // default is INR check line 21.

  try {
    // this is Internationalization object, a global object used in JS.
    // To read more about it :- https://tech.groww.in/the-internationalization-api-js-faf5ebc11b96

    const currenyNumberFormat = Intl.NumberFormat(locales, {
      style: 'currency',
      currency,
      minimumFractionDigits: toFixedValue,
      maximumFractionDigits: toFixedValue
    }).format(num);

    const currencyFormatNumber = removeSpaces(currenyNumberFormat);

    /* Remove spaces only in rupee symbol, specific to safari browser due to which '-' sign was being neglected */
    return currencyFormatNumber;

  } catch (err) {
    console.warn(err);
    // if global Intl object is not present, it will not fail.

    if (currency === CURRENCY_NAME.INR) {
      return `${CURRENCY_SYMBOL.INR}${addingCommasToNumber(num.toFixed(toFixedValue))}`;

    } else if (currency === CURRENCY_NAME.USD) {
      return `${CURRENCY_SYMBOL.DOLLAR}${millionWithCommas(num.toFixed(toFixedValue))}`;
    }
  }
}


/**
 *
 *
 * @param {string} currencyAmount
 * @return {string}
 */
function removeSpaces(currencyAmount: string) {
  try {
    const currenyNumberFormatSplit = currencyAmount.split('');

    const returnStr = currenyNumberFormatSplit.filter((curSymbolNum) => {
      return curSymbolNum.trim().length > 0;
    });

    return returnStr.join('');

  } catch (err) {
    console.warn(err);

    return currencyAmount;
  }
}


/**
 *
 *
 * @param {string} sign
 * @param {(number | string)} value
 * @param {boolean} spaceBetweenSignValue
 * @return {string | number}
 */
function returnSignValueStr(sign : string, value : number | string, spaceBetweenSignValue : boolean) {
  if (isEmpty(sign)) {
    return value;
  }

  if (spaceBetweenSignValue) {
    return sign + ' ' + value;

  } else {
    return sign + value;
  }
}


type numberConfigType = {
  addCommas?: boolean;
  millionCommas?: boolean;
  fallback?: any;
  toFixedValue?: number;
  formatToLakhCrore?: boolean;
  formatToBillionTrillion?: boolean;
  decimals?: number ;
  isCurrency?:boolean;
  currency?: string;
  absoluteValue?: boolean;
  roundValue?:boolean;
  withSign?: boolean;
  spaceBetweenSignValue?:boolean;
  formatPaisaToRupee?: boolean;
  formatRupeeToPaisa?:boolean;
  plainNumber?:boolean;
}


export {
  DAY_CHANGE_PERC_ABS, PRICE_CURRENCY_FALLBACK_ZERO, PRIMARY_FALLBACK,
  PLAIN_NUMBER, PRICE_CURRENCY_TO_FIXED_ZERO, PRICE_CURRENCY,
  FIXED_ZERO, CONVERT_TO_LAKH_CRORE, PRICE_CURRENCY_USD,
  CONVERT_TO_BILLION_TRILLION, NO_COMMAS, CURRENCY_CONVERT_TO_RUPEE,
  FALLBACK_ZERO_TO_FIXED_TWO, SIGN_SPACE_BETWEEN_SIGN_VALUE
} from './numberConfig';
