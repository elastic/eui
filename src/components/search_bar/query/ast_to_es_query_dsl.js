import { printIso8601 } from './date_format';
import { isDateValue, dateValue } from './date_value';
import { AST } from './ast';
import { isArray, isDateLike, isString } from '../../../services/predicate';

const processDateOperation = (value, operator) => {
  const { granularity, resolve } = value;
  let expression = printIso8601(resolve());
  if (!granularity) {
    return { operator, expression };
  }
  switch (operator) {
    case AST.Operator.GT:
      expression = `${expression}||+1${granularity.es}/${granularity.es}`;
      return { operator: AST.Operator.GTE, expression };
    case AST.Operator.GTE:
      expression = `${expression}||/${granularity.es}`;
      return { operator, expression };
    case AST.Operator.LT:
      expression = `${expression}||/${granularity.es}`;
      return { operator, expression };
    case AST.Operator.LTE:
      expression = `${expression}||+1${granularity.es}/${granularity.es}`;
      return { operator: AST.Operator.LT, expression };
    default:
      expression = `${expression}||/${granularity.es}`;
      return { expression };
  }
};

export const _termValuesToQuery = (values, options) => {
  const body = {
    query: values.join(' '),
  };
  if (body.query === '') {
    return;
  }
  if (options.defaultFields) {
    body.fields = options.defaultFields;
  }
  return {
    simple_query_string: body,
  };
};

export const _fieldValuesToQuery = (field, operations, andOr) => {
  const queries = [];

  Object.keys(operations).forEach(operator => {
    const values = operations[operator];
    switch (operator) {
      case AST.Operator.EQ:
        const { terms, phrases, dates } = values.reduce(
          (tokenTypes, value) => {
            if (isDateValue(value)) {
              tokenTypes.dates.push(value);
            } else if (isDateLike(value)) {
              tokenTypes.dates.push(dateValue(value));
            } else if (isString(value) && value.match(/\s/)) {
              tokenTypes.phrases.push(value);
            } else {
              tokenTypes.terms.push(value);
            }
            return tokenTypes;
          },
          { terms: [], phrases: [], dates: [] }
        );

        if (terms.length > 0) {
          queries.push({
            match: {
              [field]: {
                query: terms.join(' '),
                operator: andOr,
              },
            },
          });
        }

        if (phrases.length > 0) {
          queries.push(
            ...phrases.map(phrase => ({
              match_phrase: {
                [field]: phrase,
              },
            }))
          );
        }

        if (dates.length > 0) {
          queries.push(
            ...dates.map(value => ({
              match: {
                [field]: processDateOperation(value).expression,
              },
            }))
          );
        }

        break;

      default:
        values.forEach(value => {
          if (isDateValue(value)) {
            const operation = processDateOperation(value, operator);
            queries.push({
              range: {
                [field]: {
                  [operation.operator]: operation.expression,
                },
              },
            });
          } else {
            queries.push({
              range: {
                [field]: {
                  [operator]: value,
                },
              },
            });
          }
        });
    }
  });

  if (queries.length === 1) {
    return queries[0];
  }

  const key = andOr === 'and' ? 'must' : 'should';
  return {
    bool: {
      [key]: [...queries],
    },
  };
};

export const _isFlagToQuery = (flag, on) => {
  return {
    term: { [flag]: on },
  };
};

const collectTerms = clauses => {
  return clauses.reduce(
    (values, clause) => {
      if (AST.Match.isMustClause(clause)) {
        values.must.push(clause.value);
      } else {
        values.mustNot.push(clause.value);
      }
      return values;
    },
    { must: [], mustNot: [] }
  );
};

const collectFields = clauses => {
  const fieldArray = (obj, field, operator) => {
    if (!obj[field]) {
      obj[field] = {};
    }
    if (!obj[field][operator]) {
      obj[field][operator] = [];
    }
    return obj[field][operator];
  };

  return clauses.reduce(
    (fields, clause) => {
      if (AST.Match.isMustClause(clause)) {
        if (isArray(clause.value)) {
          fieldArray(fields.must.or, clause.field, clause.operator).push(
            ...clause.value
          );
        } else {
          fieldArray(fields.must.and, clause.field, clause.operator).push(
            clause.value
          );
        }
      } else {
        if (isArray(clause.value)) {
          fieldArray(fields.mustNot.or, clause.field, clause.operator).push(
            ...clause.value
          );
        } else {
          fieldArray(fields.mustNot.and, clause.field, clause.operator).push(
            clause.value
          );
        }
      }
      return fields;
    },
    {
      must: { and: {}, or: {} },
      mustNot: { and: {}, or: {} },
    }
  );
};

const clausesToEsQueryDsl = ({ fields, terms, is }, options = {}) => {
  const extraMustQueries = options.extraMustQueries || [];
  const extraMustNotQueries = options.extraMustNotQueries || [];
  const termValuesToQuery = options.termValuesToQuery || _termValuesToQuery;
  const fieldValuesToQuery = options.fieldValuesToQuery || _fieldValuesToQuery;
  const isFlagToQuery = options.isFlagToQuery || _isFlagToQuery;

  const must = [];
  must.push(...extraMustQueries);
  const termMustQuery = termValuesToQuery(terms.must, options);
  if (termMustQuery) {
    must.push(termMustQuery);
  }
  Object.keys(fields.must.and).forEach(field => {
    must.push(fieldValuesToQuery(field, fields.must.and[field], 'and'));
  });
  Object.keys(fields.must.or).forEach(field => {
    must.push(fieldValuesToQuery(field, fields.must.or[field], 'or'));
  });
  is.forEach(clause => {
    must.push(isFlagToQuery(clause.flag, AST.Match.isMustClause(clause)));
  });

  const mustNot = [];
  mustNot.push(...extraMustNotQueries);
  const termMustNotQuery = termValuesToQuery(terms.mustNot, options);
  if (termMustNotQuery) {
    mustNot.push(termMustNotQuery);
  }
  Object.keys(fields.mustNot.and).forEach(field => {
    mustNot.push(fieldValuesToQuery(field, fields.mustNot.and[field], 'and'));
  });
  Object.keys(fields.mustNot.or).forEach(field => {
    mustNot.push(fieldValuesToQuery(field, fields.mustNot.or[field], 'or'));
  });

  const bool = {};
  if (must.length !== 0) {
    bool.must = must;
  }
  if (mustNot.length !== 0) {
    bool.must_not = mustNot;
  }

  return bool;
};

const EMPTY_TERMS = { must: [], mustNot: [] };
const EMPTY_FIELDS = {
  must: { and: {}, or: {} },
  mustNot: { and: {}, or: {} },
};

export const astToEsQueryDsl = (ast, options) => {
  if (ast.clauses.length === 0) {
    return { match_all: {} };
  }

  const terms = collectTerms(ast.getTermClauses());
  const fields = collectFields(ast.getFieldClauses());
  const is = ast.getIsClauses();

  const matchesBool = clausesToEsQueryDsl({ terms, fields, is }, options);
  const hasTopMatches = Object.keys(matchesBool).length > 0;

  const groupClauses = ast.getGroupClauses();
  if (groupClauses.length === 0) {
    // there are no GroupClauses, everything at top level is combined as a must
    return { bool: matchesBool };
  } else {
    // there is at least one GroupClause, wrap the above clauses in another layer and append the ORs
    const must = groupClauses.reduce(
      (must, groupClause) => {
        const clauses = groupClause.value.reduce((clauses, clause) => {
          if (AST.Term.isInstance(clause)) {
            clauses.push(
              clausesToEsQueryDsl({
                terms: collectTerms([clause]),
                fields: EMPTY_FIELDS,
                is: [],
              })
            );
          } else if (AST.Field.isInstance(clause)) {
            clauses.push(
              clausesToEsQueryDsl({
                terms: EMPTY_TERMS,
                fields: collectFields([clause]),
                is: [],
              })
            );
          } else if (AST.Is.isInstance(clause)) {
            clauses.push(
              clausesToEsQueryDsl({
                terms: EMPTY_TERMS,
                fields: EMPTY_FIELDS,
                is: [clause],
              })
            );
          }
          return clauses;
        }, []);

        must.push({
          bool: {
            should: clauses.map(clause => ({ bool: clause })),
          },
        });
        return must;
      },
      hasTopMatches // only include the first match group if there are any conditions
        ? [{ bool: matchesBool }]
        : []
    );

    return {
      bool: { must },
    };
  }
};
