export const Occur = Object.freeze({
  MUST: 'must',
  MUST_NOT: 'must_not'
});

/**
 * The AST structure is an array of clauses. There are 3 types of clauses that are supported:
 *
 * :default:
 * Holds a VALUE and an OCCUR. The OCCUR indicates whether the value must match or must not match. Default
 * clauses are not associated with any specific field - when executing the search, one can specify what are
 * the default fields that the default clauses will be matched against.
 *
 * :field:
 * Like the default clause, holds a VALUE and an OCCUR, but this clause also specifies the field that the
 * value will be matched against.
 *
 * :is:
 * Holds a FLAG and indicates whether this flag must be applied or must not be applied. Typically this clause
 * matches against boolean values of a record (e.g. "is:online", "is:internal", "is:on", etc..)
 *
 * This AST is immutable - every "mutating" operation returns a newly mutated AST.
 */
export const ast = (clauses = []) => {

  const mappedClauses = clauses.reduce((map, clause) => {
    switch (clause.type) {
      case 'field':
        if (!map.field[clause.field]) {
          map.field[clause.field] = [];
        }
        map.field[clause.field].push(clause);
        return map;
      case 'is':
        map.is[clause.flag] = clause;
        return map;
      case 'default':
        map.default.push(clause);
        return map;
      default:
        throw new Error(`Unknown query clause type [${clause.type}]`);
    }
  }, { field: {}, is: {}, default: [] });

  return {

    get clauses() {
      return clauses;
    },

    getDefaultClauses() {
      return mappedClauses.default;
    },

    getDefaultClause(value) {
      const clauses = this.getDefaultClauses();
      return clauses.find(clause => clause.value === value);
    },

    addDefaultClause(value, occur) {
      return ast([ ...clauses, { type: 'default', occur, value } ]);
    },

    getFields() {
      return Object.keys(mappedClauses.field);
    },

    getFieldClauses(field = undefined) {
      return field ? mappedClauses.field[field] : clauses.filter(clause => clause.type === 'field');
    },

    getFieldClause(field, value) {
      const clauses = this.getFieldClauses(field);
      if (clauses) {
        return clauses.find(clause => clause.value === value);
      }
    },

    addFieldClause(field, value, occur) {
      return ast([ ...clauses, { type: 'field', field, occur, value }]);
    },

    setFieldClause(field, value, occur) {
      const existingClause = this.getFieldClause(field, value);
      if (!existingClause) {
        return this.addFieldClause(field, value, occur);
      }
      return ast(clauses.map(clause => {
        if (clause.type !== 'field' || clause.field !== field || clause.value !== value) {
          return clause;
        }
        return { type: 'field', field, value, occur };
      }));
    },

    removeFieldClause(field, value) {
      return ast(clauses.filter(clause => clause.type !== 'field' || clause.field !== field || clause.value !== value));
    },

    /**
     * sets the clauses for the given field. We set it in a way that we try to keep the current structure
     * of the ast as much as possible. If there is already an existing clause that for the given field that has
     * one of the provided clause values, we'll replace it "in-place". We'll also drop any existing field clauses
     * that are not part of the newly given ones.... and all the other new given clauses will be appended at the
     * end.
     *
     * Example:
     *
     * existing clauses:  name:john name:doe foo:bar name:joe
     * given clauses:     -name:doe name:baz name:john
     * result:            name:john -name:doe foo:bar name:baz
     */
    setFieldClauses(field, fieldClauses) {
      fieldClauses = fieldClauses.map(clause => ({ type: 'field', field, value: clause.value, occur: clause.occur }));
      const newClauses = clauses.reduce((newClauses, clause) => {
        if (clause.type !== 'field' || clause.field !== field) {
          newClauses.push(clause);
          return newClauses;
        }
        const index = fieldClauses.findIndex(fieldClause => fieldClause.value === clause.value);
        if (index > -1) {
          // we found an already existing clause for the same value, we'll just override it with the new one
          const fieldClause = fieldClauses.splice(index, 1)[0];
          newClauses.push(fieldClause);
          return newClauses;
        }
        // we couldn't find a clause with the same value, so we'll drop this clause
        return newClauses;
      }, []);
      // we replaced what we could and we dropped what was no longer needed. now we add the remaining clauses
      newClauses.push(...fieldClauses);
      return ast(newClauses);
    },

    clearFieldClauses(field = undefined) {
      const newClauses = field ?
        clauses.filter(clause => clause.type !== 'field' || clause.field !== field) :
        clauses.filter(clause => clause.type !== 'field');
      return ast(newClauses);
    },

    getIsClauses() {
      return Object.values(mappedClauses.is);
    },

    getIsClause(flag) {
      return mappedClauses.is[flag];
    },

    /**
     * we set the given flag as an is clause. We try to keep the current structure of the ast
     * as must as possible - if there's already an existing is clause for the given flag we'll
     * just replace it in-place.
     */
    setIsClause(flag, applied = true) {
      const clause = { type: 'is', flag, applied };
      const newClauses = [ ...clauses ];
      const index = clauses.findIndex(clause => clause.type === 'is' && clause.flag === flag);
      if (index > -1) {
        newClauses.splice(index, 1, clause);
      } else {
        newClauses.push(clause);
      }
      return ast(newClauses);
    },

    clearIsClause(flag) {
      return ast(clauses.filter(clause => clause.type !== 'is' && clause.flag !== flag));
    }
  };
};
