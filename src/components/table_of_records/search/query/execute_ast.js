import { get } from 'lodash';
import { isString, isArray } from '../../../../services/predicate';
import { must } from './must';
import { mustNot } from './must_not';
import { Occur } from './ast';

const EXPLAIN_FIELD = '__explain';

const matchers = {
  [Occur.MUST]: must,
  [Occur.MUST_NOT]: mustNot
};

const defaultIsClauseMatcher = (record, flag, applied, explain) => {
  const value = get(record, flag);
  const match = !!value === applied;
  if (explain && match) {
    explain.push({ type: 'is', match, flag, applied });
  }
  return match;
};

const fieldClauseMatcher = (record, field, clauses = [], explain) => {
  return clauses.every(clause => {
    const matcher = matchers[clause.occur];
    if (!matcher) { // unknown matcher
      return true;
    }
    const recordValue = get(record, field);
    const match = isArray(clause.value) ?
      clause.value.some(value => matcher(recordValue, value)) :
      matcher(recordValue, clause.value);
    if (explain && match) {
      explain.push({ type: 'field', match, field, occur: clause.occur, value: clause.value });
    }
    return match;
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

const defaultClauseMatcher = (record, fields, clauses = [], explain) => {
  fields = fields || resolveStringFields(record);
  return clauses.every(clause => {
    const matcher = matchers[clause.occur];
    if (!matcher) { // unknown matcher
      return true;
    }
    if (clause.occur === Occur.MUST) {
      return fields.some(field => {
        const recordValue = get(record, field);
        const match = matcher(recordValue, clause.value);
        if (explain && match) {
          explain.push({ type: 'default', match, field, occur: clause.occur, value: clause.value });
        }
        return match;
      });
    } else {
      return fields.every(field => {
        const recordValue = get(record, field);
        const match = matcher(recordValue, clause.value);
        if (explain && match) {
          explain.push({ type: 'default', match, field, occur: clause.occur, value: clause.value });
        }
        return match;
      });
    }
  });
};

export const createFilter = (ast, defaultFields, isClauseMatcher = defaultIsClauseMatcher, explain = false) => {
  return (record) => {
    const explainLines = explain ? [] : undefined;
    const defaultClauses = ast.getDefaultClauses();
    const fields = ast.getFields();
    const isCluases = ast.getIsClauses();
    const match = defaultClauseMatcher(record, defaultFields, defaultClauses, explainLines) &&
      fields.every(field => fieldClauseMatcher(record, field, ast.getFieldClauses(field), explainLines)) &&
      isCluases.every(clause => isClauseMatcher(record, clause.flag, clause.applied, explainLines));
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
