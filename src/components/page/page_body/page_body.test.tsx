/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiPageBody } from './page_body';

describe('EuiPageBody', () => {
  test('is rendered', () => {
    const component = render(<EuiPageBody {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('panelled', () => {
    test('can be set to true', () => {
      const component = render(<EuiPageBody panelled={true} />);

      expect(component).toMatchSnapshot();
    });

    test('also accepts panelProps', () => {
      const component = render(
        <EuiPageBody panelled={true} panelProps={{ color: 'subdued' }} />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const component = render(
        <EuiPageBody {...requiredProps} restrictWidth={true} />
      );

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(
        <EuiPageBody {...requiredProps} restrictWidth={1024} />
      );

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom value and measurement', () => {
      const component = render(
        <EuiPageBody {...requiredProps} restrictWidth="24rem" />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
