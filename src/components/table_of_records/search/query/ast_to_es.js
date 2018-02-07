import { AST } from './ast';


export const _termValuesToQuery = (values, options) => {
  const body = {
    query: values.join(' ')
  };
  if (body.query === '') {
    return;
  }
  if (options.defaultFields) {
    body.fields = options.defaultFields;
  }
  return {
    'simple_query_string': body
  };
};

export const _fieldValuesToAndQuery = (field, values) => {
  return {
    match: {
      [field]: {
        query: values.join(' '),
        operator: 'and'
      }
    }
  };
};

export const _isFlagToQuery = (flag, on) => {
  return {
    term: { [flag]: on }
  };
};

const collectTerms = (ast) => {
  return ast.getTermClauses().reduce((values, clause) => {
    if (AST.Match.isMustClause(clause)) {
      values.must.push(clause.value);
    } else {
      values.mustNot.push(clause.value);
    }
    return values;
  }, { must: [], mustNot: [] });
};

const collectFields = (ast) => {
  return ast.getFieldClauses().reduce((values, clause) => {
    if (AST.Match.isMustClause(clause)) {
      if (!values.must[clause.field]) {
        values.must[clause.field] = [];
      }
      values.must[clause.field].push(clause.value);
    } else {
      if (!values.mustNot[clause.field]) {
        values.mustNot[clause.field] = [];
      }
      values.mustNot[clause.field].push(clause.value);
    }
    return values;
  }, { must: {}, mustNot: {} });
};

export const astToES = (ast, options = {}) => {

  if (ast.clauses.length === 0) {
    return { match_all: {} };
  }

  const extraMustQueries = options.extraMustQueries || [];
  const extraMustNotQueries = options.extraMustNotQueries || [];
  const termValuesToQuery = options.termValuesToQuery || _termValuesToQuery;
  const fieldValuesToAndQuery = options.fieldValuesToAndQuery || _fieldValuesToAndQuery;
  const isFlagToQuery = options.isFlagToQuery || _isFlagToQuery;

  const terms = collectTerms(ast);
  const fields = collectFields(ast);

  const must = [];
  must.push(...extraMustQueries);
  const termMustQuery = termValuesToQuery(terms.must, options);
  if (termMustQuery) {
    must.push(termMustQuery);
  }
  must.push(...Object.keys(fields.must).map(field => {
    return fieldValuesToAndQuery(field, fields.must[field]);
  }));
  must.push(...ast.getIsClauses().map(clause => {
    return isFlagToQuery(clause.flag, AST.Match.isMustClause(clause));
  }));

  const mustNot = [];
  mustNot.push(...extraMustNotQueries);
  const termMustNotQuery = termValuesToQuery(terms.mustNot, options);
  if (termMustNotQuery) {
    mustNot.push(termMustNotQuery);
  }
  mustNot.push(...Object.keys(fields.mustNot).map(field => {
    return fieldValuesToAndQuery(field, fields.mustNot[field]);
  }));

  const bool = {};
  if (must.length !== 0) {
    bool.must = must;
  }
  if (mustNot.length !== 0) {
    bool.must_not = mustNot;
  }
  return { bool };
};
