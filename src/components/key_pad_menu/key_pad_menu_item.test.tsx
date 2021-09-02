/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiKeyPadMenuItem } from './key_pad_menu_item';

describe('EuiKeyPadMenuItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiKeyPadMenuItem label="Label" {...requiredProps}>
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      test('renders with href', () => {
        const component = render(
          <EuiKeyPadMenuItem isDisabled label="Label" href="#">
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(component).toMatchSnapshot();
      });

      test('renders with onClick', () => {
        const onClickHandler = jest.fn();

        const component = render(
          <EuiKeyPadMenuItem isDisabled label="Label" onClick={onClickHandler}>
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      test('renders with href', () => {
        const component = render(
          <EuiKeyPadMenuItem isSelected label="Label" href="#">
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(component).toMatchSnapshot();
      });

      test('renders with onClick', () => {
        const onClickHandler = jest.fn();

        const component = render(
          <EuiKeyPadMenuItem isSelected label="Label" onClick={onClickHandler}>
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('betaBadge', () => {
      test('renders', () => {
        const component = render(
          <EuiKeyPadMenuItem betaBadgeLabel="Beta" label="Label">
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(component).toMatchSnapshot();
      });

      test('renders with betaBadgeIconType', () => {
        const component = render(
          <EuiKeyPadMenuItem
            betaBadgeLabel="Beta"
            betaBadgeIconType="bolt"
            label="Label"
          >
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(component).toMatchSnapshot();
      });

      test('renders with betaBadgeTooltipContent', () => {
        const component = render(
          <EuiKeyPadMenuItem
            betaBadgeLabel="Beta"
            betaBadgeTooltipContent="Content"
            label="Label"
          >
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  test('renders href', () => {
    const component = render(
      <EuiKeyPadMenuItem label="Label" href="#">
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders href with rel', () => {
    const component = render(
      <EuiKeyPadMenuItem label="Label" href="#" rel="noreferrer">
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders button', () => {
    const onClickHandler = jest.fn();

    const component = render(
      <EuiKeyPadMenuItem label="Label" onClick={onClickHandler}>
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  test("onClick isn't called upon instantiation", () => {
    const onClickHandler = jest.fn();

    shallow(
      <EuiKeyPadMenuItem label="Label" onClick={onClickHandler}>
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(onClickHandler).not.toBeCalled();
  });

  test('onClick is called when the button is clicked', () => {
    const onClickHandler = jest.fn();

    const $button = shallow(
      <EuiKeyPadMenuItem label="Label" onClick={onClickHandler}>
        Icon
      </EuiKeyPadMenuItem>
    );

    $button.simulate('click');

    expect(onClickHandler).toBeCalledTimes(1);
  });

  describe('checkable', () => {
    test('renders as radio', () => {
      const component = render(
        <EuiKeyPadMenuItem
          onChange={() => {}}
          name="single"
          checkable="single"
          label="Label"
        >
          Icon
        </EuiKeyPadMenuItem>
      );

      expect(component).toMatchSnapshot();
    });

    test('renders as checkbox', () => {
      const component = render(
        <EuiKeyPadMenuItem onChange={() => {}} checkable="multi" label="Label">
          Icon
        </EuiKeyPadMenuItem>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
