/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, waitForEuiToolTipVisible, within } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiSuperUpdateButton } from './super_update_button';
import { EuiButtonProps } from '../../button';

const noop = () => {};

describe('EuiSuperUpdateButton', () => {
  shouldRenderCustomStyles(<EuiSuperUpdateButton onClick={noop} />);
  shouldRenderCustomStyles(
    <EuiSuperUpdateButton
      onClick={noop}
      data-test-subj="trigger"
      showTooltip
      needsUpdate
      toolTipProps={{ children: <>Test</>, delay: 'regular', position: 'top' }} // React throws a `Failed prop type` error without this
    />,
    {
      childProps: ['toolTipProps'],
      skip: { parentTest: true },
      renderCallback: async ({ getByTestSubject }) => {
        fireEvent.mouseOver(getByTestSubject('trigger'));
        await waitForEuiToolTipVisible();
      },
    }
  );

  it('is rendered', () => {
    const { container } = render(<EuiSuperUpdateButton onClick={noop} />);

    const tooltipWrapper = container.querySelector('.euiToolTipAnchor');
    expect(tooltipWrapper).toBeInTheDocument();

    const button = within(tooltipWrapper as HTMLElement).getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('euiSuperUpdateButton');
    expect(button).toHaveTextContent('Refresh');
  });

  describe('props', () => {
    it('needsUpdate', () => {
      const { getByRole } = render(
        <EuiSuperUpdateButton needsUpdate onClick={noop} />
      );

      expect(getByRole('button')).toHaveTextContent('Update');
    });

    it('isDisabled', () => {
      const { getByRole } = render(
        <EuiSuperUpdateButton isDisabled onClick={noop} />
      );

      expect(getByRole('button')).toBeDisabled();
    });

    it('isLoading', () => {
      const { getByRole } = render(
        <EuiSuperUpdateButton isLoading onClick={noop} />
      );

      expect(getByRole('button')).toHaveTextContent('Updating');

      const icon = getByRole('progressbar');
      expect(icon).toHaveAccessibleName('Loading');
    });

    it('iconOnly', () => {
      const { getByText, container } = render(
        <EuiSuperUpdateButton iconOnly onClick={noop} />
      );

      const icon = container.querySelector('[data-euiicon-type]');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('data-euiicon-type', 'refresh');

      const text = getByText('Refresh');
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('euiScreenReaderOnly');
    });

    it('showTooltip', () => {
      const { container } = render(
        <EuiSuperUpdateButton showTooltip onClick={noop} />
      );

      const tooltipWrapper = container.querySelector('.euiToolTipAnchor');
      expect(tooltipWrapper).toBeInTheDocument();
    });

    it('children', () => {
      const { getByRole } = render(
        <EuiSuperUpdateButton onClick={noop}>
          <span data-test-subj="custom-children" />
        </EuiSuperUpdateButton>
      );

      const button = getByRole('button');
      expect(button).toHaveTextContent('');

      const customChildren = within(button).getByTestSubject('custom-children');
      expect(customChildren).toBeInTheDocument();
    });

    it('forwards props to EuiButton', () => {
      const speciallyHandledProps = {
        className: 'testClass',
        textProps: {
          className: 'textPropsTestClass',
          id: 'test',
          'data-test-subj': 'text',
        },
      };
      const extraProps: Partial<EuiButtonProps> = {
        fill: false,
        size: 's',
        contentProps: { id: 'contentSpan', 'data-test-subj': 'content' },
      };

      const { getByRole, getByTestSubject } = render(
        <EuiSuperUpdateButton
          onClick={() => {}}
          {...speciallyHandledProps}
          {...extraProps}
        />
      );

      const button = getByRole('button');
      expect(button).toHaveClass('testClass');

      const text = getByTestSubject('text');
      expect(text).toBeInTheDocument();
      expect(text).toHaveAttribute('id', 'test');
      expect(text).toHaveClass('textPropsTestClass');

      const buttonContent = within(button).getByTestSubject('content');
      expect(buttonContent).toBeInTheDocument();
    });
  });
});
