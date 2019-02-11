/**
 * @public
 * @param {array|string} array
 * @param {string|number} string
 * @returns {boolean}
 */
const contains = (array, string) => array.indexOf(string) !== -1;

/**
 * @public
 * @param {*} value
 * @returns {boolean}
 */
const isEmpty = (value) => value === null || value === '' || typeof value === 'undefined';

module.exports = {
    contains,
    isEmpty,
};
