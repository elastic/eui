/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiButtonContent } from './button_content';

describe('EuiButtonContent', () => {
  test('is rendered', () => {
    const component = render(<EuiButtonContent {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('children is rendered', () => {
      const component = render(<EuiButtonContent>Content</EuiButtonContent>);

      expect(component).toMatchSnapshot();
    });

    test('iconType is rendered', () => {
      const component = render(<EuiButtonContent iconType="bolt" />);

      expect(component).toMatchSnapshot();
    });

    test('iconSide is rendered', () => {
      const component = render(
        <EuiButtonContent iconSide="right" iconType="bolt" />
      );

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<EuiButtonContent isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading replaces iconType with spinner', () => {
      const component = render(<EuiButtonContent isLoading iconType="bolt" />);

      expect(component).toMatchSnapshot();
    });

    test('textProps is rendered', () => {
      const component = render(<EuiButtonContent textProps={requiredProps} />);

      expect(component).toMatchSnapshot();
    });
  });
});
