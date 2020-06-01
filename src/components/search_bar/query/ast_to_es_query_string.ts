/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import moment from 'moment';
import { printIso8601 } from './date_format';
import { DateValue, isDateValue } from './date_value';
import {
  _AST,
  AST,
  Clause,
  FieldClause,
  GroupClause,
  IsClause,
  MatchType,
  Operator,
  OperatorType,
  TermClause,
  Value,
} from './ast';
import {
  isArray,
  isDateLike,
  isString,
  isBoolean,
  isNumber,
} from '../../../services/predicate';

const emitMatch = (match: MatchType | undefined) => {
  if (!match) {
    return '';
  }
  return AST.Match.isMust(match) ? '+' : '-';
};

const emitFieldDateLikeClause = (
  field: string,
  value: moment.Moment | Date,
  operator: OperatorType,
  match?: MatchType
) => {
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

const emitFieldDateValueClause = (
  field: string,
  value: DateValue,
  operator: OperatorType,
  match?: MatchType
) => {
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
        return `${matchOp}${field}:>=${granularity.iso8601(
          granularity.startOfNext(date)
        )}`;
      case Operator.GTE:
        return `${matchOp}${field}:>=${granularity.iso8601(
          granularity.start(date)
        )}`;
      case Operator.LT:
        return `${matchOp}${field}:<${granularity.iso8601(
          granularity.start(date)
        )}`;
      case Operator.LTE:
        return `${matchOp}${field}:<${granularity.iso8601(
          granularity.startOfNext(date)
        )}`;
      default:
        throw new Error(`unknown operator [${operator}]`);
    }
  }
  return emitFieldDateLikeClause(field, date, operator, match);
};

const emitFieldNumericClause = (
  field: string,
  value: number,
  operator: OperatorType,
  match?: MatchType
) => {
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

const emitFieldStringClause = (
  field: string,
  value: string,
  match?: MatchType
) => {
  const matchOp = emitMatch(match);
  if (value.match(/\s/)) {
    return `${matchOp}${field}:"${value}"`;
  }
  return `${matchOp}${field}:${value}`;
};

const emitFieldBooleanClause = (
  field: string,
  value: Value,
  match?: MatchType
) => {
  const matchOp = emitMatch(match);
  return `${matchOp}${field}:${value}`;
};

const emitFieldSingleValueClause = (
  field: string,
  value: Value,
  operator: OperatorType,
  match?: MatchType
) => {
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

const emitFieldClause = (
  clause: FieldClause,
  isGroupMember: boolean
): string => {
  const { field, value, operator } = clause;
  let { match } = clause;
  if (isGroupMember && AST.Match.isMust(match)) {
    match = undefined;
  }

  if (!isArray(value)) {
    return emitFieldSingleValueClause(field, value, operator, match);
  }
  const matchOp = emitMatch(match);
  const clauses = value
    .map(v => emitFieldSingleValueClause(field, v, operator))
    .join(' OR ');
  return `${matchOp}(${clauses})`;
};

const emitTermClause = (clause: TermClause, isGroupMember: boolean): string => {
  const { value } = clause;
  let { match } = clause;
  if (isGroupMember && AST.Match.isMust(match)) {
    match = undefined;
  }

  const matchOp = emitMatch(match);
  return `${matchOp}${value}`;
};

const emitIsClause = (clause: IsClause, isGroupMember: boolean): string => {
  const { flag, match } = clause;
  const matchOp = isGroupMember ? '' : '+';
  const flagValue = AST.Match.isMust(match);
  return `${matchOp}${flag}:${flagValue}`;
};

const emitGroupClause = (clause: GroupClause): string => {
  const { value } = clause;
  const formattedValues = value.map(clause => {
    return emitClause(clause, true);
  });
  return `+(${formattedValues.join(' ')})`;
};

function emitClause(clause: Clause, isGroupMember = false) {
  if (AST.Field.isInstance(clause)) {
    return emitFieldClause(clause, isGroupMember);
  }
  if (AST.Term.isInstance(clause)) {
    return emitTermClause(clause, isGroupMember);
  }
  if (AST.Is.isInstance(clause)) {
    return emitIsClause(clause, isGroupMember);
  }
  if (AST.Group.isInstance(clause)) {
    return emitGroupClause(clause);
  }
  throw new Error(`unknown clause type [${JSON.stringify(clause)}]`);
}

export const astToEsQueryString = (ast: _AST) => {
  if (ast.clauses.length === 0) {
    return '*';
  }

  return ast.clauses.map(clause => emitClause(clause)).join(' ');
};
