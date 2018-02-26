import { Ast } from './ast';
import { isArray } from '../predicate';

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

export const _fieldValuesToQuery = (field, values, operator) => {

  const { terms, phrases } = values.reduce((split, value) => {
    if (value.match(/\s/)) {
      split.phrases.push(value);
    } else {
      split.terms.push(value);
    }
    return split;
  }, { terms: [], phrases: [] });

  const termsQuery = terms.length === 0 ? undefined : {
    match: {
      [field]: {
        query: terms.join(' '),
        operator
      }
    }
  };

  const phraseQueries = phrases.length === 0 ? undefined : phrases.map(phrase => ({
    match_phrase: {
      [field]: phrase
    }
  }));

  const key = operator === 'and' ? 'must' : 'should';

  if (termsQuery && phraseQueries) {
    return {
      bool: {
        [key]: [ termsQuery, ...phraseQueries ]
      }
    };
  }
  if (termsQuery) {
    return termsQuery;
  }
  if (phraseQueries) {
    if (phraseQueries.length === 1) {
      return phraseQueries[0];
    }
    return {
      bool: {
        [key]: phraseQueries
      }
    };
  }
};

export const _isFlagToQuery = (flag, on) => {
  return {
    term: { [flag]: on }
  };
};

const collectTerms = (ast) => {
  return ast.getTermClauses().reduce((values, clause) => {
    if (Ast.Match.isMustClause(clause)) {
      values.must.push(clause.value);
    } else {
      values.mustNot.push(clause.value);
    }
    return values;
  }, { must: [], mustNot: [] });
};

const collectFields = (ast) => {

  const fieldArray = (obj, field) => {
    if (!obj[field]) {
      obj[field] = [];
    }
    return obj[field];
  };

  return ast.getFieldClauses().reduce((fields, clause) => {
    if (Ast.Match.isMustClause(clause)) {
      if (isArray(clause.value)) {
        fieldArray(fields.must.or, clause.field).push(...clause.value);
      } else {
        fieldArray(fields.must.and, clause.field).push(clause.value);
      }
    } else {
      if (isArray(clause.value)) {
        fieldArray(fields.mustNot.or, clause.field).push(...clause.value);
      } else {
        fieldArray(fields.mustNot.and, clause.field).push(clause.value);
      }
    }
    return fields;
  }, {
    must: { and: {}, or: {} },
    mustNot: { and: {}, or: {} }
  });
};

export const astToEs = (ast, options = {}) => {

  if (ast.clauses.length === 0) {
    return { match_all: {} };
  }

  const extraMustQueries = options.extraMustQueries || [];
  const extraMustNotQueries = options.extraMustNotQueries || [];
  const termValuesToQuery = options.termValuesToQuery || _termValuesToQuery;
  const fieldValuesToQuery = options.fieldValuesToQuery || _fieldValuesToQuery;
  const isFlagToQuery = options.isFlagToQuery || _isFlagToQuery;

  const terms = collectTerms(ast);
  const fields = collectFields(ast);

  const must = [];
  must.push(...extraMustQueries);
  const termMustQuery = termValuesToQuery(terms.must, options);
  if (termMustQuery) {
    must.push(termMustQuery);
  }
  must.push(...Object.keys(fields.must.and).map(field => {
    return fieldValuesToQuery(field, fields.must.and[field], 'and');
  }));
  must.push(...Object.keys(fields.must.or).map(field => {
    return fieldValuesToQuery(field, fields.must.or[field], 'or');
  }));
  must.push(...ast.getIsClauses().map(clause => {
    return isFlagToQuery(clause.flag, Ast.Match.isMustClause(clause));
  }));

  const mustNot = [];
  mustNot.push(...extraMustNotQueries);
  const termMustNotQuery = termValuesToQuery(terms.mustNot, options);
  if (termMustNotQuery) {
    mustNot.push(termMustNotQuery);
  }
  mustNot.push(...Object.keys(fields.mustNot.and).map(field => {
    return fieldValuesToQuery(field, fields.mustNot.and[field], 'and');
  }));
  mustNot.push(...Object.keys(fields.mustNot.or).map(field => {
    return fieldValuesToQuery(field, fields.mustNot.or[field], 'or');
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
