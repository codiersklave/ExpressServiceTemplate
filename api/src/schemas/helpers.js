import dayjs from "dayjs";

/**
 * Validates if a given date is a past date and conforms to the format "YYYY-MM-DD".
 *
 * This function ensures that the provided value:
 * - Follows the "YYYY-MM-DD" date format strictly, without including a time component.
 * - Is a valid date that represents a past day (a date before the current day).
 *
 * If the value does not meet these criteria, an appropriate error message is returned.
 *
 * @param {string} value - The date string to validate.
 * @param {Object} helpers - An object allowing custom error messages.
 * @returns {string} - The original date value if validation passes.
 */
export const checkPastDateOnly = (value, helpers) => {
  const parsedDate = dayjs(value, 'YYYY-MM-DD', true);
  if (!parsedDate.isValid() || parsedDate.format('YYYY-MM-DD') !== value) {
    return helpers.message('Date must be in YYYY-MM-DD format without time part');
  }

  const now = dayjs().startOf('day');
  if (parsedDate.isAfter(now)) {
    return helpers.message('Date must be in the Past');
  }

  return value;
}