/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { isArray, isNil } from '../../../services/predicate';
import { DateValue, dateValuesEqual, isDateValue } from './date_value';

export type MatchType = 'must' | 'must_not';

export type Value = string | number | boolean | DateValue;

export interface IsClause {
  type: 'is';
  match?: MatchType;
  flag: string;
}

export interface FieldClause {
  type: 'field';
  match?: MatchType;
  operator: OperatorType;
  field: string;
  value: Value | Value[];
}

export interface TermClause {
  type: 'term';
  match?: MatchType;
  value: Value;
}

export interface GroupClause {
  type: 'group';
  match: MatchType;
  value: Clause[];
}

export type Clause = IsClause | FieldClause | TermClause | GroupClause;

export const Match = Object.freeze({
  MUST: 'must' as const,
  MUST_NOT: 'must_not' as const,
  isMust(match: MatchType | undefined) {
    return match === Match.MUST;
  },
  isMustClause(clause: Clause) {
    return Match.isMust(clause.match);
  },
});

export type OperatorType = 'eq' | 'exact' | 'gt' | 'gte' | 'lt' | 'lte';

export const Operator = Object.freeze({
  EQ: 'eq' as const,
  EXACT: 'exact' as const,
  GT: 'gt' as const,
  GTE: 'gte' as const,
  LT: 'lt' as const,
  LTE: 'lte' as const,
  isEQ(match: OperatorType | undefined) {
    return match === Operator.EQ;
  },
  isEQClause(clause: Clause) {
    return Field.isInstance(clause) && Operator.isEQ(clause.operator);
  },
  isEXACT(match: OperatorType | undefined) {
    return match === Operator.EXACT;
  },
  isEXACTClause(clause: Clause) {
    return Field.isInstance(clause) && Operator.isEXACT(clause.operator);
  },
  isRange(match: OperatorType | undefined) {
    return (
      Operator.isGT(match) ||
      Operator.isGTE(match) ||
      Operator.isLT(match) ||
      Operator.isLTE(match)
    );
  },
  isRangeClause(clause: Clause) {
    return Field.isInstance(clause) && Operator.isRange(clause.operator);
  },
  isGT(match: OperatorType | undefined) {
    return match === Operator.GT;
  },
  isGTClause(clause: Clause) {
    return Field.isInstance(clause) && Operator.isGT(clause.operator);
  },
  isGTE(match: OperatorType | undefined) {
    return match === Operator.GTE;
  },
  isGTEClause(clause: Clause) {
    return Field.isInstance(clause) && Operator.isGTE(clause.operator);
  },
  isLT(match: OperatorType | undefined) {
    return match === Operator.LT;
  },
  isLTClause(clause: Clause) {
    return Field.isInstance(clause) && Operator.isLT(clause.operator);
  },
  isLTE(match: OperatorType | undefined) {
    return match === Operator.LTE;
  },
  isLTEClause(clause: Clause) {
    return Field.isInstance(clause) && Operator.isLTE(clause.operator);
  },
});

const Term = Object.freeze({
  TYPE: 'term' as const,
  isInstance: (clause: Clause): clause is TermClause => {
    return clause.type === Term.TYPE;
  },
  must: (value: Value) => {
    return { type: Term.TYPE, value, match: Match.MUST };
  },
  mustNot: (value: Value) => {
    return { type: Term.TYPE, value, match: Match.MUST_NOT };
  },
});

const Group = Object.freeze({
  TYPE: 'group' as const,
  isInstance: (clause: Clause): clause is GroupClause => {
    return clause.type === Group.TYPE;
  },
  must: (value: Clause[]) => {
    return { type: Group.TYPE, value, match: Match.MUST };
  },
  mustNot: (value: Clause[]) => {
    return { type: Group.TYPE, value, match: Match.MUST_NOT };
  },
});

const Field = Object.freeze({
  TYPE: 'field' as const,
  isInstance: (clause: Clause): clause is FieldClause => {
    return clause.type === Field.TYPE;
  },
  must: {
    eq: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.EQ,
    }),
    exact: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.EXACT,
    }),
    gt: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.GT,
    }),
    gte: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.GTE,
    }),
    lt: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.LT,
    }),
    lte: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST,
      operator: Operator.LTE,
    }),
  },
  mustNot: {
    eq: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.EQ,
    }),
    exact: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.EXACT,
    }),
    gt: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.GT,
    }),
    gte: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.GTE,
    }),
    lt: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.LT,
    }),
    lte: (field: string, value: Value | Value[]) => ({
      type: Field.TYPE,
      field,
      value,
      match: Match.MUST_NOT,
      operator: Operator.LTE,
    }),
  },
});

const Is = Object.freeze({
  TYPE: 'is' as const,
  isInstance: (clause: Clause): clause is IsClause => {
    return clause.type === Is.TYPE;
  },
  must: (flag: string) => {
    return { type: Is.TYPE, flag, match: Match.MUST };
  },
  mustNot: (flag: string) => {
    return { type: Is.TYPE, flag, match: Match.MUST_NOT };
  },
});

const valuesEqual = (v1: any, v2: any) => {
  if (isDateValue(v1)) {
    return dateValuesEqual(v1, v2);
  }
  return v1 === v2;
};

const arrayIncludesValue = (array: any[], value: any) => {
  return array.some((item) => valuesEqual(item, value));
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
  private readonly _clauses: Clause[];
  private readonly _indexedClauses: {
    field: {
      [field: string]: FieldClause[];
    };
    is: {
      [flag: string]: IsClause;
    };
    term: TermClause[];
    group: GroupClause[];
  };

  static create(clauses: Clause[]) {
    return new _AST(clauses);
  }

  constructor(clauses: Clause[] = []) {
    this._clauses = clauses;
    this._indexedClauses = { field: {}, is: {}, term: [], group: [] };

    clauses.forEach((clause) => {
      switch (clause.type) {
        case Field.TYPE:
          if (!this._indexedClauses.field[clause.field]) {
            this._indexedClauses.field[clause.field] = [];
          }
          this._indexedClauses.field[clause.field].push(clause);
          break;

        case Is.TYPE:
          this._indexedClauses.is[clause.flag] = clause;
          break;

        case Term.TYPE:
          this._indexedClauses.term.push(clause);
          break;

        case Group.TYPE:
          this._indexedClauses.group.push(clause);
          break;

        default:
          // @ts-ignore TS knows we have exhausted the match
          throw new Error(`Unknown query clause type [${clause.type}]`);
      }
    });
  }

  get clauses() {
    return this._clauses;
  }

  getTermClauses() {
    return this._indexedClauses.term;
  }

  getTermClause(value: Value) {
    const clauses = this.getTermClauses();
    return clauses.find((clause) => valuesEqual(clause.value, value));
  }

  getFieldNames() {
    return Object.keys(this._indexedClauses.field);
  }

  getFieldClauses(field?: string): FieldClause[] {
    return field
      ? this._indexedClauses.field[field]
      : this._clauses.filter(Field.isInstance);
  }

  getFieldClause(
    field: string,
    predicate: (c: FieldClause) => boolean
  ): FieldClause | undefined {
    const clauses = this.getFieldClauses(field);
    if (clauses) {
      return clauses.find(predicate);
    }
  }

  hasOrFieldClause(field: string, value?: Value) {
    const clause = this.getFieldClause(field, (clause) =>
      isArray(clause.value)
    );
    if (!clause) {
      return false;
    }

    // We can apply this type cast due to the `isArray` filter above
    return isNil(value) || arrayIncludesValue(clause.value as Value[], value);
  }

  getOrFieldClause(field: string, value?: Value) {
    return this.getFieldClause(
      field,
      (clause) =>
        isArray(clause.value) &&
        (isNil(value) || arrayIncludesValue(clause.value, value))
    );
  }

  addOrFieldValue(
    field: string,
    value: Value,
    must = true,
    operator: OperatorType = Operator.EQ
  ) {
    const existingClause = this.getOrFieldClause(field);
    if (!existingClause) {
      const newClause = must
        ? Field.must[operator](field, [value])
        : Field.mustNot[operator](field, [value]);
      return new _AST([...this._clauses, newClause]);
    }

    const clauses = this._clauses.map((clause) => {
      if (clause === existingClause) {
        (clause.value as Value[]).push(value);
      }
      return clause;
    });
    return new _AST(clauses);
  }

  removeOrFieldValue(field: string, value: Value) {
    const existingClause = this.getOrFieldClause(field, value);
    if (!existingClause) {
      return new _AST([...this._clauses]);
    }
    const clauses = this._clauses.reduce((clauses, clause) => {
      if (clause !== existingClause) {
        clauses.push(clause);
        return clauses;
      }
      const filteredValue = (clause.value as Value[]).filter(
        (val) => !valuesEqual(val, value)
      );
      if (filteredValue.length === 0) {
        return clauses;
      }
      clauses.push({
        ...clause,
        value: filteredValue,
      });
      return clauses;
    }, [] as Clause[]);
    return new _AST(clauses);
  }

  removeOrFieldClauses(field: string) {
    const clauses = this._clauses.filter((clause) => {
      return (
        !Field.isInstance(clause) ||
        clause.field !== field ||
        !isArray(clause.value)
      );
    });
    return new _AST(clauses);
  }

  hasSimpleFieldClause(field: string, value?: Value) {
    const clause = this.getFieldClause(
      field,
      (clause) => !isArray(clause.value)
    );
    if (!clause) {
      return false;
    }
    return isNil(value) || valuesEqual(clause.value, value);
  }

  getSimpleFieldClause(field: string, value?: Value) {
    return this.getFieldClause(
      field,
      (clause) =>
        !isArray(clause.value) &&
        (isNil(value) || valuesEqual(clause.value, value))
    );
  }

  addSimpleFieldValue(
    field: string,
    value: Value,
    must = true,
    operator: OperatorType = Operator.EQ
  ) {
    const clause = must
      ? Field.must[operator](field, value)
      : Field.mustNot[operator](field, value);
    return this.addClause(clause);
  }

  removeSimpleFieldValue(field: string, value: Value) {
    const existingClause = this.getSimpleFieldClause(field, value);
    if (!existingClause) {
      return new _AST([...this._clauses]);
    }
    const clauses = this._clauses.filter((clause) => clause !== existingClause);
    return new _AST(clauses);
  }

  removeSimpleFieldClauses(field: string) {
    const clauses = this._clauses.filter((clause) => {
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

  getIsClause(flag: string) {
    return this._indexedClauses.is[flag];
  }

  removeIsClause(flag: string) {
    return new _AST(
      this._clauses.filter(
        (clause) => !Is.isInstance(clause) || clause.flag !== flag
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
  addClause(newClause: Clause) {
    let added = false;
    const newClauses = this._clauses.reduce((clauses, clause) => {
      if (newClause.type !== clause.type) {
        clauses.push(clause);
        return clauses;
      }

      switch (newClause.type) {
        case Term.TYPE:
          if (newClause.value !== (clause as TermClause).value) {
            clauses.push(clause);
            return clauses;
          }
          break;

        case Field.TYPE:
          if (
            newClause.field !== (clause as FieldClause).field ||
            newClause.value !== (clause as FieldClause).value
          ) {
            clauses.push(clause);
            return clauses;
          }
          break;

        case Is.TYPE:
          if (newClause.flag !== (clause as IsClause).flag) {
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
    }, [] as Clause[]);

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
  create: (clauses: Clause[]) => new _AST(clauses),
});
