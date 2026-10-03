/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiFilterSelectItem } from './filter_select_item';

describe('EuiFilterSelectItem', () => {
  shouldRenderCustomStyles(<EuiFilterSelectItem />);

  it('renders', () => {
    const { container } = render(<EuiFilterSelectItem {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('selection state', () => {
    it.each([
      ['selected', 'on', 'true', 'check'],
      ['excluded', 'off', 'false', 'cross'],
      ['neutral', undefined, 'false', 'empty'],
    ] as const)(
      'renders a %s item',
      (_state, checked, ariaSelected, iconType) => {
        const { container, getByRole } = render(
          <EuiFilterSelectItem checked={checked}>Item</EuiFilterSelectItem>
        );

        expect(getByRole('option')).toHaveAttribute(
          'aria-selected',
          ariaSelected
        );
        expect(
          container.querySelector(`[data-euiicon-type="${iconType}"]`)
        ).toBeInTheDocument();
      }
    );

    it('can hide icons', () => {
      const { container } = render(
        <EuiFilterSelectItem checked="on" showIcons={false}>
          Item
        </EuiFilterSelectItem>
      );

      expect(container.querySelector('[data-euiicon-type]')).toBeNull();
    });
  });

  describe('interaction behavior', () => {
    it('does not select or offer a tooltip when disabled', () => {
      const onClick = jest.fn();
      const { getByRole, queryByRole } = render(
        <EuiFilterSelectItem
          disabled
          onClick={onClick}
          toolTipContent="Filter item tooltip"
        >
          <span>Item</span>
        </EuiFilterSelectItem>
      );
      const option = getByRole('option');

      fireEvent.click(option);

      expect(option).toBeDisabled();
      expect(option).toHaveAttribute('aria-disabled', 'true');
      expect(onClick).not.toHaveBeenCalled();
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('applies focused appearance and scrolls into view when focused', () => {
      const scrollIntoView = jest.fn();
      const { getByRole, rerender } = render(
        <EuiFilterSelectItem isFocused={false}>Item</EuiFilterSelectItem>
      );
      const option = getByRole('option');
      option.scrollIntoView = scrollIntoView;
      const unfocusedClassName = option.className;

      rerender(<EuiFilterSelectItem isFocused>Item</EuiFilterSelectItem>);

      expect(option.className).not.toBe(unfocusedClassName);
      expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' });
    });

    it('forwards the button ref', () => {
      const forwardRef = jest.fn();
      const { getByRole, rerender, unmount } = render(
        <EuiFilterSelectItem forwardRef={forwardRef}>Item</EuiFilterSelectItem>
      );

      expect(forwardRef).toHaveBeenCalledWith(getByRole('option'));
      expect(forwardRef).toHaveBeenCalledTimes(1);

      rerender(
        <EuiFilterSelectItem forwardRef={forwardRef}>Item</EuiFilterSelectItem>
      );
      expect(forwardRef).toHaveBeenCalledTimes(1);

      unmount();
      expect(forwardRef).toHaveBeenLastCalledWith(null);
    });
  });

  describe('content behavior', () => {
    it.each([
      ['tooltip content is absent', <span>Item</span>, undefined],
      ['content cannot anchor the tooltip', 'Item', 'Filter item tooltip'],
    ])(
      'does not offer a tooltip when %s',
      (_case, children, toolTipContent) => {
        const { queryByRole } = render(
          <EuiFilterSelectItem isFocused toolTipContent={toolTipContent}>
            {children}
          </EuiFilterSelectItem>
        );

        expect(queryByRole('tooltip')).not.toBeInTheDocument();
      }
    );

    it.each([
      ['enabled', true],
      ['disabled', false],
    ])('renders content truncation when %s', (_state, truncateContent) => {
      const { getByText } = render(
        <EuiFilterSelectItem truncateContent={truncateContent}>
          Item
        </EuiFilterSelectItem>
      );

      expect(getByText('Item')).toHaveClass(
        'euiFilterSelectItem__content',
        ...(truncateContent ? ['eui-textTruncate'] : [])
      );
      if (!truncateContent) {
        expect(getByText('Item')).not.toHaveClass('eui-textTruncate');
      }
    });
  });

  describe('tooltip behavior', () => {
    const tooltipProps = {
      toolTipContent: 'Filter item tooltip',
      toolTipProps: { 'data-test-subj': 'filterItemToolTip' },
    };

    it('shows tooltip when `isFocused` becomes true', () => {
      const { rerender, getByTestSubject } = render(
        <EuiFilterSelectItem {...tooltipProps} isFocused={false}>
          <span>Item</span>
        </EuiFilterSelectItem>
      );

      rerender(
        <EuiFilterSelectItem {...tooltipProps} isFocused={true}>
          <span>Item</span>
        </EuiFilterSelectItem>
      );

      expect(getByTestSubject('filterItemToolTip')).toBeInTheDocument();
    });

    it('hides tooltip when `isFocused` becomes false', () => {
      const { rerender, queryByRole } = render(
        <EuiFilterSelectItem {...tooltipProps} isFocused={false}>
          <span>Item</span>
        </EuiFilterSelectItem>
      );

      rerender(
        <EuiFilterSelectItem {...tooltipProps} isFocused={true}>
          <span>Item</span>
        </EuiFilterSelectItem>
      );

      expect(queryByRole('tooltip')).toBeInTheDocument();

      rerender(
        <EuiFilterSelectItem {...tooltipProps} isFocused={false}>
          <span>Item</span>
        </EuiFilterSelectItem>
      );

      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
