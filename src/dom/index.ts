/**
 * @module DOM
 */

import { isEmpty } from '../general';

/**
 * This method can be used to listen any custom event.
 *
 * @param {string} eventName - Name of the event that you want to listen or subscribe
 * @param {Function} callback - Callback function which will be called upon dispatching of that event
 *
 * @remarks
 * It's strongly recommended to add the event name in utils/constants/CUSTOM_EVENTS and use. No literals allowed.
 *
 * @example
 * ```
 * listenToCustomEvent(CUSTOM_EVENTS.file_loaded, this.xyz)
 * ```
 */
export function listenToCustomEvent(eventName: string, callback: Function) {
  try {
    if (!isEmpty(document)) {
      document.documentElement.addEventListener(eventName, callback as EventListener);
    }

  } catch (error) {
    console.error(`Error in listening to ${eventName} custom event: `, error);
  }
}


/**
 * This method can be used to dispatch any custom event.
 *
 * @param {string} eventName - Name of the event that you want to dispatch
 * @param {object} eventDetails - OPTIONAL param, eventDetails object can be used to pass extra details
 *
 * @remarks
 * It's strongly recommended to add the event name in utils/constants/CUSTOM_EVENTS and use. No literals allowed.
 *
 * @example
 * ```
 * dispatchCustomEvent(CUSTOM_EVENTS.file_loaded)
 * dispatchCustomEvent(CUSTOM_EVENTS.file_loaded, {user: 'Ella'})
 * ```
 */
export function dispatchCustomEvent(eventName: string, eventDetails: object = {}) {
  if (!isEmpty(document)) {
    const temp = document.documentElement;

    temp.dispatchEvent(new CustomEvent(eventName, { detail: eventDetails }));
  }
}


/**
 * This method can be used to unlisten any custom event.
 *
 * @param {string} eventName - Name of the event that you want to unlisten or unsubscribe
 * @param {Function} methodToUnlisten - The EventListener function of the event handler to remove from the event target.
 *
 * @remarks
 * It's strongly recommended to add the event name in utils/constants/CUSTOM_EVENTS and use. No literals allowed.
 *
 * @example
 * ```
 * unlistenToCustomEvent(CUSTOM_EVENTS.file_loaded, this.xyz)
 * ```
 */
export function unlistenToCustomEvent(eventName: string, methodToUnlisten: Function) {
  try {
    if (!isEmpty(document)) {
      document.documentElement.removeEventListener(eventName, methodToUnlisten as EventListener);
    }

  } catch (error) {
    console.error(` Error in unListening to ${eventName} custom event: `, error);
  }
}


/**
 * This method can be used to scroll your html page to top.
 *
 * @example
 * ```
 * scrollPageToTop();
 * ```
 */
export function scrollPageToTop() {
  if (!isEmpty(window)) {
    window.scrollTo(0, 0);
  }
}


/**
 * This method can be used to block special character in input field, also you can allow few special chars as per your requirement
 *
 * @param {string} eventObject - Event object
 * @param {string[]} allowedArr - Array of allowed chars
 *
 * @remarks
 * How to use - Just send the event object here in the onKeyPress callback of input
 *
 * @example
 * ```
 * blockSpecialChars(event, ['@', '%'])
 * ```
 */
export function blockSpecialChars(eventObject: React.KeyboardEvent<HTMLInputElement>, allowedArr: string[]) {
  const k = eventObject.key;

  if ((k >= 'a' && k <= 'z') || (k >= 'A' && k <= 'Z') || k === 'Backspace' || k === ' ' || (k >= '0' && k <= '9') || k === '.' || k === ',') {
    // do nothing
  } else {
    if (allowedArr.includes(k)) {
      // do nothing
    } else {
      eventObject.preventDefault();
    }
  }
}


/**
 * This method can be used to copy some text to clipboard.
 *
 * @param {string} str - String that you want to copy to the clipboard
 *
 * @example
 * ```
 * copyToClipboard("URN: 2303232923");
 * ```
 */
export function copyToClipboard(str: string) {
  /**
   * This function is used to copy anything to the clipboard
   */
  const el = document.createElement('textarea');

  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}


/**
 * This method creates a timestamp in the browser's performance entry buffer with the given name.
 *
 * @param {string} name - Name of the event whose performance you want to measure
 *
 * @example
 * ```
 * performanceMark('ComponentWillMount');
 * performanceMark('ComponentMounted');
 * performanceMeasure('ComponentWillMount','ComponentMounted')
 * ```
 */
export function performanceMark(name: string) {
  if (window?.performance?.mark) {
    window.performance.mark(name);
  }
}


/**
 * This method returns the difference of timestamp between 2 performance marks
 *
 * @param {string} markStart - Starting mark created using performanceMark method
 * @param {string} markEnd - Ending mark created using performanceMark method
 *
 * @example
 * ```
 * performanceMark('ComponentWillMount');
 * performanceMark('ComponentMounted');
 * console.log("Component mounted in ms - "performanceMeasure('ComponentWillMount','ComponentMounted'));
 * ```
 */
export function performanceMeasure(markStart: string, markEnd: string) {
  if (window?.performance?.measure) {
    return window.performance.measure('', markStart, markEnd).duration;
  }
}


/**
 * This method can be used to encode path variables & query params in the URL.
 *
 * @param {string} queryParam - Param that you want to encode
 *
 * @remarks
 * It's advisable to always encode your query param or path variables before hitting the URL
 *
 * @example
 * ```
 * const url = `/abc/xyz/${encodeURL(searchId)}`;
 * ```
 */
export function encodeURLParams(queryParam: string) {
  let decodedURL = '';

  try {
    decodedURL = decodeURIComponent(queryParam); // To avoid double encoding as then it will fail to decode the string

  } catch (e) {
    decodedURL = queryParam;
  }

  return encodeURIComponent(decodedURL);
}


/**
 * This method can be used to get the browser name.
 *
 * @remarks
 * This method depends on userAgent sniffing and therefore susciptible to spoofing. Avoid detecting browsers in business impacting code
 *
 * @example
 * ```
 * console.log('Browser Name - ',getBrowserName());
 * ```
 */
export function getBrowserName(): string {
  if (!isEmpty(window) && !isEmpty(navigator)) {
    if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
      return 'Opera';

    } else if (navigator.userAgent.indexOf('Edg') !== -1) {
      return 'Edge';

    } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
      return 'Chrome';

    } else if (navigator.userAgent.indexOf('Safari') !== -1) {
      return 'Safari';

    } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
      return 'Firefox';

      // Double exclaimation is used to cast a value to boolean
    } else if ((navigator.userAgent.indexOf('MSIE') !== -1) || (!!document.DOCUMENT_NODE)) { //IF IE > 10
      return 'IE';

    } else {
      return 'unknown';
    }

  } else {
    return '';
  }
}


/**
 * This method can be used to get the OS Name.
 *
 * @remarks
 * This method depends on userAgent sniffing and therefore susciptible to spoofing. Avoid detecting browsers in business impacting code
 *
 * @example
 * ```
 * console.log('Browser Name - ',getOSName());
 * ```
 */
export function getOSName() {
  if (!isEmpty(window) && !isEmpty(navigator)) {
    const userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = [ 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K' ],
      windowsPlatforms = [ 'Win32', 'Win64', 'Windows', 'WinCE' ],
      iosPlatforms = [ 'iPhone', 'iPad', 'iPod' ];

    let os = '';

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';

    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';

    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';

    } else if (/Android/i.test(userAgent)) {
      os = 'Android';

    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }

    return os;
  }

  return '';
}


/**
 * This function scrolls the page to the top.
 * If window.scroll is available and works perfectly, this function uses the smooth scroll behaviour of window
 * and scrolls with ease in animation. Else, It directly scrolls to top without animation in case of error with
 * window.scroll.
 *
 * @example
 * ```
 * smoothScrollToTop();  // The page is scrolled to the top. With animation if window object is present,
 * without animation if window object is not present.
 * ```
 *
 * @category DOM Based Method
 */
export function smoothScrollToTop() {
  if (!isEmpty(window)) {
    try {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });

    } catch (err) {
      window.scrollTo(0, 0);
    }
  }
}


/**
 * In safari browser, you can input multiple decimals. This method can be used to prevent that.
 *
 * @param {React.KeyboardEvent<HTMLInputElement>} eventObject - onKeyDown event object
 * @param {number | string} currentValue - Current value of input field
 *
 * @remarks
 * It's strongly recommended to use this method on onKeyDown event to prevent the key from registering
 *
 * @example
 * ```
 * <input
 *   type="number"
 *   onInput={this.handleInput}
 *   value={this.state.value}
 *   onKeyDown={(eventObject) => ignoreSecondDecimalInInput(eventObject, this.state.value)}
 * />
 * ```
 */
export function ignoreSecondDecimalInInput(eventObject: React.KeyboardEvent<HTMLInputElement>, currentValue: number | string) {
  const k = eventObject.key;

  // Convert to string if argument currentValue is in number
  const str = currentValue.toString();

  // One decimal is already present and this key pressed is also decimal
  if (str.indexOf('.') !== -1 && k === '.') {
    eventObject.preventDefault();
  }
}
