/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiKeyPadMenu } from './key_pad_menu';

describe('EuiKeyPadMenu', () => {
  shouldRenderCustomStyles(<EuiKeyPadMenu />);
  shouldRenderCustomStyles(<EuiKeyPadMenu checkable={{ legend: 'test' }} />, {
    childProps: ['checkable.legendProps'],
    skip: { parentTest: true },
  });

  test('is rendered', () => {
    const { container } = render(<EuiKeyPadMenu {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('checkable', () => {
    test('is rendered as a fieldset when true', () => {
      const { container } = render(<EuiKeyPadMenu checkable />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('is rendered as with a legend', () => {
      const { container } = render(
        <EuiKeyPadMenu
          checkable={{ legend: 'Legend', legendProps: requiredProps }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('is rendered as with an ariaLegend', () => {
      const { container } = render(
        <EuiKeyPadMenu checkable={{ ariaLegend: 'Aria legend' }} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
