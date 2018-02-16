import { get } from 'lodash';
import { isString, isArray } from '../../../services/predicate';
import { eq, gt, gte, lt, lte } from './operators';
import { AST } from './ast';

const EXPLAIN_FIELD = '__explain';

const operators = {
  [AST.Operator.EQ]: eq,
  [AST.Operator.GT]: gt,
  [AST.Operator.GTE]: gte,
  [AST.Operator.LT]: lt,
  [AST.Operator.LTE]: lte
};

const defaultIsClauseMatcher = (record, clause, explain) => {
  const { type, flag, match } = clause;
  const value = get(record, clause.flag);
  const must = AST.Match.isMustClause(clause);
  const hit = !!value === must;
  if (explain && hit) {
    explain.push({ hit, type, flag, match });
  }
  return hit;
};

const fieldClauseMatcher = (record, field, clauses = [], explain) => {
  return clauses.every(clause => {
    const { type, value, match } = clause;
    let operator = operators[clause.operator];
    if (!operator) { // unknown matcher
      return true;
    }
    if (!AST.Match.isMust(match)) {
      operator = (value, token) => !operators[clause.operator](value, token);
    }
    const recordValue = get(record, field);
    const hit = isArray(value) ?
      value.some(v => operator(recordValue, v)) :
      operator(recordValue, value);
    if (explain && hit) {
      explain.push({ hit, type, field, value, match, operator });
    }
    return hit;
  });
};

const resolveStringFields = (record) => {
  return Object.keys(record).reduce((fields, key) => {
    if (isString(record[key])) {
      fields.push(key);
    }
    return fields;
  }, []);
};

const termClauseMatcher = (record, fields, clauses = [], explain) => {
  fields = fields || resolveStringFields(record);
  return clauses.every(clause => {
    const { type, value, match } = clause;
    const operator = operators[AST.Operator.EQ];
    if (AST.Match.isMustClause(clause)) {
      return fields.some(field => {
        const recordValue = get(record, field);
        const hit = operator(recordValue, value);
        if (explain && hit) {
          explain.push({ hit, type, field, match, value });
        }
        return hit;
      });
    } else {
      const notMatcher = (value, token) => !operator(value, token);
      return fields.every(field => {
        const recordValue = get(record, field);
        const hit = notMatcher(recordValue, value);
        if (explain && hit) {
          explain.push({ hit, type, field, value, match });
        }
        return hit;
      });
    }
  });
};

export const createFilter = (ast, defaultFields, isClauseMatcher = defaultIsClauseMatcher, explain = false) => {
  return (record) => {
    const explainLines = explain ? [] : undefined;
    const termClauses = ast.getTermClauses();
    const fields = ast.getFieldNames();
    const isClauses = ast.getIsClauses();
    const match = termClauseMatcher(record, defaultFields, termClauses, explainLines) &&
      fields.every(field => fieldClauseMatcher(record, field, ast.getFieldClauses(field), explainLines)) &&
      isClauses.every(clause => isClauseMatcher(record, clause, explainLines));
    if (explainLines) {
      record[EXPLAIN_FIELD] = explainLines;
    }
    return match;
  };
};


export const executeAst = (ast, items, options = {}) => {
  const { isClauseMatcher, defaultFields, explain } = options;
  const filter = createFilter(ast, defaultFields, isClauseMatcher, explain);
  return items.filter(filter);
};
