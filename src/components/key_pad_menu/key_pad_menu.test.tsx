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

import { EuiKeyPadMenu } from './key_pad_menu';

describe('EuiKeyPadMenu', () => {
  test('is rendered', () => {
    const component = render(<EuiKeyPadMenu {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('checkable', () => {
    test('is rendered as a fieldset when true', () => {
      const component = render(<EuiKeyPadMenu checkable />);

      expect(component).toMatchSnapshot();
    });

    test('is rendered as with a legend', () => {
      const component = render(
        <EuiKeyPadMenu
          checkable={{ legend: 'Legend', legendProps: requiredProps }}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('is rendered as with an ariaLegend', () => {
      const component = render(
        <EuiKeyPadMenu checkable={{ ariaLegend: 'Aria legend' }} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
