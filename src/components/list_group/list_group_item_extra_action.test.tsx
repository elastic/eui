/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiListGroupItemExtraAction } from './list_group_item_extra_action';

describe('EuiListGroupItem', () => {
  const props = {
    ...requiredProps,
    iconType: 'star',
  };

  shouldRenderCustomStyles(<EuiListGroupItemExtraAction iconType="star" />);

  test('is rendered', () => {
    const component = render(
      <EuiListGroupItemExtraAction {...requiredProps} iconType="star" />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('alwaysShow', () => {
      const component = render(
        <EuiListGroupItemExtraAction {...props} alwaysShow />
      );

      expect(component).toMatchSnapshot();
    });

    test('color', () => {
      const component = render(
        <EuiListGroupItemExtraAction {...props} color="accent" />
      );

      expect(component).toMatchSnapshot();
    });

    test('isDisabled', () => {
      const component = render(
        <EuiListGroupItemExtraAction {...props} isDisabled />
      );

      expect(component).toMatchSnapshot();
    });

    test('parentIsDisabled', () => {
      const component = render(
        <EuiListGroupItemExtraAction {...props} parentIsDisabled />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
