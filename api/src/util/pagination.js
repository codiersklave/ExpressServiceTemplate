export const applyPagination = (query, options) => {
  const {page = 1, pageSize = 10} = query;
  const limit = parseInt(pageSize, 10);
  const offset = (parseInt(page, 10) - 1) * limit;

  options.limit = limit;
  options.offset = offset;

  return options;
}

export const addPaginationMeta = (req, res, count) => {
  const totalPages = Math.ceil(count / (parseInt(req.query.pageSize, 10) || 10));

  if (!res.hasOwnProperty('meta')) {
    res.meta = {};
  }

  res.meta.pagination = {
    totalItems: count,
    totalPages,
    currentPage: parseInt(req.query.page, 10) || 1,
    pageSize: parseInt(req.query.pageSize, 10) || 10,
  };
}
