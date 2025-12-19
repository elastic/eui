/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';

import {
  render,
  waitForEuiToolTipHidden,
  waitForEuiToolTipVisible,
} from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { EuiToolTip } from '../../tool_tip';
import { EuiSplitButton, EuiSplitButtonProps } from './split_button';

const defaultPrimaryActionProps = {
  children: 'Primary Action',
  'data-test-subj': 'primary-action',
};

const defaultSecondaryActionProps = {
  iconType: 'arrowDown',
  'aria-label': 'Secondary action',
  'data-test-subj': 'secondary-action',
};

const defaultProps: EuiSplitButtonProps = {
  children: [
    <EuiSplitButton.ActionPrimary {...defaultPrimaryActionProps} />,
    <EuiSplitButton.ActionSecondary {...defaultSecondaryActionProps} />,
  ],
};

describe('EuiSplitButton', () => {
  shouldRenderCustomStyles(<EuiSplitButton {...defaultProps} />);

  it('renders', () => {
    const { container } = render(<EuiSplitButton {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      it('renders', () => {
        const { getByTestSubject } = render(
          <EuiSplitButton {...defaultProps} color="success" />
        );

        const primaryAction = getByTestSubject('primary-action');
        const secondaryAction = getByTestSubject('secondary-action');

        expect(Array.from(primaryAction.classList).join(' ')).toContain(
          'success'
        );
        expect(Array.from(secondaryAction.classList).join(' ')).toContain(
          'success'
        );
      });

      it('overrides child props', () => {
        const { getByTestSubject } = render(
          <EuiSplitButton color="success">
            <EuiSplitButton.ActionPrimary
              {...defaultPrimaryActionProps}
              color="danger"
            />
            <EuiSplitButton.ActionSecondary
              {...defaultSecondaryActionProps}
              color="danger"
            />
          </EuiSplitButton>
        );

        const primaryAction = getByTestSubject('primary-action');
        const secondaryAction = getByTestSubject('secondary-action');

        expect(Array.from(primaryAction.classList).join(' ')).toContain(
          'success'
        );
        expect(Array.from(primaryAction.classList).join(' ')).not.toContain(
          'danger'
        );
        expect(Array.from(secondaryAction.classList).join(' ')).toContain(
          'success'
        );
        expect(Array.from(secondaryAction.classList).join(' ')).not.toContain(
          'danger'
        );
      });
    });

    describe('fill', () => {
      it('renders', () => {
        const { getByTestSubject } = render(
          <EuiSplitButton {...defaultProps} fill />
        );

        const primaryAction = getByTestSubject('primary-action');
        const secondaryAction = getByTestSubject('secondary-action');

        expect(Array.from(primaryAction.classList).join(' ')).toContain('fill');
        expect(Array.from(secondaryAction.classList).join(' ')).toContain(
          'fill'
        );
      });

      it('overrides child props', () => {
        const { getByTestSubject } = render(
          <EuiSplitButton fill>
            <EuiSplitButton.ActionPrimary {...defaultPrimaryActionProps} />
            <EuiSplitButton.ActionSecondary {...defaultSecondaryActionProps} />
          </EuiSplitButton>
        );

        const primaryAction = getByTestSubject('primary-action');

        expect(Array.from(primaryAction.classList).join(' ')).toContain('fill');
      });
    });

    describe('size', () => {
      it('renders', () => {
        const { getByTestSubject } = render(
          <EuiSplitButton {...defaultProps} size="s" />
        );

        const primaryAction = getByTestSubject('primary-action');
        const secondaryAction = getByTestSubject('secondary-action');

        expect(Array.from(primaryAction.classList).join(' ')).toContain('-s-');
        expect(Array.from(secondaryAction.classList).join(' ')).toContain(
          '-s-'
        );
      });

      it('overrides child props', () => {
        const { getByTestSubject } = render(
          <EuiSplitButton size="s">
            <EuiSplitButton.ActionPrimary
              {...defaultPrimaryActionProps}
              size="m"
            />
            <EuiSplitButton.ActionSecondary
              {...defaultSecondaryActionProps}
              size="m"
            />
          </EuiSplitButton>
        );

        const primaryAction = getByTestSubject('primary-action');
        const secondaryAction = getByTestSubject('secondary-action');

        expect(Array.from(primaryAction.classList).join(' ')).toContain('-s-');
        expect(Array.from(primaryAction.classList).join(' ')).not.toContain(
          '-m-'
        );
        expect(Array.from(secondaryAction.classList).join(' ')).toContain(
          '-s-'
        );
        expect(Array.from(secondaryAction.classList).join(' ')).not.toContain(
          '-m-'
        );
      });
    });

    describe('isDisabled', () => {
      it('renders', () => {
        const { getByTestSubject } = render(
          <EuiSplitButton {...defaultProps} isDisabled />
        );

        const primaryAction = getByTestSubject('primary-action');
        const secondaryAction = getByTestSubject('secondary-action');

        expect(primaryAction).toBeDisabled();
        expect(secondaryAction).toBeDisabled();
      });

      it('child props apply correctly', () => {
        const { getByTestSubject } = render(
          <EuiSplitButton isDisabled={false}>
            <EuiSplitButton.ActionPrimary
              {...defaultPrimaryActionProps}
              isDisabled
            />
            <EuiSplitButton.ActionSecondary
              {...defaultSecondaryActionProps}
              isDisabled
            />
          </EuiSplitButton>
        );

        const primaryAction = getByTestSubject('primary-action');
        const secondaryAction = getByTestSubject('secondary-action');

        expect(primaryAction).toBeDisabled();
        expect(secondaryAction).toBeDisabled();
      });
    });

    describe('isLoading', () => {
      it('renders', () => {
        const { getByTestSubject } = render(
          <EuiSplitButton {...defaultProps} isLoading />
        );

        const primaryAction = getByTestSubject('primary-action');
        const secondaryAction = getByTestSubject('secondary-action');

        expect(primaryAction).toBeDisabled();
        expect(secondaryAction).toBeDisabled();

        const primarySpinner =
          primaryAction.querySelector('.euiLoadingSpinner');
        const secondarySpinner =
          secondaryAction.querySelector('.euiLoadingSpinner');

        expect(primarySpinner).toBeInTheDocument();
        expect(secondarySpinner).toBeInTheDocument();
      });

      it('child props apply correctly', () => {
        const { getByTestSubject } = render(
          <EuiSplitButton isLoading={false}>
            <EuiSplitButton.ActionPrimary
              {...defaultPrimaryActionProps}
              isLoading
            />
            <EuiSplitButton.ActionSecondary
              {...defaultSecondaryActionProps}
              isLoading
            />
          </EuiSplitButton>
        );

        const primaryAction = getByTestSubject('primary-action');
        const secondaryAction = getByTestSubject('secondary-action');

        expect(primaryAction).toBeEuiDisabled();
        expect(secondaryAction).toBeEuiDisabled();

        const primarySpinner =
          primaryAction.querySelector('.euiLoadingSpinner');
        const secondarySpinner =
          secondaryAction.querySelector('.euiLoadingSpinner');

        expect(primarySpinner).toBeInTheDocument();
        expect(secondarySpinner).toBeInTheDocument();
      });
    });

    describe('children', () => {
      it('logs an error when invalid `children` are passed', () => {
        const consoleErrorSpy = jest
          .spyOn(console, 'warn')
          .mockImplementation(() => {});

        render(
          <EuiSplitButton>
            <EuiToolTip content="tooltip content">
              <EuiSplitButton.ActionPrimary
                {...defaultPrimaryActionProps}
                tooltipProps={{
                  content: 'Primary action tooltip',
                  'data-test-subj': 'primary-action-tooltip',
                }}
              />
            </EuiToolTip>
            <EuiToolTip content="tooltip content">
              <EuiSplitButton.ActionSecondary
                {...defaultSecondaryActionProps}
              />
            </EuiToolTip>
          </EuiSplitButton>
        );

        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            '⚠️ EuiSplitButton: Expected <EuiSplitButton.ActionPrimary> at position 1, got <EuiToolTip>'
          )
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            '⚠️ EuiSplitButton: Expected <EuiSplitButton.ActionSecondary> at position 2, got <EuiToolTip>'
          )
        );

        consoleErrorSpy.mockRestore();
      });

      it('renders a tooltip', async () => {
        const { getByTestSubject } = render(
          <EuiSplitButton size="s">
            <EuiSplitButton.ActionPrimary
              {...defaultPrimaryActionProps}
              tooltipProps={{
                content: 'Primary action tooltip',
                'data-test-subj': 'primary-action-tooltip',
              }}
            />
            <EuiSplitButton.ActionSecondary
              {...defaultSecondaryActionProps}
              tooltipProps={{
                content: 'Secondary action tooltip',
                'data-test-subj': 'secondary-action-tooltip',
              }}
            />
          </EuiSplitButton>
        );

        fireEvent.mouseOver(getByTestSubject('primary-action'));
        await waitForEuiToolTipVisible();

        expect(getByTestSubject('primary-action-tooltip')).toBeInTheDocument();

        fireEvent.mouseLeave(getByTestSubject('primary-action'));
        await waitForEuiToolTipHidden();

        fireEvent.mouseOver(getByTestSubject('secondary-action'));
        await waitForEuiToolTipVisible();

        expect(
          getByTestSubject('secondary-action-tooltip')
        ).toBeInTheDocument();
      });

      it('renders a popover', () => {
        const closePopover = jest.fn();
        const { getByTestSubject } = render(
          <EuiSplitButton size="s">
            <EuiSplitButton.ActionPrimary {...defaultPrimaryActionProps} />
            <EuiSplitButton.ActionSecondary
              {...defaultSecondaryActionProps}
              popoverProps={{
                children: 'Secondary action popover',
                'data-test-subj': 'secondary-action-popover',
                closePopover,
              }}
            />
          </EuiSplitButton>
        );

        expect(
          getByTestSubject('secondary-action-popover')
        ).toBeInTheDocument();
      });
    });
  });
});
