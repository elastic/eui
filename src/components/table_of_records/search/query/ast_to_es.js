import { Occur } from './ast';


export const _defaultValuesToQuery = (values, options) => {
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

export const _isToQuery = (flag, on) => {
  return {
    term: { [flag]: on }
  };
};

const collectDefaultValues = (ast) => {
  return ast.getDefaultClauses().reduce((values, clause) => {
    if (clause.occur === Occur.MUST) {
      values.must.push(clause.value);
    } else {
      values.must.push(clause.value);
    }
    return values;
  }, { must: [], mustNot: [] });
};

const collectFieldValues = (ast) => {
  return ast.getFieldClauses().reduce((values, clause) => {
    if (clause.occur === Occur.MUST) {
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
  const defaultValuesToQuery = options.defaultValuesToQuery || _defaultValuesToQuery;
  const fieldValuesToAndQuery = options.fieldValuesToAndQuery || _fieldValuesToAndQuery;
  const isToQuery = options.isToQuery || _isToQuery;

  const defaultValues = collectDefaultValues(ast);
  const fieldValues = collectFieldValues(ast);

  const must = [];
  must.push(...extraMustQueries);
  const defaultMustQuery = defaultValuesToQuery(defaultValues.must, options);
  if (defaultMustQuery) {
    must.push(defaultMustQuery);
  }
  must.push(...Object.keys(fieldValues.must).map(field => {
    return fieldValuesToAndQuery(field, fieldValues.must[field]);
  }));
  must.push(...ast.getIsClauses().map(clause => {
    return isToQuery(clause.flag, clause.applied);
  }));

  const mustNot = [];
  mustNot.push(...extraMustNotQueries);
  const defaultMustNotQuery = defaultValuesToQuery(defaultValues.mustNot, options);
  if (defaultMustNotQuery) {
    mustNot.push(defaultMustNotQuery);
  }
  mustNot.push(...Object.keys(fieldValues.mustNot).map(field => {
    return fieldValuesToAndQuery(field, fieldValues.mustNot[field]);
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
