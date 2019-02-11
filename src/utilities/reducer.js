/**
 * @public
 * @param {array} array
 * @returns {array}
 */
const reducer = (array) => {
    return array.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? reducer(toFlatten) : toFlatten);
    }, []);
};

module.exports = { reducer };
