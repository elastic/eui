import { ast, Occur } from './ast';
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
  / DefaultClause
        
DefaultClause
  = space? "-" value:defaultValue { return { type: 'default', value: value, occur: 'must_not' }; }
  / space? value:defaultValue { return { type: 'default', value: value, occur: 'must' }; }
    
IsClause
  = space? "-" value:IsTerm { return { type: 'is', flag: value, applied: false }; }
  / space? value:IsTerm { return { type: 'is', flag: value, applied: true }; }
        
IsTerm
  = "is:" value:term { return value; }
    
FieldClause
  = space? "-" ft:FieldTerm { return { type: 'field', field: ft.field, value: ft.value, occur: 'must_not'}; }
  / space? ft:FieldTerm { return { type: 'field', field: ft.field, value: ft.value, occur: 'must'}; }
    
FieldTerm
  = field:field ":" value:fieldValue { return {field, value}; }

field "field name"
  = fieldChar+ { return unescape(text()); }
        
fieldChar
  = alnum
  / escapedChar

fieldValue "field value"
  = term

defaultValue "default term"
  = term

term
  = termChar+ { return unescape(text()); }

termChar
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
    return ast(clauses);
  },

  print: (ast) => {
    return ast.clauses.reduce((text, clause) => {
      switch (clause.type) {
        case 'field':
          let prefix = clause.occur === Occur.MUST_NOT ? '-' : '';
          return `${text} ${prefix}${escapeValue(clause.field)}:${escapeValue(clause.value)}`;
        case 'is':
          prefix = clause.applied ? '' : '-';
          return `${text} ${prefix}is:${escapeValue(clause.flag)}`;
        case 'default':
          prefix = clause.occur === Occur.MUST_NOT ? '-' : '';
          return `${text} ${prefix}${escapeValue(clause.value)}`;
        default:
          return text;
      }
    }, '').trim();
  }

});


