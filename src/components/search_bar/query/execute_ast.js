import { get } from '../../../services/objects';
import { isString, isArray } from '../../../services/predicate';
import { eq, exact, gt, gte, lt, lte } from './operators';
import { AST } from './ast';

const EXPLAIN_FIELD = '__explain';

const nameToOperatorMap = {
  [AST.Operator.EQ]: eq,
  [AST.Operator.EXACT]: exact,
  [AST.Operator.GT]: gt,
  [AST.Operator.GTE]: gte,
  [AST.Operator.LT]: lt,
  [AST.Operator.LTE]: lte,
};

const defaultIsClauseMatcher = (item, clause, explain) => {
  const { type, flag, match } = clause;
  const value = get(item, clause.flag);
  const must = AST.Match.isMustClause(clause);
  const hit = !!value === must;
  if (explain && hit) {
    explain.push({ hit, type, flag, match });
  }
  return hit;
};

const fieldClauseMatcher = (item, field, clauses = [], explain) => {
  return clauses.every(clause => {
    const { type, value, match } = clause;
    let operator = nameToOperatorMap[clause.operator];
    if (!operator) {
      // unknown matcher
      return true;
    }
    if (!AST.Match.isMust(match)) {
      operator = (value, token) =>
        !nameToOperatorMap[clause.operator](value, token);
    }
    const itemValue = get(item, field);
    const hit = isArray(value)
      ? value.some(v => operator(itemValue, v))
      : operator(itemValue, value);
    if (explain && hit) {
      explain.push({ hit, type, field, value, match, operator });
    }
    return hit;
  });
};

const extractStringFieldsFromItem = item => {
  return Object.keys(item).reduce((fields, key) => {
    if (isString(item[key])) {
      fields.push(key);
    }
    return fields;
  }, []);
};

const termClauseMatcher = (item, fields, clauses = [], explain) => {
  const searchableFields = fields || extractStringFieldsFromItem(item);
  return clauses.every(clause => {
    const { type, value, match } = clause;
    const isMustClause = AST.Match.isMustClause(clause);
    const equals = nameToOperatorMap[AST.Operator.EQ];

    const containsMatches = searchableFields.some(field => {
      const itemValue = get(item, field);
      const isMatch = equals(itemValue, value);

      if (explain) {
        // If testing for the presence of a term, then we record a match as a match.
        // If testing for the absence of a term, then we invert this logic: we record a
        // non-match as a match.
        const hit = (isMustClause && isMatch) || (!isMustClause && !isMatch);
        if (hit) {
          explain.push({ hit, type, field, match, value });
        }
      }

      return isMatch;
    });

    if (isMustClause) {
      // If we're testing for the presence of a term, then we only need 1 field to match.
      return containsMatches;
    }

    // If we're testing for the absence of a term, we can't have any matching fields at all.
    return !containsMatches;
  });
};

export const createFilter = (
  ast,
  defaultFields,
  isClauseMatcher = defaultIsClauseMatcher,
  explain = false
) => {
  // Return items which pass ALL conditions: matches the terms entered, the specified field values,
  // and the specified "is" clauses.
  return item => {
    const explainLines = explain ? [] : undefined;

    if (explainLines) {
      item[EXPLAIN_FIELD] = explainLines;
    }

    const termClauses = ast.getTermClauses();
    const fields = ast.getFieldNames();
    const isClauses = ast.getIsClauses();
    const groupClauses = ast.getGroupClauses();

    const isTermMatch = termClauseMatcher(
      item,
      defaultFields,
      termClauses,
      explainLines
    );
    if (!isTermMatch) {
      return false;
    }

    const isFieldsMatch = fields.every(field =>
      fieldClauseMatcher(item, field, ast.getFieldClauses(field), explainLines)
    );
    if (!isFieldsMatch) {
      return false;
    }

    const isIsMatch = isClauses.every(clause =>
      isClauseMatcher(item, clause, explainLines)
    );
    if (!isIsMatch) {
      return false;
    }

    const isGroupMatch = groupClauses.every(clause => {
      const matchesGroup = clause.value.some(clause => {
        if (AST.Term.isInstance(clause)) {
          return termClauseMatcher(item, defaultFields, [clause], explainLines);
        }
        if (AST.Field.isInstance(clause)) {
          return fieldClauseMatcher(item, clause.field, [clause], explainLines);
        }
        if (AST.Is.isInstance(clause)) {
          return isClauseMatcher(item, clause, explainLines);
        }
        throw new Error(`Unknown query clause type in group, [${clause.type}]`);
      });
      return AST.Match.isMustClause(clause) ? matchesGroup : !matchesGroup;
    });

    return isGroupMatch;
  };
};

export const executeAst = (ast, items, options = {}) => {
  const { isClauseMatcher, defaultFields, explain } = options;
  const filter = createFilter(ast, defaultFields, isClauseMatcher, explain);
  return items.filter(filter);
};
