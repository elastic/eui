/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, waitForEuiToolTipVisible } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';

import { EuiContextMenuItem, SIZES } from './context_menu_item';

describe('EuiContextMenuItem', () => {
  shouldRenderCustomStyles(<EuiContextMenuItem />);

  shouldRenderCustomStyles(
    <EuiContextMenuItem toolTipContent="test" data-test-subj="trigger" />,
    {
      childProps: ['toolTipProps', 'toolTipProps.anchorProps'],
      skip: { parentTest: true },
      renderCallback: async ({ getByTestSubject }) => {
        fireEvent.mouseOver(getByTestSubject('trigger'));
        await waitForEuiToolTipVisible();
      },
    }
  );

  it('renders', () => {
    const { container } = render(
      <EuiContextMenuItem {...requiredProps} href="url">
        Hello
      </EuiContextMenuItem>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('icon', () => {
      const { container } = render(
        <EuiContextMenuItem icon={<span className="euiIcon fa-user" />} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('disabled', () => {
      const { container } = render(<EuiContextMenuItem href="url" disabled />);

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(size, () => {
          const { container } = render(<EuiContextMenuItem size={size} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('onClick', () => {
      it('renders a button', () => {
        const { container } = render(
          <EuiContextMenuItem {...requiredProps} onClick={() => {}} />
        );

        expect(container.firstChild?.nodeName).toEqual('BUTTON');
      });

      it('is called when the item is clicked', () => {
        const onClickHandler = jest.fn();

        const { container } = render(
          <EuiContextMenuItem onClick={onClickHandler} />
        );
        expect(onClickHandler).not.toHaveBeenCalled();

        fireEvent.click(container.firstChild!);
        expect(onClickHandler).toHaveBeenCalledTimes(1);
      });

      it('is not called when the item is clicked but set to disabled', () => {
        const onClickHandler = jest.fn();

        const { container } = render(
          <EuiContextMenuItem disabled onClick={onClickHandler} />
        );

        fireEvent.click(container.firstChild!);

        expect(onClickHandler).not.toHaveBeenCalled();
      });
    });

    test('href', () => {
      const { container } = render(
        <EuiContextMenuItem {...requiredProps} href="url" />
      );

      expect(container.firstChild?.nodeName).toEqual('A');
    });

    test('rel', () => {
      const { container } = render(
        <EuiContextMenuItem {...requiredProps} href="url" rel="help" />
      );

      expect(container.querySelector('a')).toHaveAttribute(
        'rel',
        'help noreferrer'
      );
    });

    test('target', () => {
      const { container } = render(
        <EuiContextMenuItem {...requiredProps} href="url" target="_blank" />
      );

      expect(container.querySelector('a')).toHaveAttribute('target', '_blank');
    });

    test('hasPanel renders a right arrow', () => {
      const { container } = render(<EuiContextMenuItem hasPanel />);

      expect(
        container.querySelector('.euiContextMenu__arrow')
      ).toBeInTheDocument();
    });
  });

  test('tooltip behavior', async () => {
    const { getByRole, baseElement } = render(
      <EuiContextMenuItem
        toolTipContent="tooltip content"
        toolTipProps={{ title: 'Test', position: 'top', delay: 'long' }}
      >
        Hello
      </EuiContextMenuItem>
    );

    fireEvent.mouseOver(getByRole('button'));
    await waitForEuiToolTipVisible();

    expect(baseElement).toMatchSnapshot();
  });
});
