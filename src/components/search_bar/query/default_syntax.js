import { AST } from './ast';
import { isArray, isString, isDateLike } from '../../../services/predicate';
import { dateFormat as defaultDateFormat } from './date_format';
import { dateValueParser, isDateValue } from './date_value';
import peg from 'pegjs-inline-precompile'; // eslint-disable-line import/no-unresolved

const parser = peg`
{
  const { AST, Exp, unescapeValue, resolveFieldValue } = options;
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
  = IsClause
  / FieldClause
  / TermClause

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

FieldClause
  = space? "-" fv:FieldEQValue { return AST.Field.mustNot.eq(fv.field, fv.value); }
  / space? "-" fv:FieldGTValue { return AST.Field.mustNot.gt(fv.field, fv.value); }
  / space? "-" fv:FieldGTEValue { return AST.Field.mustNot.gte(fv.field, fv.value); }
  / space? "-" fv:FieldLTValue { return AST.Field.mustNot.lt(fv.field, fv.value); }
  / space? "-" fv:FieldLTEValue { return AST.Field.mustNot.lte(fv.field, fv.value); }
  / space? fv:FieldEQValue { return AST.Field.must.eq(fv.field, fv.value); }
  / space? fv:FieldGTValue { return AST.Field.must.gt(fv.field, fv.value); }
  / space? fv:FieldGTEValue { return AST.Field.must.gte(fv.field, fv.value); }
  / space? fv:FieldLTValue { return AST.Field.must.lt(fv.field, fv.value); }
  / space? fv:FieldLTEValue { return AST.Field.must.lte(fv.field, fv.value); }

FieldEQValue
  = field:fieldName ":" valueExpression:fieldContainsValue {
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
  / [-]
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
  	space ([oO][rR]) space value:containsValue { return value; }
  )* space? ")" { return [ head, ...tail ]; }
  
rangeValue
  = number
  / date

containsValue
  = number
  / date
  / boolean
  / word
  / phrase

phrase
  = '"' space? phrase:(
  	word (space word)* { return unescapeValue(text()); }
  ) space? '"' { return Exp.string(phrase, location()); }

word
  = wordChar+ { return Exp.string(unescapeValue(text()), location()); }

wordChar
  = alnum
  / [-]
  / escapedChar

escapedChar
  = "\\\\" reservedChar

reservedChar
  = [\-:\\\\]

boolean
  = [tT][rR][uU][eE] { return Exp.boolean(text(), location()); }
  / [fF][aA][lL][sS][eE] { return Exp.boolean(text(), location()); }
  / [yY][eE][sS] { return Exp.boolean(text(), location()); }
  / [nN][oO] { return Exp.boolean(text(), location()); }
  / [oO][nN] { return Exp.boolean(text(), location()); }
  / [oO][fF][fF] { return Exp.boolean(text(), location()); }

number
 = [\\-]?[0-9]+("."[0-9]+)* { return Exp.number(text(), location()); }

date
 = "'" expression:((!"'" .)+ { return text(); }) "'" {
 	return Exp.date(expression, location());
 }

alnum "alpha numeric"
  = [a-zA-Z0-9\\.]

space "whitespace"
  = [ \\t\\n\\r]+
`;

const unescapeValue = (value) => {
  return value.replace(/\\([:\-\\])/, '$1');
};

const escapeValue = (value) => {
  return value.replace(/([:\-\\])/, '\\$1');
};

const Exp = {
  date: (expression, location) => ({ type: 'date', expression, location }),
  number: (expression, location) => ({ type: 'number', expression, location }),
  string: (expression, location) => ({ type: 'string', expression, location }),
  boolean: (expression, location) => ({ type: 'boolean', expression, location })
};

const validateFlag = (flag, location, ctx) => {
  if (ctx.schema && ctx.schema.strict) {
    if (ctx.schema.flags && ctx.schema.flags.includes(flag)) {
      return;
    }
    if (ctx.schema.fields && ctx.schema.fields[flag] && ctx.schema.fields[flag].type === 'boolean') {
      return;
    }
    ctx.error(`Unknown flag \`${flag}\``);
  }
};

const validateFieldValue = (field, schemaField, expression, value, location, error) => {
  if (schemaField && schemaField.validate) {
    try {
      schemaField.validate(value);
    } catch (e) {
      error(`Invalid value \`${expression}\` set for field \`${field}\` - ${e.message}`, location);
    }
  }
};

const resolveFieldValue = (field, valueExpression, ctx) => {
  const { schema, error, parseDate } = ctx;
  if (isArray(valueExpression)) {
    return valueExpression.map(exp => resolveFieldValue(field, exp, ctx));
  }
  const { type, expression, location } = valueExpression;
  if (schema && !schema.fields[field] && schema.strict) {
    error(`Unknown field \`${field}\``, location);
  }
  const schemaField = schema && schema.fields[field];
  if (schemaField && schemaField.type !== type && schema.strict) {
    const valueDesc = schemaField.valueDescription || `a ${schemaField.type} value`;
    error(`Expected ${valueDesc} for field \`${field}\`, but found \`${expression}\``, location);
  }
  switch(type) {

    case 'date':
      let date = null;
      try {
        date = parseDate(expression);
      } catch (e) {
        error(`Invalid data \`${expression}\` set for field \`${field}\``, location);
      }
      validateFieldValue(field, schemaField, expression, date, location, error);
      return date;

    case 'number':
      const number = Number(expression);
      if (Number.isNaN(number)) {
        error(`Invalid number \`${expression}\` set for field \`${field}\``, location);
      }
      validateFieldValue(field, schemaField, expression, number, location, error);
      return number;

    case 'boolean':
      const boolean = !!expression.match(/true|yes|on/i);
      validateFieldValue(field, schemaField, expression, boolean, location, error);
      return boolean;

    default:
      validateFieldValue(field, schemaField, expression, expression, location, error);
      return expression;
  }
};

const printValue = (value, options) => {
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
  if (value.match(/\s/)) {
    return `"${escapeValue(value)}"`;
  }
  return escapeValue(value);
};

const resolveOperator = (operator) => {
  switch (operator) {
    case AST.Operator.EQ:
      return ':';
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

export const defaultSyntax = Object.freeze({

  parse: (query, options = {}) => {
    const dateFormat = options.dateFormat || defaultDateFormat;
    const parseDate = dateValueParser(dateFormat);
    const schema = options.schema || {};
    const clauses = parser.parse(query, {
      AST,
      Exp,
      unescapeValue,
      parseDate,
      resolveFieldValue,
      validateFlag,
      schema: { strict: false, flags: [], fields: {}, ...schema }
    });
    return AST.create(clauses);
  },

  print: (ast, options = {}) => {
    return ast.clauses.reduce((text, clause) => {
      const prefix = AST.Match.isMustClause(clause) ? '' : '-';
      switch (clause.type) {
        case AST.Field.TYPE:
          const op = resolveOperator(clause.operator);
          if (isArray(clause.value)) {
            return `${text} ${prefix}${escapeValue(clause.field)}${op}(${clause.value.map(val => printValue(val, options)).join(' or ')})`;
          }
          return `${text} ${prefix}${escapeValue(clause.field)}${op}${printValue(clause.value, options)}`;
        case AST.Is.TYPE:
          return `${text} ${prefix}is:${escapeValue(clause.flag)}`;
        case AST.Term.TYPE:
          return `${text} ${prefix}${printValue(clause.value, options)}`;
        default:
          return text;
      }
    }, '').trim();
  }

});
