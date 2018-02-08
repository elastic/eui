import { Comparators } from '../../services/sort';
import { isString } from '../../services/predicate';
import { Query } from './search';

const resolveQuery = (criteria) => {
  if (!criteria.search) {
    return;
  }
  return isString(criteria.search.query) ?
    Query.parse(criteria.search.query) :
    criteria.search.query;
};

export const executeCriteria = (items, criteria, options = {}) => {
  const query = resolveQuery(criteria);

  let hits = items;
  if (query) {
    hits = query.execute(hits, options);
  }
  if (criteria.sort) {
    hits = hits.sort(Comparators.property(criteria.sort.field, Comparators.default(criteria.sort.direction)));
  }
  const total = hits.length;
  if (!criteria.page) {
    return { total, hits };
  }
  const pageIndex = criteria.page.index || 0;
  const pageSize = criteria.page.size || options.defaultPageSize || 10;
  const from = pageIndex * pageSize;
  hits = hits.slice(from, Math.min(from + pageSize, hits.length));
  return { total, hits };
};
