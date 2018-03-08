import { get } from 'lodash';
import { isString, isArray } from '../../../services/predicate';
import { must } from './must';
import { mustNot } from './must_not';
import { AST } from './ast';

const EXPLAIN_FIELD = '__explain';

const matchers = {
  [AST.Match.MUST]: must,
  [AST.Match.MUST_NOT]: mustNot
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
    const matcher = matchers[match];
    if (!matcher) { // unknown matcher
      return true;
    }
    const recordValue = get(record, field);
    const hit = isArray(value) ?
      value.some(v => matcher(recordValue, v)) :
      matcher(recordValue, value);
    if (explain && hit) {
      explain.push({ hit, type, field, value, match });
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
    const matcher = matchers[match];
    if (!matcher) { // unknown matcher
      return true;
    }
    if (AST.Match.isMustClause(clause)) {
      return fields.some(field => {
        const recordValue = get(record, field);
        const hit = matcher(recordValue, value);
        if (explain && hit) {
          explain.push({ hit, type, field, match, value });
        }
        return hit;
      });
    } else {
      return fields.every(field => {
        const recordValue = get(record, field);
        const hit = matcher(recordValue, value);
        if (explain && hit) {
          explain.push({ hit, type, field, match, value });
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
