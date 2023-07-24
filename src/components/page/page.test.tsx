/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { PADDING_SIZES } from '../../global_styling';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiPage } from './page';

describe('EuiPage', () => {
  shouldRenderCustomStyles(<EuiPage />);

  test('is rendered', () => {
    const { container } = render(<EuiPage {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const { container } = render(<EuiPage paddingSize={size} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('grow', () => {
    test('can be false', () => {
      const { container } = render(<EuiPage grow={false} />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('direction', () => {
    test('can be row', () => {
      const { container } = render(<EuiPage direction="row" />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const { container } = render(<EuiPage restrictWidth={true} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const { container } = render(<EuiPage restrictWidth={1024} />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('can be set to a custom value and does not override custom style', () => {
      const { container } = render(
        <EuiPage restrictWidth="24rem" style={{ color: 'red ' }} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
