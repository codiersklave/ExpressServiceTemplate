import dotenv from "dotenv";
import {PaginationError} from "#errors/PaginationError";

dotenv.config();

/**
 * Applies pagination to the provided query options and modifies the options object.
 *
 * This function uses `page` and `pageSize` parameters from the query object to calculate
 * pagination settings and sets the `limit` and `offset` properties in the options object.
 * If either `page` or `pageSize` is not supplied or invalid, default values are used.
 *
 * Environment variables `MAX_PAGE_SIZE` and `DEFAULT_PAGE_SIZE` are used to determine
 * the maximum and default page sizes, respectively.
 *
 * Throws an error if the provided page number is less than or equal to zero.
 *
 * @param {Object} query - Query object containing pagination parameters (page and pageSize).
 * @param {Object} options - Object to which `limit` and `offset` properties will be added.
 * @returns {Object} The modified options object with added `limit` and `offset` properties.
 * @throws {PaginationError} If the page number is less than or equal to zero.
 */
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

/**
 * Adds pagination metadata to the response object based on the request query parameters
 * and the total count of records.
 *
 * @param {Express.Request} req - The request object.
 * @param {Express.Response} res - The response object
 * @param {Array} records - The array of records for the current page.
 * @param {number} count - The total number of records available to paginate.
 * @throws {PaginationError} If the requested page number exceeds the total pages or is invalid.
 *
 * This function calculates pagination metadata such as the current page, total pages,
 * total items, items per page, and the count of items on the current page. It also enforces
 * constraints like maximum page size and ensures page numbers are valid.
 */
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
