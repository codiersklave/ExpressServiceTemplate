export const applyPagination = (query, options) => {
  const {page = 1, pageSize = 10} = query;
  const limit = parseInt(pageSize, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  options.limit = limit;
  options.offset = offset;

  return options;
}
