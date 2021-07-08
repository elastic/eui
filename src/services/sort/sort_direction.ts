/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import PropTypes from 'prop-types';

const ASC = 'asc' as const;
const DESC = 'desc' as const;

export type Direction = typeof ASC | typeof DESC;

export const SortDirection = Object.freeze({
  ASC,
  DESC,
  isAsc(direction: Direction) {
    return direction === ASC;
  },
  reverse(direction: Direction) {
    return this.isAsc(direction) ? DESC : ASC;
  },
});

export const SortDirectionType = PropTypes.oneOf([ASC, DESC]);
