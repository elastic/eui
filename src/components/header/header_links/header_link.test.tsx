/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiHeaderLink } from './header_link';

describe('EuiHeaderLink', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderLink {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('is rendered as active', () => {
    const component = render(<EuiHeaderLink isActive />);

    expect(component).toMatchSnapshot();
  });

  test('can render as specific color', () => {
    const component = render(<EuiHeaderLink color="danger" />);

    expect(component).toMatchSnapshot();
  });
});
