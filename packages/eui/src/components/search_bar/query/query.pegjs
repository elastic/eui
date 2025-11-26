{
  const { AST, Exp, unescapeValue, unescapePhraseValue, resolveFieldValue, recognizedFields } = options;
  const hasRecognizedFields = recognizedFields && recognizedFields.length > 0;
  const ctx = Object.assign({ error }, options );
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
  = GroupClause
  / IsClause
  / FieldClause
  / TermClause

SubGroupClause
  = "(" head:Clause tail:(
    space? orWord space? clause:Clause { return clause }
  )* ")" {
    return [head, ...tail];
  }

GroupClause
  = space? "-" group:SubGroupClause { return AST.Group.mustNot(group) }
  / space? group:SubGroupClause { return AST.Group.must(group) }

TermClause
  = space? "-" value:termValue { return AST.Term.mustNot(value); }
  / space? value:termValue { return AST.Term.must(value); }

IsClause
  = space? "-" flag:IsFlag { return AST.Is.mustNot(flag); }
  / space? flag:IsFlag { return AST.Is.must(flag); }

IsFlag
  = "is:" flag:flagName {
    validateFlag(flag, location(), ctx);
    return flag;
  }

FieldClause "field"
  = space? "-" fv:FieldEQValue { return AST.Field.mustNot.eq(fv.field, fv.value); }
  / space? "-" fv:FieldEXACTValue { return AST.Field.mustNot.exact(fv.field, fv.value); }
  / space? "-" fv:FieldGTValue { return AST.Field.mustNot.gt(fv.field, fv.value); }
  / space? "-" fv:FieldGTEValue { return AST.Field.mustNot.gte(fv.field, fv.value); }
  / space? "-" fv:FieldLTValue { return AST.Field.mustNot.lt(fv.field, fv.value); }
  / space? "-" fv:FieldLTEValue { return AST.Field.mustNot.lte(fv.field, fv.value); }
  / space? fv:FieldEQValue { return AST.Field.must.eq(fv.field, fv.value); }
  / space? fv:FieldEXACTValue { return AST.Field.must.exact(fv.field, fv.value); }
  / space? fv:FieldGTValue { return AST.Field.must.gt(fv.field, fv.value); }
  / space? fv:FieldGTEValue { return AST.Field.must.gte(fv.field, fv.value); }
  / space? fv:FieldLTValue { return AST.Field.must.lt(fv.field, fv.value); }
  / space? fv:FieldLTEValue { return AST.Field.must.lte(fv.field, fv.value); }

FieldEQValue
  = field:fieldName ":" valueExpression:fieldContainsValue {
  	return {field, value: resolveFieldValue(field, valueExpression, ctx) };
  }

FieldEXACTValue
  = field:fieldName "=" valueExpression:fieldContainsValue {
  	return {field, value: resolveFieldValue(field, valueExpression, ctx) };
  }

FieldGTValue
  = field:fieldName ">" valueExpression:fieldRangeValue {
    return {field, value: resolveFieldValue(field, valueExpression, ctx)};
  }

FieldGTEValue
  = field:fieldName ">=" valueExpression:fieldRangeValue {
    return {field, value: resolveFieldValue(field, valueExpression, ctx)};
  }

FieldLTValue
  = field:fieldName "<" valueExpression:fieldRangeValue {
    return {field, value: resolveFieldValue(field, valueExpression, ctx)};
  }

FieldLTEValue
  = field:fieldName "<=" valueExpression:fieldRangeValue {
    return {field, value: resolveFieldValue(field, valueExpression, ctx)};
  }

flagName "flag name"
  = identifier

// If recognizedFields was given in options, the identifier must match an allowed field
fieldName "field name"
  = id:identifier &{ return !hasRecognizedFields || recognizedFields.includes(id); } { return id; }

identifier
  = identifierChar+ { return unescapeValue(text()); }

identifierChar
  = alnum
  / [-_]
  / escapedChar

fieldRangeValue
  = rangeValue

fieldContainsValue "field value"
  = containsOrValues
  / containsValue

termValue "term"
  = value:containsValue { return value.expression; }

containsOrValues
  = "(" space? head:containsValue tail:(
  	space orWord space value:containsValue { return value; }
  )* space? ")" { return [ head, ...tail ]; }

rangeValue
  = numberWord
  / date

containsValue
  = numberWord
  / date
  / booleanWord
  / phrase
  / word

phrase
  = '"' phrase:(
  	space? (phraseWord+)? (space phraseWord+)* space? { return unescapePhraseValue(text()); }
  ) '"' { return Exp.string(phrase, location()); }

phraseWord
  // not a backslash, quote, or space
  = [^\\\\" ]+
  // escaped character
  / '\\\\' (.)

word
  = wordChar+ {
      if (text().toLowerCase() === 'or') {
        error(
          'To use OR in a text search, put it inside quotes: "or". To ' +
          'perform a logical OR, enclose the words in parenthesis: (foo:bar or bar).'
        );
      }
      return Exp.string(unescapeValue(text()), location());
    }

wordChar
  = alnum
  / [-_*:/@]
  / escapedChar
  / extendedGlyph

// This isn't _strictly_ correct:
// for our purposes, a non-ascii word character is considered to
// be anything above \`Latin-1 Punctuation & Symbols\`, which ends at U+00BF
// This allows any non-ascii character, including the full set of unicode characters
// even those in the supplementary planes (U+010000 → U+10FFFF) as those will be seen individually
// in their surrogate pairs which are of the format /[\uD800-\uDBFF][\uDC00-\uDFFF]/
extendedGlyph
  = [\u00C0-\uFFFF]

escapedChar
  = "\\\\" reservedChar

reservedChar
  = [\-:\\\\()]

orWord
  = ([oO][rR])

// only match booleans followed by whitespace or end of input
booleanWord
  = bool:boolean &space { return bool; }
  / bool:boolean !. { return bool; }

boolean
  = [tT][rR][uU][eE] { return Exp.boolean(text(), location()); }
  / [fF][aA][lL][sS][eE] { return Exp.boolean(text(), location()); }
  / [yY][eE][sS] { return Exp.boolean(text(), location()); }
  / [nN][oO] { return Exp.boolean(text(), location()); }
  / [oO][fF][fF] { return Exp.boolean(text(), location()); }

number
 = [\\-]?[0-9]+("."[0-9]+)* { return Exp.number(text(), location()); }

// only match numbers followed by whitespace or end of input
numberWord
 = num:number &space { return num; }
 / num:number !. { return num; }

date
 = "'" expression:((!"'" .)+ { return text(); }) "'" {
 	return Exp.date(expression, location());
 }

alnum "alpha numeric"
  = [a-zA-Z0-9\\.]

space "whitespace"
  = [ \\t\\n\\r]+

