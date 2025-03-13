/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow } from 'enzyme';
import { fireEvent } from '@testing-library/react';
import { render, waitForEuiToolTipVisible } from '../../test/rtl';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiKeyPadMenuItem } from './key_pad_menu_item';

describe('EuiKeyPadMenuItem', () => {
  shouldRenderCustomStyles(
    <EuiKeyPadMenuItem label="test">Test</EuiKeyPadMenuItem>
  );
  shouldRenderCustomStyles(
    <EuiKeyPadMenuItem
      label="test"
      betaBadgeLabel="Beta"
      data-test-subj="trigger"
    >
      Test
    </EuiKeyPadMenuItem>,
    {
      skip: { parentTest: true },
      childProps: ['betaBadgeTooltipProps'],
      renderCallback: async ({ getByTestSubject }) => {
        fireEvent.mouseOver(getByTestSubject('trigger'));
        await waitForEuiToolTipVisible();
      },
    }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiKeyPadMenuItem label="Label" {...requiredProps}>
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isDisabled', () => {
      test('renders with href', () => {
        const { container } = render(
          <EuiKeyPadMenuItem isDisabled label="Label" href="#">
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders with onClick', () => {
        const onClickHandler = jest.fn();

        const { container } = render(
          <EuiKeyPadMenuItem isDisabled label="Label" onClick={onClickHandler}>
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      test('renders with href', () => {
        const { container } = render(
          <EuiKeyPadMenuItem isSelected label="Label" href="#">
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders with onClick', () => {
        const onClickHandler = jest.fn();

        const { container } = render(
          <EuiKeyPadMenuItem isSelected label="Label" onClick={onClickHandler}>
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('betaBadge', () => {
      test('renders', () => {
        const { container } = render(
          <EuiKeyPadMenuItem betaBadgeLabel="Beta" label="Label">
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders with betaBadgeIconType', () => {
        const { container } = render(
          <EuiKeyPadMenuItem
            betaBadgeLabel="Beta"
            betaBadgeIconType="bolt"
            label="Label"
          >
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders with betaBadgeTooltipContent', () => {
        const { container } = render(
          <EuiKeyPadMenuItem
            betaBadgeLabel="Beta"
            betaBadgeTooltipContent="Content"
            label="Label"
          >
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('renders extra betaBadgeTooltipProps', () => {
        const { container } = render(
          <EuiKeyPadMenuItem
            betaBadgeLabel="Beta"
            betaBadgeTooltipContent="Content"
            betaBadgeTooltipProps={{ anchorClassName: 'customTooltipClass' }}
            label="Label"
          >
            Icon
          </EuiKeyPadMenuItem>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  test('renders href', () => {
    const { container } = render(
      <EuiKeyPadMenuItem label="Label" href="#">
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders href with rel', () => {
    const { container } = render(
      <EuiKeyPadMenuItem label="Label" href="#" rel="noreferrer">
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders button', () => {
    const onClickHandler = jest.fn();

    const { container } = render(
      <EuiKeyPadMenuItem label="Label" onClick={onClickHandler}>
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test("onClick isn't called upon instantiation", () => {
    const onClickHandler = jest.fn();

    shallow(
      <EuiKeyPadMenuItem label="Label" onClick={onClickHandler}>
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(onClickHandler).not.toHaveBeenCalled();
  });

  test('onClick is called when the button is clicked', () => {
    const onClickHandler = jest.fn();

    const $button = shallow(
      <EuiKeyPadMenuItem label="Label" onClick={onClickHandler}>
        Icon
      </EuiKeyPadMenuItem>
    );

    $button.simulate('click');

    expect(onClickHandler).toHaveBeenCalledTimes(1);
  });

  describe('checkable', () => {
    test('renders as radio', () => {
      const { container } = render(
        <EuiKeyPadMenuItem
          onChange={() => {}}
          name="single"
          checkable="single"
          label="Label"
        >
          Icon
        </EuiKeyPadMenuItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('renders as checkbox', () => {
      const { container } = render(
        <EuiKeyPadMenuItem onChange={() => {}} checkable="multi" label="Label">
          Icon
        </EuiKeyPadMenuItem>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
