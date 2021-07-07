/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _AST, AST, Clause, OperatorType, Value } from './ast';
import { isArray, isString, isDateLike } from '../../../services/predicate';
import { dateFormat as defaultDateFormat } from './date_format';
import { DateValue, dateValueParser, isDateValue } from './date_value';
// @ts-ignore This is a Babel plugin that parses inline PEG grammars.
import peg from 'pegjs-inline-precompile'; // eslint-disable-line import/no-unresolved

const parser = peg`
{
  const { AST, Exp, unescapeValue, unescapePhraseValue, resolveFieldValue } = options;
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

fieldName "field name"
  = identifier

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
  = '"' space? phrase:(
  	(phraseWord+)? (space phraseWord+)* { return unescapePhraseValue(text()); }
  ) space? '"' { return Exp.string(phrase, location()); }

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
  / [-_*:/]
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
  / [oO][nN] { return Exp.boolean(text(), location()); }
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
`;

type DataType = 'date' | 'number' | 'string' | 'boolean';

interface SchemaField {
  type: DataType;
  valueDescription: string;
  validate?: (value: string | boolean | number | DateValue) => void;
}

interface Context {
  schema: {
    fields: {
      [name: string]: SchemaField;
    };
    flags: string[];
    strict: boolean;
  };
  strict: boolean;
  error: (message: string, location?: Location) => never;
  parseDate: (text: string) => DateValue;
}

type Expression = any;
type Location = any;

interface ValueExpression {
  type: DataType;
  expression: string;
  location: Location;
}

export interface ParseOptions {
  dateFormat?: any;
  schema?: any;
  escapeValue?: (value: any) => string;
}

const unescapeValue = (value: string) => {
  return value.replace(/\\([:\-\\()])/g, '$1');
};

const escapeValue = (value: string) => {
  return value.replace(/([:\-\\()])/g, '\\$1');
};

const unescapePhraseValue = (value: string) => {
  return value.replace(/\\(.)/g, '$1');
};

const escapePhraseValue = (value: string) => {
  return value.replace(/([\\"])/g, '\\$1');
};

const escapeFieldValue = (value: string) => {
  return value.replace(/(\\)/g, '\\$1');
};

const Exp = {
  date: (expression: Expression, location: Location) => ({
    type: 'date',
    expression,
    location,
  }),
  number: (expression: Expression, location: Location) => ({
    type: 'number',
    expression,
    location,
  }),
  string: (expression: Expression, location: Location) => ({
    type: 'string',
    expression,
    location,
  }),
  boolean: (expression: Expression, location: Location) => ({
    type: 'boolean',
    expression,
    location,
  }),
};

const validateFlag = (flag: string, location: Location, ctx: Context) => {
  if (ctx.schema && ctx.schema.strict) {
    if (ctx.schema.flags && ctx.schema.flags.includes(flag)) {
      return;
    }
    if (
      ctx.schema.fields &&
      ctx.schema.fields[flag] &&
      ctx.schema.fields[flag].type === 'boolean'
    ) {
      return;
    }
    ctx.error(`Unknown flag \`${flag}\``);
  }
};

const validateFieldValue = (
  field: string,
  schemaField: SchemaField,
  expression: Expression,
  value: Value,
  location: Location,
  error: Context['error']
) => {
  if (schemaField && schemaField.validate) {
    try {
      schemaField.validate(value);
    } catch (e) {
      error(
        `Invalid value \`${expression}\` set for field \`${field}\` - ${e.message}`,
        location
      );
    }
  }
};

const resolveFieldValue = (
  field: string,
  valueExpression: ValueExpression | ValueExpression[],
  ctx: Context
): Value | Value[] => {
  const { schema, error, parseDate } = ctx;
  if (isArray(valueExpression)) {
    // I don't know if this cast is valid. This function is called recursively and
    // doesn't apply any kind of flat-map.
    return valueExpression.map(
      (exp) => resolveFieldValue(field, exp, ctx) as Value
    );
  }
  const { location } = valueExpression;
  let { type, expression } = valueExpression;
  if (schema && !schema.fields[field] && schema.strict) {
    error(`Unknown field \`${field}\``, location);
  }
  const schemaField = schema && schema.fields[field];
  if (schemaField && schemaField.type !== type && schema.strict) {
    if (schemaField.type === 'string') {
      expression = valueExpression.expression = expression.toString();
      type = valueExpression.type = 'string';
    } else {
      const valueDesc =
        schemaField.valueDescription || `a ${schemaField.type} value`;
      error(
        `Expected ${valueDesc} for field \`${field}\`, but found \`${expression}\``,
        location
      );
    }
  }
  switch (type) {
    case 'date':
      let date: DateValue | null = null;
      try {
        date = parseDate(expression);
      } catch (e) {
        error(
          `Invalid data \`${expression}\` set for field \`${field}\``,
          location
        );
      }
      // error() throws an exception if called, so now `date` is not null.
      validateFieldValue(
        field,
        schemaField,
        expression,
        date!,
        location,
        error
      );
      return date!;

    case 'number':
      const number = Number(expression);
      if (Number.isNaN(number)) {
        error(
          `Invalid number \`${expression}\` set for field \`${field}\``,
          location
        );
      }
      validateFieldValue(
        field,
        schemaField,
        expression,
        number,
        location,
        error
      );
      return number;

    case 'boolean':
      // FIXME This would also match 'lion'. It should really anchor the match
      // and the start and end of the input.
      const boolean = !!expression.match(/true|yes|on/i);
      validateFieldValue(
        field,
        schemaField,
        expression,
        boolean,
        location,
        error
      );
      return boolean;

    default:
      validateFieldValue(
        field,
        schemaField,
        expression,
        expression,
        location,
        error
      );
      return expression;
  }
};

const printValue = (value: Value, options: ParseOptions) => {
  if (isDateValue(value)) {
    return `'${value.text}'`;
  }
  if (isDateLike(value)) {
    const dateFormat = options.dateFormat || defaultDateFormat;
    return `'${dateFormat.print(value)}'`;
  }
  if (!isString(value)) {
    return value.toString();
  }

  if (value.length === 0 || value.match(/\s/) || value.toLowerCase() === 'or') {
    return `"${escapePhraseValue(value)}"`;
  }

  const escapeFn = options.escapeValue || escapeValue;
  return escapeFn(value);
};

const resolveOperator = (operator: OperatorType) => {
  switch (operator) {
    case AST.Operator.EQ:
      return ':';
    case AST.Operator.EXACT:
      return '=';
    case AST.Operator.GT:
      return '>';
    case AST.Operator.GTE:
      return '>=';
    case AST.Operator.LT:
      return '<';
    case AST.Operator.LTE:
      return '<=';
    default:
      throw new Error(`unknown field/value operator [${operator}]`);
  }
};

export type Syntax = Readonly<{
  printClause: (clause: Clause, text: string, options: any) => string;
  print: (ast: _AST, options?: {}) => string;
  parse: (query: string, options?: ParseOptions) => _AST;
}>;

export const defaultSyntax: Syntax = Object.freeze({
  parse: (query: string, options: ParseOptions = {}) => {
    const dateFormat = options.dateFormat || defaultDateFormat;
    const parseDate = dateValueParser(dateFormat);
    const schema = options.schema || {};
    const clauses = parser.parse(query, {
      AST,
      Exp,
      unescapeValue,
      unescapePhraseValue,
      parseDate,
      resolveFieldValue,
      validateFlag,
      schema: { strict: false, flags: [], fields: {}, ...schema },
    });
    return AST.create(clauses);
  },

  printClause: (clause: Clause, text: string, options: any): string => {
    const prefix = AST.Match.isMustClause(clause) ? '' : '-';
    switch (clause.type) {
      case AST.Field.TYPE:
        const op = resolveOperator(clause.operator);
        const printFieldValueOptions = {
          ...options,
          escapeValue: escapeFieldValue,
        };
        if (isArray(clause.value)) {
          return `${text} ${prefix}${escapeValue(
            clause.field
          )}${op}(${clause.value
            .map((val) => printValue(val, printFieldValueOptions))
            .join(' or ')})`; // eslint-disable-line max-len
        }
        return `${text} ${prefix}${escapeValue(clause.field)}${op}${printValue(
          clause.value,
          printFieldValueOptions
        )}`;
      case AST.Is.TYPE:
        return `${text} ${prefix}is:${escapeValue(clause.flag)}`;
      case AST.Term.TYPE:
        return `${text} ${prefix}${printValue(clause.value, options)}`;
      case AST.Group.TYPE:
        return `(${clause.value
          .map((clause) =>
            defaultSyntax.printClause(clause, text, options).trim()
          )
          .join(' OR ')})`;
      default:
        return text;
    }
  },

  print: (ast: _AST, options = {}) => {
    return ast.clauses
      .reduce((text, clause) => {
        return defaultSyntax.printClause(clause, text, options);
      }, '')
      .trim();
  },
});
