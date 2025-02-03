/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { dataTestSubjQueries } from './data_test_subj_queries';

describe('ByTestSubject custom queries', () => {
  test('queryByTestSubject', () => {
    const { container } = render(<div data-test-subj="test" />);

    expect(
      dataTestSubjQueries.queryByTestSubject(container, 'test')
    ).not.toBeNull();
  });

  test('queryAllByTestSubject', () => {
    const { container } = render(<div data-test-subj="test" />);

    expect(
      dataTestSubjQueries.queryAllByTestSubject(container, 'test')
    ).toHaveLength(1);
  });

  test('getByTestSubject', () => {
    const { container } = render(<div data-test-subj="test" />);

    expect(
      dataTestSubjQueries.getByTestSubject(container, 'test')
    ).toBeTruthy();
  });

  test('getAllByTestSubject', () => {
    const { container } = render(<div data-test-subj="test" />);

    expect(
      dataTestSubjQueries.getAllByTestSubject(container, 'test')
    ).toHaveLength(1);
  });

  test('findByTestSubject', async () => {
    const { container } = render(<div data-test-subj="test" />);

    await expect(
      dataTestSubjQueries.findByTestSubject(container, 'test')
    ).resolves.toBeTruthy();
  });

  test('findAllByTestSubject', async () => {
    const { container } = render(<div data-test-subj="test" />);

    await expect(
      dataTestSubjQueries.findAllByTestSubject(container, 'test')
    ).resolves.toHaveLength(1);
  });
});
