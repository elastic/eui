/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  queryHelpers,
  buildQueries,
  Matcher,
  MatcherOptions,
  GetErrorFunction,
} from '@testing-library/react';

type ByTestSubjectArguments = [
  // Note: We could use Parameters<AllByAttribute>, but the generated TS defs is less specific
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions
];
const queryAllByTestSubject = (...args: ByTestSubjectArguments) =>
  queryHelpers.queryAllByAttribute('data-test-subj', ...args);

const getMultipleError: GetErrorFunction<[Matcher]> = (_, TestSubjectValue) =>
  `Found multiple elements with the data-test-subj attribute of: ${TestSubjectValue}`;
const getMissingError: GetErrorFunction<[Matcher]> = (_, TestSubjectValue) =>
  `Unable to find an element with the data-test-subj attribute of: ${TestSubjectValue}`;

const [
  queryByTestSubject,
  getAllByTestSubject,
  getByTestSubject,
  findAllByTestSubject,
  findByTestSubject,
] = buildQueries(queryAllByTestSubject, getMultipleError, getMissingError);

export {
  queryByTestSubject,
  queryAllByTestSubject,
  getByTestSubject,
  getAllByTestSubject,
  findAllByTestSubject,
  findByTestSubject,
};
