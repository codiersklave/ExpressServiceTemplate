import dayjs from "dayjs";

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