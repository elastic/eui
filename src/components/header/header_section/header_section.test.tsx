/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiHeaderSection } from './header_section';

describe('EuiHeaderSection', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderSection {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders optional params', () => {
    const component = render(
      <EuiHeaderSection style={{ color: 'blue' }}>
        <span>Some years ago never mind how long precisely...</span>
      </EuiHeaderSection>
    );

    expect(component).toMatchSnapshot();
  });

  describe('grow', () => {
    test('defaults to false', () => {
      const component = render(<EuiHeaderSection />);

      expect(component).toMatchSnapshot();
    });

    test('renders true', () => {
      const component = render(<EuiHeaderSection grow />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('side', () => {
    test('defaults to left', () => {
      const component = render(<EuiHeaderSection />);

      expect(component).toMatchSnapshot();
    });

    test('renders right', () => {
      const component = render(<EuiHeaderSection side="right" />);

      expect(component).toMatchSnapshot();
    });
  });
});
