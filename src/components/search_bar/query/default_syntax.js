import { AST } from './ast';
import peg from 'pegjs';

const escapeValue = (value) => {
  return value.replace(/([:\-\\])/, '\\$1');
};

const grammar = `
{
  const unescape = (value) => {
    return value.replace(/\\\\([:\\-\\\\])/, '$1');
  };
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
  = space? "-" value:termValue { return { type: 'term', value: value, match: 'must_not' }; }
  / space? value:termValue { return { type: 'term', value: value, match: 'must' }; }
    
IsClause
  = space? "-" value:IsValue { return { type: 'is', flag: value, match: 'must_not' }; }
  / space? value:IsValue { return { type: 'is', flag: value, match: 'must' }; }
        
IsValue
  = "is:" value:value { return value; }
    
FieldClause
  = space? "-" fv:FieldAndValue { return { type: 'field', field: fv.field, value: fv.value, match: 'must_not'}; }
  / space? fv:FieldAndValue { return { type: 'field', field: fv.field, value: fv.value, match: 'must'}; }
    
FieldAndValue
  = field:fieldName ":" value:fieldValue { return {field, value}; }

fieldName "field name"
  = fieldChar+ { return unescape(text()); }
        
fieldChar
  = alnum
  / escapedChar

fieldValue "field value"
  = value

termValue "term"
  = value

value
  = valueChar+ { return unescape(text()); }

valueChar
  = alnum
  / escapedChar

escapedChar
  = "\\\\" reservedChar

reservedChar
  = [:\\-\\\\]

alnum "alpha numeric"
  = [a-zA-Z0-9]+

space "whitespace"
  = [ \\t\\n\\r]*
`;

const parser = peg.buildParser(grammar);

export const defaultSyntax = Object.freeze({

  parse: (query) => {
    const clauses = parser.parse(query);
    return AST.create(clauses);
  },

  print: (ast) => {
    return ast.clauses.reduce((text, clause) => {
      const prefix = AST.Match.isMustClause(clause) ? '' : '-';
      switch (clause.type) {
        case AST.Field.TYPE:
          return `${text} ${prefix}${escapeValue(clause.field)}:${escapeValue(clause.value)}`;
        case AST.Is.TYPE:
          return `${text} ${prefix}is:${escapeValue(clause.flag)}`;
        case AST.Term.TYPE:
          return `${text} ${prefix}${escapeValue(clause.value)}`;
        default:
          return text;
      }
    }, '').trim();
  }

});


