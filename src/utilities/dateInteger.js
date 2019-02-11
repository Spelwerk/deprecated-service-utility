/**
 * @public
 * @returns {number}
 */
const now = () => Math.floor(Date.now() / 1000);

/**
 * @public
 * @param {number} date
 * @param {number} minutes
 * @returns {number}
 */
const addMinutes = (date, minutes) => date + (minutes * 60);

/**
 * @public
 * @param {number} date
 * @param {number} hours
 * @returns {number}
 */
const addHours = (date, hours) => date + (hours * 60 * 60);

/**
 * @public
 * @param {number} date
 * @param {number} days
 * @returns {number}
 */
const addDays = (date, days) => date + (days * 24 * 60 * 60);

/**
 * @public
 * @param {number} date
 * @param {number} days
 * @param {number} hours
 * @param {number} minutes
 * @returns {number}
 */
const addDaysHoursMinutes = (date, days, hours, minutes) => {
    let modified = date;
    modified = addDays(modified, days);
    modified = addHours(modified, hours);
    modified = addMinutes(modified, minutes);
    return modified;
};

module.exports = {
    now,
    addMinutes,
    addHours,
    addDays,
    addDaysHoursMinutes,
};
