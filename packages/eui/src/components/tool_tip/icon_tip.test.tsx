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
import { render, waitForEuiToolTipVisible } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiIconTip } from './icon_tip';

describe('EuiIconTip', () => {
  shouldRenderCustomStyles(
    <EuiIconTip content="test" iconProps={{ 'data-test-subj': 'trigger' }} />,
    {
      childProps: ['iconProps'],
      renderCallback: async ({ getByTestSubject }) => {
        fireEvent.mouseOver(getByTestSubject('trigger'));
        await waitForEuiToolTipVisible();
      },
    }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiIconTip title="title" id="id" content="content" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('type', () => {
      test('is rendered as the icon', () => {
        const { container } = render(
          <EuiIconTip type="warning" id="id" content="content" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('color', () => {
      test('is rendered as the icon color', () => {
        const { container } = render(
          <EuiIconTip color="warning" id="id" content="content" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('size', () => {
      test('is rendered as the icon size', () => {
        const { container } = render(
          <EuiIconTip size="xl" id="id" content="content" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
