/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { render } from '../../../test/rtl';

import { EuiCardSelect } from './card_select';

describe('EuiCardSelect', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiCardSelect onClick={() => {}} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(<EuiCardSelect />);

  describe('props', () => {
    test('isSelected', () => {
      const { container } = render(
        <EuiCardSelect onClick={() => {}} isSelected />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isDisabled', () => {
      const { container } = render(
        <EuiCardSelect onClick={() => {}} isDisabled />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('can override color', () => {
      const { container } = render(
        <EuiCardSelect onClick={() => {}} color="danger" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('can override text', () => {
      const { container } = render(
        <EuiCardSelect onClick={() => {}} children="Custom text" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
