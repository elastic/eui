import { ast, Occur } from './ast';
import ohm from 'ohm-js';

// const grammarSource = require('!!raw-loader!./syntax_grammar.ohm');
const grammar = ohm.grammar(`
SearchQuery {

  Expr = Clause*

  Clause
    = IsClause
    | FieldClause
    | DefaultClause

  DefaultClause
    = "-" term -- mustNot
    | term -- must

  IsClause
    = "-" IsTerm -- off
    | IsTerm -- on

  IsTerm = caseInsensitive<"is:"> term

  FieldClause
    = "-" FieldTerm -- mustNot
    | FieldTerm -- must

  FieldTerm = field ":" term

  field = fieldChar+

  fieldChar = (alnum | escapedChar)

  term = termChar+

  termChar = (alnum | escapedChar)

  escapedChar = "\\\\"reservedChar

  reservedChar = ":"
}
`);
const semantics = grammar.createSemantics().addOperation('eval', {
  Expr: (clauses) => {
    return ast(clauses.map(clause => clause.eval()));
  },
  Clause: (clause) => clause.eval(),
  IsClause: (clause) => clause.eval(),
  DefaultClause: (clause) => clause.eval(),
  FieldClause: (clause) => clause.eval(),
  DefaultClause_must: (term) => {
    const value = term.eval();
    return { type: 'default', value, occur: Occur.MUST };
  },
  DefaultClause_mustNot: (minus, term) => {
    const value = term.eval();
    return { type: 'default', value, occur: Occur.MUST_NOT };
  },
  IsClause_on: (isTerm) => {
    const flag = isTerm.eval();
    return { type: 'is', flag, applied: true };
  },
  IsClause_on: (isTerm) => {
    const flag = isTerm.eval();
    return { type: 'is', flag, applied: false };
  },
  IsTerm: (prefix, term) => term.eval(),
  FieldClause_must: (fieldTerm) => {
    const { field, value } = fieldTerm.eval();
    return { type: 'field', field, value, occur: Occur.MUST };
  },
  FieldClause_mustNot: (minus, fieldTerm) => {
    const { field, value } = fieldTerm.eval();
    return { type: 'field', field, value, occur: Occur.MUST_NOT };
  },
  FieldTerm: (field, colon, value) => {
    return { field: field.eval(), value: value.eval() }
  },
  field: (chars) => {
    return chars.join('');
  },
  term: (chars) => {
    return chars.join('');
  }
});

export const ohmSyntax = Object.freeze({

  parse: (query) => {
    return semantics(query).eval();
  },

  print: (ast) => {
    return ast.clauses.reduce((text, clause) => {
      switch (clause.type) {
        case 'field':
          let prefix = clause.occur === Occur.MUST_NOT ? '-' : '';
          return `${text} ${prefix}${clause.field}:${clause.value}`;
        case 'is':
          prefix = clause.applied ? '' : '-';
          return `${text} ${prefix}is:${clause.flag}`;
        case 'default':
          prefix = clause.occur === Occur.MUST_NOT ? '-' : '';
          return `${text} ${prefix}${clause.value}`;
        default:
          return text;
      }
    }, '').trim();
  }

});


