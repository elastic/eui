import PropTypes from 'prop-types';

export const PageType = PropTypes.shape({
  size: PropTypes.number,
  index: PropTypes.number,
  items: PropTypes.array,
  totalItemCount: PropTypes.number
});

export const Page = Object.freeze({
  hasNextPage: (page /* PageType */) => {
    return page.totalItemCount - (page.index + 1) * page.size > 0;
  },
  hasPrevPage: (page /* PageType */) => {
    return page.index > 0;
  },
  getTotalPageCount: (page /* PageType */) => {
    return Math.ceil(page.totalItemCount / page.size);
  }
});
