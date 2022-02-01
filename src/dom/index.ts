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
 *
 * @category DOM Based Method
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
 *
 * @category DOM Based Method
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
 *
 * @category DOM Based Method
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
 *
 * @category DOM Based Method
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
 *
 * @category DOM Based Method
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
 *
 * @category DOM Based Method
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
 *
 * @category DOM Based Method
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
 *
 * @category DOM Based Method
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
 *
 * @category DOM Based Method
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
 *
 * @category DOM Based Method
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
 *
 * @category DOM Based Method
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
 * This method is used to push a message along with some data to a window instance. Useful in scenarios like iFrames, Webviews or Window Modals.
 *
 * @param {Window} targetWindow - Target window that needs to listen to the message. Defaults to current window.
 * @param {string} action - Action type
 * @param {Object} params - POJO - Any payload to be passed along with the action
 * @param {string} targetOrigin - Target origin identifier. This is to verify at the receiver end, if origin is as expected or not. Usually defaults to the host.
 *
 * @remarks
 * <br />
 * <br />
 * <p>
 * It is advisable by MDN to always send targetOrigin (usually your host) to avoid security breach.<br/>
 * When writing the listener of this message, ensure event.origin is verified and acknowledged before further processing.
 * </p>
 *
 * @example
 * ```
 * const newWindow = window.open("https://groww.in/random-route", "_blank");
 *
 * postWindowMessage(newWindow, 'CHANGE_THEME', { theme: 'dark' }, "https://groww.in");
 * ```
 *
 * @category DOM Based Method
 */
export function postWindowMessage(targetWindow:Window = window, action:string = 'WINDOW_ACTION', params:Object = {}, targetOrigin:string = '') {
  try {

    if (typeof targetWindow === 'undefined') {
      throw new Error('window is undefined');
    }

    if (!targetOrigin) {
      throw new Error('targetOrigin not defined. Security is at risk');
    }

    const message:string = JSON.stringify({
      action,
      params
    });

    targetWindow.postMessage(message, origin);

  } catch (error) {
    console.error('Error while window.postMessage', error);
  }
}


export function listenWindowMessage(expectedOrigin: string, eventCallback: Function) {
  try {
    window.addEventListener('message', (event) => {

      if (event.origin !== expectedOrigin) {
        throw new Error('Origin breach');
      }

      eventCallback(JSON.parse(event.data));

    });

  } catch (error) {

  }
}
