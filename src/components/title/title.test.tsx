/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTitle } from './title';

describe('EuiTitle', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTitle {...requiredProps}>
        <h1>Title</h1>
      </EuiTitle>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders children element className', () => {
    const component = render(
      <EuiTitle {...requiredProps}>
        <h1 className="test">Title</h1>
      </EuiTitle>
    );

    expect(component).toMatchSnapshot();
  });
});
