import { isArray, isNil } from '../../../services/predicate';
import { isDateValue, dateValuesEqual } from './date_value';

export const Match = Object.freeze({
  MUST: 'must',
  MUST_NOT: 'must_not',
  isMust(match) {
    return match === Match.MUST;
  },
  isMustClause(clause) {
    return Match.isMust(clause.match);
  },
});

export const Operator = Object.freeze({
  EQ: 'eq',
  EXACT: 'exact',
  GT: 'gt',
  GTE: 'gte',
  LT: 'lt',
  LTE: 'lte',
  isEQ(match) {
    return match === Operator.EQ;
  },
  isEQClause(clause) {
    return Operator.isEQ(clause.operator);
  },
  isEXACT(match) {
    return match === Operator.EXACT;
  },
  isEXACTClause(clause) {
    return Operator.isEXACT(clause.operator);
  },
  isRange(match) {
    return (
      Operator.isGT(match) ||
      Operator.isGTE(match) ||
      Operator.isLT(match) ||
      Operator.isLTE(match)
    );
  },
  isRangeClause(clause) {
    return Operator.isRange(clause.operator);
  },
  isGT(match) {
    return match === Operator.GT;
  },
  isGTClause(clause) {
    return Operator.isGT(clause.operator);
  },
  isGTE(match) {
    return match === Operator.GTE;
  },
  isGTEClause(clause) {
    return Operator.isGTE(clause.operator);
  },
  isLT(match) {
    return match === Operator.LT;
  },
  isLTClause(clause) {
    return Operator.isLT(clause.operator);
  },
  isLTE(match) {
    return match === Operator.LTE;
  },
  isLTEClause(clause) {
    return Operator.isLTE(clause.operator);
  },
});

const Term = Object.freeze({
  TYPE: 'term',
  isInstance: clause => {
    return clause.type === Term.TYPE;
  },
  must: value => {
    return { type: Term.TYPE, value, match: Match.MUST };
  },
  mustNot: value => {
    return { type: Term.TYPE, value, match: Match.MUST_NOT };
  },
});

const Group = Object.freeze({
  TYPE: 'group',
  isInstance: clause => {
    return clause.type === Group.TYPE;
  },
  must: value => {
    return { type: Group.TYPE, value, match: Match.MUST };
  },
});

const Field = Object.freeze({
  TYPE: 'field',
  isInstance: clause => {
    return clause.type === Field.TYPE;
  },
  must: {
    eq: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.EQ,
    }),
    exact: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.EXACT,
    }),
    gt: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.GT,
    }),
    gte: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.GTE,
    }),
    lt: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.LT,
    }),
    lte: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.LTE,
    }),
  },
  mustNot: {
    eq: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.EQ,
    }),
    exact: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.EXACT,
    }),
    gt: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.GT,
    }),
    gte: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.GTE,
    }),
    lt: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.LT,
    }),
    lte: (field, value) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.LTE,
    }),
  },
});

const Is = Object.freeze({
  TYPE: 'is',
  isInstance: clause => {
    return clause.type === Is.TYPE;
  },
  must: flag => {
    return { type: Is.TYPE, flag, match: Match.MUST };
  },
  mustNot: flag => {
    return { type: Is.TYPE, flag, match: Match.MUST_NOT };
  },
});

const valuesEqual = (v1, v2) => {
  if (isDateValue(v1)) {
    return dateValuesEqual(v1, v2);
  }
  return v1 === v2;
};

const arrayIncludesValue = (array, value) => {
  return array.some(item => valuesEqual(item, value));
};

/**
 * The AST structure is an array of clauses. There are 3 types of clauses that are supported:
 *
 * :term:
 * Holds a VALUE and an OCCUR. The OCCUR indicates whether the value must match or must not match. Default
 * clauses are not associated with any specific field - when executing the search, one can specify what are
 * the default fields that the default clauses will be matched against.
 *
 * :field:
 * Like the `term` clause, holds a VALUE and an MATCH, but this clause also specifies the field that the
 * value will be matched against.
 *
 * :is:
 * Holds a FLAG and indicates whether this flag must be applied or must not be applied. Typically this clause
 * matches against boolean values of a record (e.g. "is:online", "is:internal", "is:on", etc..)
 *
 * This AST is immutable - every "mutating" operation returns a newly mutated AST.
 */
export class _AST {
  static create(clauses) {
    return new _AST(clauses);
  }

  constructor(clauses = []) {
    this._clauses = clauses;
    this._indexedClauses = clauses.reduce(
      (map, clause) => {
        switch (clause.type) {
          case Field.TYPE:
            if (!map.field[clause.field]) {
              map.field[clause.field] = [];
            }
            map.field[clause.field].push(clause);
            return map;
          case Is.TYPE:
            map.is[clause.flag] = clause;
            return map;
          case Term.TYPE:
            map.term.push(clause);
            return map;
          case Group.TYPE:
            map.group.push(clause);
            return map;
          default:
            throw new Error(`Unknown query clause type [${clause.type}]`);
        }
      },
      { field: {}, is: {}, term: [], group: [] }
    );
  }

  get clauses() {
    return this._clauses;
  }

  getTermClauses() {
    return this._indexedClauses.term;
  }

  getTermClause(value) {
    const clauses = this.getTermClauses();
    return clauses.find(clause => valuesEqual(clause.value, value));
  }

  getFieldNames() {
    return Object.keys(this._indexedClauses.field);
  }

  getFieldClauses(field = undefined) {
    return field
      ? this._indexedClauses.field[field]
      : this._clauses.filter(Field.isInstance);
  }

  getFieldClause(field, predicate) {
    const clauses = this.getFieldClauses(field);
    if (clauses) {
      return clauses.find(predicate);
    }
  }

  hasOrFieldClause(field, value = undefined) {
    const clauses = this.getFieldClause(field, clause => isArray(clause.value));
    if (!clauses) {
      return false;
    }
    return (
      isNil(value) ||
      clauses.some(clause => arrayIncludesValue(clause.value, value))
    );
  }

  getOrFieldClause(field, value = undefined) {
    return this.getFieldClause(
      field,
      clause =>
        isArray(clause.value) &&
        (isNil(value) || arrayIncludesValue(clause.value, value))
    );
  }

  addOrFieldValue(field, value, must = true, operator = Operator.EQ) {
    const existingClause = this.getOrFieldClause(field);
    if (!existingClause) {
      const newClause = must
        ? Field.must[operator](field, [value])
        : Field.mustNot[operator](field, [value]);
      return new _AST([...this._clauses, newClause]);
    }
    const clauses = this._clauses.map(clause => {
      if (clause === existingClause) {
        clause.value.push(value);
      }
      return clause;
    });
    return new _AST(clauses);
  }

  removeOrFieldValue(field, value) {
    const existingClause = this.getOrFieldClause(field, value);
    if (!existingClause) {
      return new _AST([...this._clauses]);
    }
    const clauses = this._clauses.reduce((clauses, clause) => {
      if (clause !== existingClause) {
        clauses.push(clause);
        return clauses;
      }
      const filteredValue = clause.value.filter(
        val => !valuesEqual(val, value)
      );
      if (filteredValue.length === 0) {
        return clauses;
      }
      clauses.push({ ...clause, value: filteredValue });
      return clauses;
    }, []);
    return new _AST(clauses);
  }

  removeOrFieldClauses(field) {
    const clauses = this._clauses.filter(clause => {
      return (
        !Field.isInstance(clause) ||
        clause.field !== field ||
        !isArray(clause.value)
      );
    });
    return new _AST(clauses);
  }

  hasSimpleFieldClause(field, value = undefined) {
    const clauses = this.getFieldClause(
      field,
      clause => !isArray(clause.value)
    );
    if (!clauses) {
      return false;
    }
    return (
      isNil(value) || clauses.some(clause => valuesEqual(clause.value, value))
    );
  }

  getSimpleFieldClause(field, value = undefined) {
    return this.getFieldClause(
      field,
      clause =>
        !isArray(clause.value) &&
        (isNil(value) || valuesEqual(clause.value, value))
    );
  }

  addSimpleFieldValue(field, value, must = true, operator = Operator.EQ) {
    const clause = must
      ? Field.must[operator](field, value)
      : Field.mustNot[operator](field, value);
    return this.addClause(clause);
  }

  removeSimpleFieldValue(field, value) {
    const existingClause = this.getSimpleFieldClause(field, value);
    if (!existingClause) {
      return new _AST([...this._clauses]);
    }
    const clauses = this._clauses.filter(clause => clause !== existingClause);
    return new _AST(clauses);
  }

  removeSimpleFieldClauses(field) {
    const clauses = this._clauses.filter(clause => {
      return (
        !Field.isInstance(clause) ||
        clause.field !== field ||
        isArray(clause.value)
      );
    });
    return new _AST(clauses);
  }

  getIsClauses() {
    return Object.values(this._indexedClauses.is);
  }

  getIsClause(flag) {
    return this._indexedClauses.is[flag];
  }

  removeIsClause(flag) {
    return new _AST(
      this._clauses.filter(
        clause => !Is.isInstance(clause) || clause.flag !== flag
      )
    );
  }

  getGroupClauses() {
    return Object.values(this._indexedClauses.group);
  }

  /**
   * Creates and returns a new AST with the given clause added to the current clauses. If
   * the current clauses already include a similar clause, it will be (in-place) replaced by
   * the given clause. Whether a clause is similar to the given one depends on the type of the clause.
   * Two clauses are similar if:
   *
   * - they are both of the same type
   * - if they are `default` clauses, they must have the same value
   * - if they are `term` clauses, they must have the same fields and values
   * - if they are `is` clauses, they must have the same flags
   *
   * The reasoning behind not including the `match` attributes of the clauses in the rules above, stems
   * in the fact that the AST clauses are ANDed, and having two similar clauses with two different
   * match attributes creates a logically contradicted AST (e.g. what does it mean to
   * "(must have x) AND (must not have x)"?)
   *
   * note:  in-place replacement means the given clause will be placed in the same position as the one it
   *        replaced
   */
  addClause(newClause) {
    let added = false;
    const newClauses = this._clauses.reduce((clauses, clause) => {
      if (newClause.type !== clause.type) {
        clauses.push(clause);
        return clauses;
      }
      switch (newClause.type) {
        case Term.TYPE:
          if (newClause.value !== clause.value) {
            clauses.push(clause);
            return clauses;
          }
          break;
        case Field.TYPE:
          if (
            newClause.field !== clause.field ||
            newClause.value !== clause.value
          ) {
            clauses.push(clause);
            return clauses;
          }
          break;
        case Is.TYPE:
          if (newClause.flag !== clause.flag) {
            clauses.push(clause);
            return clauses;
          }
          break;
        default:
          throw new Error(`unknown clause type [${newClause.type}]`);
      }
      added = true;
      clauses.push(newClause);
      return clauses;
    }, []);
    if (!added) {
      newClauses.push(newClause);
    }
    return new _AST(newClauses);
  }
}

export const AST = Object.freeze({
  Match,
  Operator,
  Term,
  Group,
  Field,
  Is,
  create: clauses => new _AST(clauses),
});
