/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { GENESIS_BLOCK, GENESIS_TX, DECIMAL_PLACES, MIN_API_VERSION } from '../constants';

const helpers = {
  updateListWs(list, newEl, max) {
    // We remove the last element if we already have the max
    if (list.length === max) {
      list.pop();
    }
    // Then we add the new on in the first position
    list.splice(0, 0, newEl);
    return list;
  },

  getTxType(tx) {
    if (GENESIS_TX.indexOf(tx.hash) > -1) {
      return 'Tx';
    } else if (GENESIS_BLOCK.indexOf(tx.hash) > -1) {
      return 'Block';
    } else {
      if (tx.inputs.length > 0) {
        return 'Tx';
      } else {
        return 'Block';
      }
    }
  },

  isBlock(tx) {
    return this.getTxType(tx) === 'Block';
  },

  roundFloat(n) {
    return Math.round(n*100)/100
  },

  prettyValue(value) {
    return (value/10**DECIMAL_PLACES).toFixed(DECIMAL_PLACES);
  },

  isVersionAllowed(version) {
    // Verifies if the version in parameter is allowed to make requests to the API backend
    // We check with our min api version
    if (version.includes('beta') !== MIN_API_VERSION.includes('beta')) {
      // If one version is beta and the other is not, it's not allowed to use it
      return false;
    }

    // Clean the version string to have an array of integers
    // Check for each value if the version is allowed
    let versionTestArr = this.getCleanVersionArray(version);
    let minVersionArr = this.getCleanVersionArray(MIN_API_VERSION);
    for (let i=0; i<minVersionArr.length; i++) {
      if (minVersionArr[i] > versionTestArr[i]) {
        return false;
      } else if (minVersionArr[i] < versionTestArr[i]) {
        return true;
      }
    }

    return true;
  },

  getCleanVersionArray(version) {
    return version.replace(/[^\d.]/g, '').split('.');
  },

  /*
   * Returns the right string depending on the quantity (plural or singular)
   *
   * @param {number} quantity Value considered to check plural or singular
   * @param {string} singular String to be returned in case of singular
   * @param {string} plural String to be returned in case of plural
   *
   * @return {string} plural or singular
   * @memberof Helpers
   * @inner
   *
   */
  plural(quantity, singular, plural) {
    if (quantity === 1) {
      return singular;
    } else {
      return plural;
    }
  },

  /**
   * Returns a string with the short version of the id of a transaction
   * Returns {first12Chars}...{last12Chars}
   *
   * @param {string} hash Transaction ID to be shortened
   *
   * @return {string}
   * @memberof Helpers
   * @inner
   *
   */
  getShortHash(hash) {
    return `${hash.substring(0,12)}...${hash.substring(52,64)}`;
  },

  /**
   * Returns the prefixes for truncated values
   *
   * If the value was divided by 1024 one time, returns 'K',
   * in case of two divisions, 'M', for 3 divisions, 'G' and so on.
   *
   * @param {number} divisions Number of times the value was divided by 1024
   *
   * @return {string} Prefix to be used
   * @memberof Helpers
   * @inner
   */
  getUnitPrefix(divisions) {
    const unitMap = {
      0: '',
      1: 'K',
      2: 'M',
      3: 'G',
      4: 'T',
      5: 'P',
      6: 'E',
      7: 'Z',
      8: 'Y',
    }
    return unitMap[divisions];
  },

  /**
   * Divide a big value to be used with prefixes
   * The value is divided by 1024 while it can
   *
   * 3,000 = 2.93 after one division (K)
   * 50,000,000 = 47.68 after two divisions (M)
   *
   * @param {number} value Value to be divided
   *
   * @return {Object} Object with truncated value and number of divisions
   * @memberof Helpers
   * @inner
   */
  divideValueIntoPrefix(value) {
    let divisions = 0;
    while ((value / 1024) > 1) {
      value /= 1024;
      divisions += 1;
    }

    return {value: value.toFixed(2), divisions};
  },
}

export default helpers;
