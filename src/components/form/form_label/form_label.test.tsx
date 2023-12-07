/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiFormLabel } from './form_label';

describe('EuiFormLabel', () => {
  test('is rendered', () => {
    const { container } = render(<EuiFormLabel {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('isFocused is rendered', () => {
      const { container } = render(<EuiFormLabel isFocused />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const { container } = render(<EuiFormLabel isInvalid />);

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('isDisabled', () => {
      test('is rendered', () => {
        const { container } = render(<EuiFormLabel isDisabled />);

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is still disabled with for attribute', () => {
        const { container } = render(<EuiFormLabel isDisabled htmlFor="" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    test('type can be changed to legend', () => {
      const { container } = render(<EuiFormLabel type="legend" />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
