/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiListGroupItemExtraAction } from './list_group_item_extra_action';

describe('EuiListGroupItem', () => {
  const props = {
    ...requiredProps,
    iconType: 'star',
  };

  shouldRenderCustomStyles(<EuiListGroupItemExtraAction {...props} />);

  test('is rendered', () => {
    const { container } = render(<EuiListGroupItemExtraAction {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('alwaysShow', () => {
      const { container } = render(
        <EuiListGroupItemExtraAction {...props} alwaysShow />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('color', () => {
      const { container } = render(
        <EuiListGroupItemExtraAction {...props} color="accent" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isDisabled', () => {
      const { container } = render(
        <EuiListGroupItemExtraAction {...props} isDisabled />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('parentIsDisabled', () => {
      const { container } = render(
        <EuiListGroupItemExtraAction {...props} parentIsDisabled />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
