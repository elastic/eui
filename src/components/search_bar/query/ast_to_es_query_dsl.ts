/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { printIso8601 } from './date_format';
import { isDateValue, dateValue, DateValue } from './date_value';
import {
  _AST,
  AST,
  FieldClause,
  IsClause,
  OperatorType,
  TermClause,
  Value,
} from './ast';
import { isArray, isDateLike, isString } from '../../../services/predicate';
import { keysOf } from '../../common';

export interface QueryContainer {
  bool?: BoolQuery;
  match_all?: {};
  match?: object;
  match_phrase?: object;
  range?: object;
  term?: object;
  simple_query_string?: object;
}

interface TermsQuery {
  must: Value[];
  mustNot: Value[];
}

interface BoolQuery {
  must?: QueryContainer[];
  must_not?: QueryContainer[];
  should?: QueryContainer[];
}

interface FieldsQuery {
  must: {
    and: {
      [field: string]: any;
    };
    or: {
      [field: string]: any;
    };
  };
  mustNot: {
    and: {
      [field: string]: any;
    };
    or: {
      [field: string]: any;
    };
  };
}

type Options = Partial<{
  defaultFields: string[];
  extraMustQueries: QueryContainer[];
  extraMustNotQueries: QueryContainer[];
  termValuesToQuery: (terms: Value[], options: {}) => QueryContainer;
  fieldValuesToQuery: (terms: string, options: {}) => QueryContainer;
  isFlagToQuery: (flag: string, on: boolean) => QueryContainer;
}>;

const processDateOperation = (value: DateValue, operator?: OperatorType) => {
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

export const _termValuesToQuery = (values: Value[], options: Options) => {
  const body: { query: string; fields?: string[] } = {
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

export const _fieldValuesToQuery = (
  field: string,
  operations: { [x in OperatorType]: Value[] },
  andOr: 'and' | 'or'
) => {
  const queries: QueryContainer[] = [];

  keysOf(operations).forEach((operator) => {
    const values = operations[operator];
    switch (operator) {
      case AST.Operator.EQ:
        const terms: Value[] = [];
        const phrases: string[] = [];
        const dates: DateValue[] = [];

        values.forEach((value: Value) => {
          if (isDateValue(value)) {
            dates.push(value);
          } else if (isDateLike(value)) {
            dates.push(dateValue(value)!);
          } else if (isString(value) && value.match(/\s/)) {
            phrases.push(value);
          } else {
            terms.push(value);
          }
        });

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
            ...phrases.map((phrase) => ({
              match_phrase: {
                [field]: phrase,
              },
            }))
          );
        }

        if (dates.length > 0) {
          queries.push(
            ...dates.map((value) => ({
              match: {
                [field]: processDateOperation(value).expression,
              },
            }))
          );
        }

        break;

      default:
        values.forEach((value: Value) => {
          if (isDateValue(value)) {
            const operation = processDateOperation(value, operator);
            queries.push({
              range: {
                [field]: {
                  [operation.operator!]: operation.expression,
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

export const _isFlagToQuery = (flag: string, on: boolean) => {
  return {
    term: { [flag]: on },
  };
};

const collectTerms = (clauses: TermClause[]) => {
  const values: TermsQuery = { must: [], mustNot: [] };

  for (const clause of clauses) {
    if (AST.Match.isMustClause(clause)) {
      values.must.push(clause.value);
    } else {
      values.mustNot.push(clause.value);
    }
  }

  return values;
};

const collectFields = (clauses: FieldClause[]) => {
  const fieldArray = (obj: any, field: string, operator: OperatorType) => {
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

const clausesToEsQueryDsl = (
  {
    fields,
    terms,
    is,
  }: { fields: FieldsQuery; terms: TermsQuery; is: IsClause[] },
  options: Options = {}
) => {
  const extraMustQueries = options.extraMustQueries || [];
  const extraMustNotQueries = options.extraMustNotQueries || [];
  const termValuesToQuery = options.termValuesToQuery || _termValuesToQuery;
  const fieldValuesToQuery = options.fieldValuesToQuery || _fieldValuesToQuery;
  const isFlagToQuery = options.isFlagToQuery || _isFlagToQuery;

  const must: QueryContainer[] = [];
  must.push(...extraMustQueries);

  const termMustQuery = termValuesToQuery(terms.must, options);
  if (termMustQuery) {
    must.push(termMustQuery);
  }
  Object.keys(fields.must.and).forEach((field) => {
    must.push(fieldValuesToQuery(field, fields.must.and[field], 'and'));
  });
  Object.keys(fields.must.or).forEach((field) => {
    must.push(fieldValuesToQuery(field, fields.must.or[field], 'or'));
  });
  is.forEach((clause) => {
    must.push(isFlagToQuery(clause.flag, AST.Match.isMustClause(clause)));
  });

  const mustNot: QueryContainer[] = [];
  mustNot.push(...extraMustNotQueries);
  const termMustNotQuery = termValuesToQuery(terms.mustNot, options);
  if (termMustNotQuery) {
    mustNot.push(termMustNotQuery);
  }
  Object.keys(fields.mustNot.and).forEach((field) => {
    mustNot.push(fieldValuesToQuery(field, fields.mustNot.and[field], 'and'));
  });
  Object.keys(fields.mustNot.or).forEach((field) => {
    mustNot.push(fieldValuesToQuery(field, fields.mustNot.or[field], 'or'));
  });

  const bool: BoolQuery = {};
  if (must.length !== 0) {
    bool.must = must;
  }
  if (mustNot.length !== 0) {
    bool.must_not = mustNot;
  }

  return bool;
};

const EMPTY_TERMS: TermsQuery = { must: [], mustNot: [] };
const EMPTY_FIELDS: FieldsQuery = {
  must: { and: {}, or: {} },
  mustNot: { and: {}, or: {} },
};

export const astToEsQueryDsl = (ast: _AST, options = {}): QueryContainer => {
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
        }, [] as BoolQuery[]);

        must.push({
          bool: {
            should: clauses.map((clause) => ({ bool: clause })),
          },
        });
        return must;
      },
      hasTopMatches // only include the first match group if there are any conditions
        ? ([{ bool: matchesBool }] as QueryContainer[])
        : ([] as QueryContainer[])
    );

    return {
      bool: { must },
    };
  }
};
