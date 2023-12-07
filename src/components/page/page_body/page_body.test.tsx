/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { PADDING_SIZES } from '../../../global_styling';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiPageBody } from './page_body';

describe('EuiPageBody', () => {
  shouldRenderCustomStyles(<EuiPageBody />);
  shouldRenderCustomStyles(<EuiPageBody panelled />, {
    childProps: ['panelProps'],
  });

  test('is rendered', () => {
    const { container } = render(<EuiPageBody {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const { container } = render(<EuiPageBody paddingSize={size} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('panelled', () => {
    test('can be set to true', () => {
      const { container } = render(<EuiPageBody panelled={true} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('also accepts panelProps', () => {
      const { container } = render(
        <EuiPageBody panelled={true} panelProps={{ color: 'subdued' }} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const { container } = render(
        <EuiPageBody {...requiredProps} restrictWidth={true} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const { container } = render(
        <EuiPageBody {...requiredProps} restrictWidth={1024} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('can be set to a custom value and measurement', () => {
      const { container } = render(
        <EuiPageBody {...requiredProps} restrictWidth="24rem" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
