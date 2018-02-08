import { isString } from '../../services/predicate';
import { Query as DefaultQuery } from './search';
import { SortDirection } from '../../services/sort';

export const criteriaToESRequestBody = (criteria, options = {}) => {

  const Query = options.Query || DefaultQuery;

  const body = {};

  if (!criteria.page) {
    body.size = options.size || 10;
    body.from = 0;
  } else {
    body.size = criteria.page.size;
    body.from = body.size * criteria.page.index;
  }

  if (criteria.sort) {
    body.sort = [
      { [criteria.sort.field]: SortDirection.isAsc(criteria.sort.direction) ? 'asc' : 'desc' },
      '_score'
    ];
  }

  if (!criteria.search) {
    body.query = { match_all: {} };
  } else {
    const euiQuery = isString(criteria.search.query) ?
      Query.parse(criteria.search.query) :
      criteria.search.query;
    body.query = euiQuery.toESQuery(options);
  }

  return body;
};
