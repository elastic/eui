/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiSwitch } from './switch';

const props = {
  checked: false,
  label: 'Label',
  onChange: () => {},
};

describe('EuiSwitch', () => {
  shouldRenderCustomStyles(<EuiSwitch {...props} />, {
    skip: { style: true },
  });
  // styles are applied to the nested button instead of the className wrapper
  shouldRenderCustomStyles(<EuiSwitch {...props} />, {
    targetSelector: '.euiSwitch__button',
    skip: { className: true, css: true },
  });
  shouldRenderCustomStyles(<EuiSwitch {...props} />, {
    childProps: ['labelProps'],
    skip: { parentTest: true },
  });

  test('is rendered', () => {
    const { container } = render(
      <EuiSwitch id="test" {...props} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('assigns automatically generated ID to label', () => {
    const { container } = render(<EuiSwitch {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
  describe('labelProps', () => {
    it('is rendered', () => {
      const { container } = render(
        <EuiSwitch {...props} labelProps={requiredProps} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
