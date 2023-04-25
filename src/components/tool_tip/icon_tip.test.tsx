/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { fireEvent } from '@testing-library/react';
import { waitForEuiToolTipVisible } from '../../test/rtl';
import { requiredProps } from '../../test';
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
    const component = render(
      <EuiIconTip title="title" id="id" content="content" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('type', () => {
      test('is rendered as the icon', () => {
        const component = render(
          <EuiIconTip type="warning" id="id" content="content" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      test('is rendered as the icon color', () => {
        const component = render(
          <EuiIconTip color="warning" id="id" content="content" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      test('is rendered as the icon size', () => {
        const component = render(
          <EuiIconTip size="xl" id="id" content="content" />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
