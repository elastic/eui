import { criteriaToESRequestBody } from './criteria_to_es';

describe('criteriaToESRequestBody', () => {

  test('empty criteria', () => {
    const criteria = {};
    const body = criteriaToESRequestBody(criteria);
    expect(body).toMatchSnapshot();
  });

  test('pagination', () => {
    const criteria = {
      page: {
        size: 5,
        index: 3
      }
    };
    const body = criteriaToESRequestBody(criteria);
    expect(body).toMatchSnapshot();
  });

  test('sorting - asc', () => {
    const criteria = {
      sort: {
        field: 'foo',
        direction: 'asc'
      }
    };
    const body = criteriaToESRequestBody(criteria);
    expect(body).toMatchSnapshot();
  });

  test('sorting - desc', () => {
    const criteria = {
      sort: {
        field: 'foo',
        direction: 'desc'
      }
    };
    const body = criteriaToESRequestBody(criteria);
    expect(body).toMatchSnapshot();
  });

  test('search query', () => {
    const Query = {
      parse(query) {
        return {
          toESQuery() {
            return { query };
          }
        };
      }
    };
    const criteria = {
      search: {
        query: 'this is a query'
      }
    };
    const body = criteriaToESRequestBody(criteria, { Query });
    expect(body).toMatchSnapshot();
  });

  test('pagination, sorting and query', () => {
    const Query = {
      parse(query) {
        return {
          toESQuery() {
            return { query };
          }
        };
      }
    };
    const criteria = {
      page: {
        index: 2,
        size: 8
      },
      sort: {
        field: 'foo',
        direction: 'desc'
      },
      search: {
        query: 'this is a query'
      }
    };
    const body = criteriaToESRequestBody(criteria, { Query });
    expect(body).toMatchSnapshot();
  });
});
