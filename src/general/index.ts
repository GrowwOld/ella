/**
 * @module General
 */

import { TabsData } from '../utils/types';

/**
 * This method can be used to check if the variable is empty or not. Returns true if it is empty else false.
 *
 * @param {any} data - Any variable that you want to check if it is empty or not
 *
 * @example
 * ```
 * if(isEmpty(userData)) {
 *   return;
 * }
 * ```
 */
export function isEmpty(data: any) {
  try {
    if (data === null || data === undefined || typeof data === 'undefined') {
      return true;
    }

    const dataType = typeof data;

    switch (dataType) {

      case 'string':
        if (data.trim() === '' || data === 'null' || data === null) {
          return true;
        }

        return false;

      case 'object':
        const keys = Object.keys(data);
        const len = keys.length;

        if (len <= 0) {
          return true;
        }

        return false;

      case 'number':
        return false;

      default:
        // for array
        if (Array.isArray(data) && data.length <= 0) {
          return true;
        }

        return false;
    }

  } catch (e) {
    return true;
  }
}


/**
 * This method returns an array of given size filled with provided value
 *
 * @param {number} arraySize - Size of the array i.e number of elements in the array
 * @param {string | number} value - Value that you want to fill in the array
 *
 * @example
 * ```
 * getFilledArray(4,'hello') // ['hello', 'hello', 'hello', 'hello']
 * ```
 */
export function getFilledArray(arraySize: number, value: string | number) {
  return new Array(arraySize).fill(value);
}


/**
 * This method returns the index of the selected tab
 *
 * @param {any} tabs - Array of tabs object
 * @param {string} selectedTabName - Selected tab name
 *
 * @remarks
 * Please ensure that tab object has searchId key to facilitate matching process
 *
 * @example
 * ```
 * getSelectedTabIndex(tabsArrayOfObject,'mutual-funds') // 1
 * ```
 */
export function getSelectedTabIndex(tabs: TabsData[], selectedTabName: string): number {
  let defaultIndex = 0;

  try {
    if (selectedTabName) {
      tabs.map((tab, index) => {
        if (tab.searchId === selectedTabName) {
          defaultIndex = index;
        }
      });
    }

    return defaultIndex;

  } catch (e) {
    console.error('Unable to return the selected tab index');
    return defaultIndex;
  }
}


/**
 * This function can download a file on user's machine either directly by a url or a blob object.
 *
 * @param {
 *  file:File | null;
 *  type:string; fileName:string;
 *  downloadMethod:string;
 *  fileExtension:string;
 *  fileUrl:string | null
 * } downloadConfig
 *
 * @remarks
 *
 * Please ensure you are passing the appropriate downloadMethod type -
 * <br />
 * <br />
 * <p>'url' method expects the fileUrl argument</p>
 * <p>'blob' expects the file argument</p>
 *
 * <br />
 * <h4>downloadConfig properties</h4>
 * <ul>
 *  <li> <span style="font-weight: bold;">file</span> => BlobObject or null. Required if downloadMethod is 'blob' </li>
 *  <li> <span style="font-weight: bold;">type</span> => MIME-TYPE of the file. 'application/pdf', 'application/gzip', 'image/png' </li>
 *  <li> <span style="font-weight: bold;">fileName</span> => Expected name of the downloaded file </li>
 *  <li> <span style="font-weight: bold;">downloadMethod</span> => 'blob' or 'url' </li>
 *  <li> <span style="font-weight: bold;">fileExtension</span> => Expected extension of the downloaded file </li>
 *  <li> <span style="font-weight: bold;">fileUrl</span> => downloadable file's url. Required if downloadMethod is 'url' </li>
 * </ul>
 *
 * @example
 * ```
 * downloadFile({
 *  file: fileBlobObject,
 *  type: 'application/pdf',
 *  fileName: 'MyFile',
 *  fileExtension: 'pdf',
 *  downloadMethod: 'blob',
 *  fileUrl: null
 * }) // *Downloads file of type PDF on the client's machine named MyFile.pdf*
 * ```
 *
 * @category General Method
 */
export function downloadFile(downloadConfig: { file: File | null; type: string; fileName: string; downloadMethod: string; fileExtension: string; fileUrl: string | null }) {

  const DOWNLOAD_FILE_METHOD = {
    BLOB: 'blob',
    URL: 'url'
  };

  const { file = null, type, fileName, downloadMethod = DOWNLOAD_FILE_METHOD.URL, fileExtension, fileUrl } = downloadConfig;


  const createFileUrlFromBlob = (file: File | null, type: string) => {
    if (file) {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      const newBlob = new Blob([ file ], { type });

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const fileURL = (window.URL || window.webkitURL).createObjectURL(newBlob);

      return fileURL;

    } else {
      throw new Error('file/blob is null');
    }
  };


  const downloadFileFromUrl = (fileUrl: string | null, fileName: string, extension: string) => {
    if (fileUrl) {
      const link = document.createElement('a');

      link.href = fileUrl;
      link.download = `${fileName}.${extension}`;
      link.target = '_blank';

      document.body.appendChild(link);
      link.click();

      setTimeout(function() {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(fileUrl);
      }, 10);

    } else {
      throw new Error('fileUrl is empty');
    }
  };


  try {
    if (isEmpty(window)) {
      throw new Error('window is undefined');
    }

    switch (downloadMethod) {
      case DOWNLOAD_FILE_METHOD.BLOB:
        const fileUrlFromBlob = createFileUrlFromBlob(file, type);

        downloadFileFromUrl(fileUrlFromBlob, fileName, fileExtension);
        break;

      case DOWNLOAD_FILE_METHOD.URL:
        downloadFileFromUrl(fileUrl, fileName, fileExtension);

        break;
    }

  } catch (err) {
    console.error('File download failed - ', err);
  }
}


/**
 * Returns the value at given path from the source object. If path is not found then default value is returned.
 * This method works exactly like Lodash's getData method.
 *
 * @param { { [key: string]: unknown } } obj - Source object
 * @param {string} path - Path to desired key inside source object
 *
 * @remarks
 * Provide a default value always to avoid unexpected behavior
 *
 * @example
 * ```
 * const obj = { a: { b: [ 56, 75, 23 ], d: 1 }, e: 2 };
 *
 * getData(obj, 'a.d', null) // 1
 * getData(obj, 'e', null) // 2
 * getData(obj, 'a.d.e', 'random') // 'random'
 * getData(obj, 'a.b[0]', null) // 56
 * getData(obj, 'a.b.[2]', null) // 23
 * ```
 */
export function getData(obj: { [key: string]: unknown }, path: string, def: null | unknown = null): { [key: string]: unknown } | null | unknown {

  const sanitzePath = (currPath: string) => {

    // 'a.[0].b.c' => 'a.0.b.c'

    let sanitizedPath = String(currPath).replaceAll('[', '.').replaceAll(']', '.').replaceAll('..', '.');

    const isLastIndexDot = sanitizedPath.lastIndexOf('.') === sanitizedPath.length - 1;

    sanitizedPath = sanitizedPath.slice(0, isLastIndexDot ? sanitizedPath.lastIndexOf('.') : sanitizedPath.length);

    return sanitizedPath;
  };

  try {
    const newPathArray = String(sanitzePath(path)).split('.');

    for (const path of newPathArray) {
      obj = obj[path] as { [key: string]: unknown };
    }

    return obj ? obj : def;

  } catch (e) {
    console.error('Error while using getData', e);
    return def;
  }
}
