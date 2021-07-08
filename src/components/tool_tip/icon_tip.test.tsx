/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiIconTip } from './icon_tip';

describe('EuiIconTip', () => {
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
          <EuiIconTip type="alert" id="id" content="content" />
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
