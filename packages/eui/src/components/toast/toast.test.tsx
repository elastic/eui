/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';
import { render } from '../../test/rtl';

import { COLORS, EuiToast } from './toast';

describe('EuiToast', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiToast {...requiredProps} title="test title">
        <p>Hi</p>
      </EuiToast>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Props', () => {
    describe('title', () => {
      test('is rendered', () => {
        const { container } = render(<EuiToast title="toast title" />);
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <EuiToast color={color} title="test title" />
          );
          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('iconType', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiToast iconType="user" title="test title" />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('onClose', () => {
      test('is called when the close button is clicked', () => {
        const onCloseHandler = jest.fn();

        const { getByTestSubject } = render(
          <EuiToast onClose={onCloseHandler} title="test title" />
        );

        const closeButton = getByTestSubject('toastCloseButton');
        fireEvent.click(closeButton);

        expect(onCloseHandler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
