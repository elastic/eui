import { Ast } from './ast';
import { isArray } from '../predicate';
import peg from 'pegjs-inline-precompile'; // eslint-disable-line import/no-unresolved

const unescapeValue = (value) => {
  return value.replace(/\\([:\-\\])/, '$1');
};

const escapeValue = (value) => {
  return value.replace(/([:\-\\])/, '\\$1');
};

const parser = peg`
{
  const { Ast, unescapeValue } = options;
}

Query
  = clauses:Clauses { return clauses; }
  / space? { return []; }

Clauses
  = space? head:Clause tail:(
  	space clause:Clause { return clause }
  )* space? {
  	return [ head, ...tail]
  }

Clause
  = IsClause
  / FieldClause
  / TermClause

TermClause
  = space? "-" value:termValue { return Ast.Term.mustNot(value); }
  / space? value:termValue { return Ast.Term.must(value); }

IsClause
  = space? "-" value:IsValue { return Ast.Is.mustNot(value); }
  / space? value:IsValue { return Ast.Is.must(value); }

IsValue
  = "is:" value:value { return value; }

FieldClause
  = space? "-" fv:FieldAndValue { return Ast.Field.mustNot(fv.field, fv.value); }
  / space? fv:FieldAndValue { return Ast.Field.must(fv.field, fv.value); }

FieldAndValue
  = field:fieldName ":" value:fieldValue { return {field, value}; }

fieldName "field name"
  = fieldChar+ { return unescapeValue(text()); }

fieldChar
  = alnum
  / escapedChar

fieldValue "field value"
  = fieldValues
  / value

fieldValues
  = "(" space? head:value tail:(
  	space ([oO][rR]) space value:value { return value; }
  )* space? ")" { return [ head, ...tail ] }

termValue "term"
  = value

value
  = word
  / '"' space? phrase:phrase space?'"' { return phrase; }

phrase
  = word (space word)* { return unescapeValue(text()); }

word
  = valueChar+ { return unescapeValue(text()); }

valueChar
  = alnum
  / escapedChar

escapedChar
  = "\\\\" reservedChar

reservedChar
  = [:\\-\\\\]

alnum "alpha numeric"
  = [a-zA-Z0-9]

space "whitespace"
  = [ \\t\\n\\r]+
`;

const printValue = (value) => {
  if (value.match(/\s/)) {
    return `"${escapeValue(value)}"`;
  }
  return escapeValue(value);
};

export const defaultSyntax = Object.freeze({

  parse: (query) => {
    const clauses = parser.parse(query, { Ast, unescapeValue });
    return Ast.create(clauses);
  },

  print: (ast) => {
    return ast.clauses.reduce((text, clause) => {
      const prefix = Ast.Match.isMustClause(clause) ? '' : '-';
      switch (clause.type) {
        case Ast.Field.TYPE:
          if (isArray(clause.value)) {
            return `${text} ${prefix}${escapeValue(clause.field)}:(${clause.value.map(val => printValue(val)).join(' or ')})`;
          }
          return `${text} ${prefix}${escapeValue(clause.field)}:${printValue(clause.value)}`;
        case Ast.Is.TYPE:
          return `${text} ${prefix}is:${escapeValue(clause.flag)}`;
        case Ast.Term.TYPE:
          return `${text} ${prefix}${printValue(clause.value)}`;
        default:
          return text;
      }
    }, '').trim();
  }

});


