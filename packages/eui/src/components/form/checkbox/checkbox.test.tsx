/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

import { EuiCheckbox } from './checkbox';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

const checkboxRequiredProps = {
  id: 'id',
  onChange: () => {},
};

describe('EuiCheckbox', () => {
  shouldRenderCustomStyles(<EuiCheckbox {...checkboxRequiredProps} />, {
    skip: { style: true },
  });
  // styles get applied to the nested input, not to the className wrapper
  shouldRenderCustomStyles(<EuiCheckbox {...checkboxRequiredProps} />, {
    targetSelector: '.euiCheckbox__input',
    skip: { className: true, css: true },
  });
  shouldRenderCustomStyles(
    <EuiCheckbox {...checkboxRequiredProps} label="test" />,
    {
      childProps: ['labelProps'],
      skip: { parentTest: true },
    }
  );

  it('renders', () => {
    const { container } = render(
      <EuiCheckbox id="id" onChange={() => {}} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('renders props:', () => {
    test('checked', () => {
      const { container } = render(
        <EuiCheckbox {...checkboxRequiredProps} checked />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('label', () => {
      const { container } = render(
        <EuiCheckbox {...checkboxRequiredProps} label={<span>Label</span>} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('labelProps', () => {
      const { container } = render(
        <EuiCheckbox
          {...checkboxRequiredProps}
          label="Label"
          labelProps={requiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('disabled', () => {
      const { container } = render(
        <EuiCheckbox {...checkboxRequiredProps} disabled />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('readOnly', () => {
      const { container } = render(
        <EuiCheckbox {...checkboxRequiredProps} readOnly label="Label" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
