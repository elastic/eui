/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, screen } from './custom_render';

describe('render returns the ByTestSubject custom queries', () => {
  test('queryByTestSubject', () => {
    const { queryByTestSubject } = render(<div data-test-subj="test" />);

    expect(queryByTestSubject('test')).not.toBeNull();
  });

  test('queryAllByTestSubject', () => {
    const { queryAllByTestSubject } = render(<div data-test-subj="test" />);

    expect(queryAllByTestSubject('test')).toHaveLength(1);
  });

  test('getByTestSubject', () => {
    const { getByTestSubject } = render(<div data-test-subj="test" />);

    expect(getByTestSubject('test')).toBeTruthy();
  });

  test('getAllByTestSubject', () => {
    const { getAllByTestSubject } = render(<div data-test-subj="test" />);

    expect(getAllByTestSubject('test')).toHaveLength(1);
  });

  test('findByTestSubject', async () => {
    const { findByTestSubject } = render(<div data-test-subj="test" />);

    await expect(findByTestSubject('test')).resolves.toBeTruthy();
  });

  test('findAllByTestSubject', async () => {
    const { findAllByTestSubject } = render(<div data-test-subj="test" />);

    await expect(findAllByTestSubject('test')).resolves.toHaveLength(1);
  });
});

describe('screen has the ByTestSubject custom queries', () => {
  test('queryByTestSubject', () => {
    render(<div data-test-subj="test" />);

    expect(screen.queryByTestSubject('test')).not.toBeNull();
  });

  test('queryAllByTestSubject', () => {
    render(<div data-test-subj="test" />);

    expect(screen.queryAllByTestSubject('test')).toHaveLength(1);
  });

  test('getByTestSubject', () => {
    render(<div data-test-subj="test" />);

    expect(screen.getByTestSubject('test')).toBeTruthy();
  });

  test('getAllByTestSubject', () => {
    render(<div data-test-subj="test" />);

    expect(screen.getAllByTestSubject('test')).toHaveLength(1);
  });

  test('findByTestSubject', async () => {
    render(<div data-test-subj="test" />);

    await expect(screen.findByTestSubject('test')).resolves.toBeTruthy();
  });

  test('findAllByTestSubject', async () => {
    render(<div data-test-subj="test" />);

    await expect(screen.findAllByTestSubject('test')).resolves.toHaveLength(1);
  });
});
