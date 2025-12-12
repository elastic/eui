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
// @ts-ignore Query parser is a generated file pre-built by PEG.js
import { parse } from './query_parser';

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
  schema?: {
    strict?: boolean;
    fields?: string[] | Record<string, any>;
    recognizedFields?: string[];
  };
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
      const message = e instanceof Error ? e.message : e;
      error(
        `Invalid value \`${expression}\` set for field \`${field}\` - ${message}`,
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

  if (
    value.length === 0 ||
    value.match(/[^\w\-_*:()"/\\]/) || // Escape spaces and special characters not used as syntax identifiers
    value.toLowerCase() === 'or'
  ) {
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
    const { recognizedFields, ...schema } = options.schema || {};
    const clauses = parse(query, {
      AST,
      Exp,
      unescapeValue,
      unescapePhraseValue,
      parseDate,
      resolveFieldValue,
      validateFlag,
      schema: { strict: false, flags: [], fields: {}, ...schema },
      recognizedFields,
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
