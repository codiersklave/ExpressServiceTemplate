import dotenv from "dotenv";
import {PaginationError} from "#errors/PaginationError";

dotenv.config();

export const applyPagination = (query, options) => {
  const maxPageSize = parseInt(process.env.MAX_PAGE_SIZE, 10) || 100;
  const defaultPageSize = parseInt(process.env.DEFAULT_PAGE_SIZE, 10) || 25;

  const page = parseInt(query.page, 10) || 1;
  const pageSize = Math.min(parseInt(query.pageSize, 10) || defaultPageSize, maxPageSize);

  if (page <= 0) {
    throw new PaginationError('Page number must be greater than zero');
  }

  options.limit = pageSize;
  options.offset = (page - 1) * pageSize;

  return options;
}

export const addPaginationMeta = (req, res, records, count) => {
  const maxPageSize = parseInt(process.env.MAX_PAGE_SIZE, 10) || 100;
  const defaultPageSize = parseInt(process.env.DEFAULT_PAGE_SIZE, 10) || 25;
  const pageSize = Math.min(parseInt(req.query.pageSize, 10) || defaultPageSize, maxPageSize);
  const totalPages = Math.ceil(count / pageSize) || 1;
  const currentPage = parseInt(req.query.page, 10) || 1;

  if (currentPage > totalPages) {
    throw new PaginationError(`Page ${currentPage} does not exist. Last page is ${totalPages}`);
  }

  if (currentPage <= 0) {
    throw new PaginationError('Page number must be greater than zero');
  }

  if (!res.hasOwnProperty('meta')) {
    res.meta = {};
  }

  res.meta.pagination = {
    currentPage,
    pagesTotal: totalPages,
    itemsTotal: count,
    itemsPerPage: pageSize,
    itemsOnPage: records.length,
  };
}
