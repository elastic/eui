import { printIso8601 } from './date_format';
import { isDateValue } from './date_value';
import { AST, Operator } from './ast';
import { isArray, isDateLike, isString, isBoolean, isNumber } from '../../../services/predicate';

const emitMatch = (match) => {
  if (!match) {
    return '';
  }
  return AST.Match.isMust(match) ? '+' : '-';
};

const emitFieldDateLikeClause = (field, value, operator, match) => {
  const matchOp = emitMatch(match);
  switch (operator) {
    case Operator.EQ:
      return `${matchOp}${field}:${printIso8601(value)}`;
    case Operator.GT:
      return `${matchOp}${field}:>${printIso8601(value)}`;
    case Operator.GTE:
      return `${matchOp}${field}:>=${printIso8601(value)}`;
    case Operator.LT:
      return `${matchOp}${field}:<${printIso8601(value)}`;
    case Operator.LTE:
      return `${matchOp}${field}:<=${printIso8601(value)}`;
    default:
      throw new Error(`unknown operator [${operator}]`);
  }
};

const emitFieldDateValueClause = (field, value, operator, match) => {
  const matchOp = emitMatch(match);
  const { granularity, resolve } = value;
  const date = resolve();
  if (granularity) {
    switch (operator) {
      case Operator.EQ:
        const gte = granularity.iso8601(granularity.start(date));
        const lt = granularity.iso8601(granularity.startOfNext(date));
        return `${matchOp}${field}:(>=${gte} AND <${lt})`;
      case Operator.GT:
        return `${matchOp}${field}:>=${granularity.iso8601(granularity.startOfNext(date))}`;
      case Operator.GTE:
        return `${matchOp}${field}:>=${granularity.iso8601(granularity.start(date))}`;
      case Operator.LT:
        return `${matchOp}${field}:<${granularity.iso8601(granularity.start(date))}`;
      case Operator.LTE:
        return `${matchOp}${field}:<${granularity.iso8601(granularity.startOfNext(date))}`;
      default:
        throw new Error(`unknown operator [${operator}]`);
    }
  }
  return emitFieldDateLikeClause(field, date, operator, match);
};

const emitFieldNumericClause = (field, value, operator, match) => {
  const matchOp = emitMatch(match);
  switch (operator) {
    case Operator.EQ:
      return `${matchOp}${field}:${value}`;
    case Operator.GT:
      return `${matchOp}${field}:>${value}`;
    case Operator.GTE:
      return `${matchOp}${field}:>=${value}`;
    case Operator.LT:
      return `${matchOp}${field}:<${value}`;
    case Operator.LTE:
      return `${matchOp}${field}:<=${value}`;
    default:
      throw new Error(`unknown operator [${operator}]`);
  }
};

const emitFieldStringClause = (field, value, match) => {
  const matchOp = emitMatch(match);
  if (value.match(/\s/)) {
    return `${matchOp}${field}:"${value}"`;
  }
  return `${matchOp}${field}:${value}`;
};

const emitFieldBooleanClause = (field, value, match) => {
  const matchOp = emitMatch(match);
  return `${matchOp}${field}:${value}`;
};

const emitFieldSingleValueClause = (field, value, operator, match) => {
  if (isDateValue(value)) {
    return emitFieldDateValueClause(field, value, operator, match);
  }
  if (isDateLike(value)) {
    return emitFieldDateLikeClause(field, value, operator, match);
  }
  if (isString(value)) {
    return emitFieldStringClause(field, value, match);
  }
  if (isNumber(value)) {
    return emitFieldNumericClause(field, value, operator, match);
  }
  if (isBoolean(value)) {
    return emitFieldBooleanClause(field, value, match);
  }
  throw new Error(`unknown type of field value [${value}]`);
};

const emitFieldClause = (clause) => {
  const { field, value, operator, match } = clause;
  if (!isArray(value)) {
    return emitFieldSingleValueClause(field, value, operator, match);
  }
  const matchOp = emitMatch(match);
  const clauses = value.map(v => emitFieldSingleValueClause(field, v, operator)).join(' OR ');
  return `${matchOp}(${clauses})`;
};

const emitTermClause = (clause) => {
  const { value, match } = clause;
  const matchOp = emitMatch(match);
  return `${matchOp}${value}`;
};

const emitIsClause = (clause) => {
  const { flag, match } = clause;
  return AST.Match.isMust(match) ? `+${flag}:true` : `+${flag}:false`;
};

export const astToEsQueryString = (ast) => {

  if (ast.clauses.length === 0) {
    return '';
  }

  return ast.clauses.map(clause => {
    if (AST.Field.isInstance(clause)) {
      return emitFieldClause(clause)
    }
    if (AST.Term.isInstance(clause)) {
      return emitTermClause(clause);
    }
    if (AST.Is.isInstance(clause)) {
      return emitIsClause(clause);
    }
    throw new Error(`unknown clause type [${JSON.stringify(clause)}]`);
  }).join(' ');
};
