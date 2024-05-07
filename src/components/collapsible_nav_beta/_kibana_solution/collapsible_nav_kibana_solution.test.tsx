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
  waitForEuiPopoverOpen,
  waitForEuiPopoverClose,
} from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test';

import { EuiCollapsibleNavContext } from '../context';
import { KibanaCollapsibleNavSolution } from './collapsible_nav_kibana_solution';

describe('KibanaCollapsibleNavSolution', () => {
  const sharedProps = {
    title: 'Some solution',
    icon: 'logoElastic',
    solutions: [
      { title: 'Some other solution', 'data-test-subj': 'test-solution' },
      { title: 'Some other popover content', isSecondary: true },
    ],
    items: [{ title: 'Some navigation link' }],
  };

  shouldRenderCustomStyles(<KibanaCollapsibleNavSolution {...sharedProps} />);

  it('renders with a solution switcher', async () => {
    const { container, getByTestSubject, getByRole } = render(
      <KibanaCollapsibleNavSolution {...sharedProps} {...requiredProps} />
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByTestSubject('kibanaSolutionSwitcher'));
    await waitForEuiPopoverOpen();
    expect(getByTestSubject('kibanaSolutionSwitcherList')).toBeInTheDocument();
    expect(getByTestSubject('test-solution')).toBeInTheDocument();

    expect(getByRole('dialog')).toMatchSnapshot('popover');
  });

  it('renders docked icons', async () => {
    const { container, getByLabelText, getByText, getByRole } = render(
      <EuiCollapsibleNavContext.Provider
        value={{
          isCollapsed: true,
          isPush: true,
          isOverlayOpen: false,
          side: 'left',
        }}
      >
        <KibanaCollapsibleNavSolution {...sharedProps} />
      </EuiCollapsibleNavContext.Provider>
    );
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByLabelText('"Solution view" quick navigation menu'));
    await waitForEuiPopoverOpen();
    expect(getByText('Some other solution')).toBeInTheDocument();

    expect(getByRole('dialog')).toMatchSnapshot('popover');
  });

  describe('closeSolutionPopover', () => {
    const onClickProps = {
      ...sharedProps,
      solutions: [
        {
          title: 'Solution A',
          href: '#',
        },
        {
          title: 'Solution B',
          icon: 'logoKibana',
          onClick: () => {},
        },
        {
          title: 'Stops propagation',
          onClick: (event: React.MouseEvent) => event.stopPropagation(),
        },
        {
          title: 'Non-interactive item',
          isSecondary: true,
        },
      ],
    };

    it('automatically closes the popover if an interactive item was clicked', async () => {
      const { getByTestSubject, getByText } = render(
        <KibanaCollapsibleNavSolution {...onClickProps} />
      );
      fireEvent.click(getByTestSubject('kibanaSolutionSwitcher'));
      await waitForEuiPopoverOpen();

      fireEvent.click(getByText('Solution A'));
      await waitForEuiPopoverClose();
    });

    it('closes the popover even if a sub-DOM-node of a link/button was clicked', async () => {
      const { getByTestSubject } = render(
        <KibanaCollapsibleNavSolution {...onClickProps} />
      );
      fireEvent.click(getByTestSubject('kibanaSolutionSwitcher'));
      await waitForEuiPopoverOpen();

      fireEvent.click(document.querySelector('.euiListGroupItem__icon')!);
      await waitForEuiPopoverClose();
    });

    it('does not close the popover if propagation was stopped', async () => {
      const { getByTestSubject, getByText } = render(
        <KibanaCollapsibleNavSolution {...onClickProps} />
      );
      fireEvent.click(getByTestSubject('kibanaSolutionSwitcher'));
      await waitForEuiPopoverOpen();

      fireEvent.click(getByText('Stops propagation'));
      await waitForEuiPopoverOpen();
    });

    it('does not close the popover if a non-interactive item was clicked', async () => {
      const { getByTestSubject, getByText } = render(
        <KibanaCollapsibleNavSolution {...onClickProps} />
      );
      fireEvent.click(getByTestSubject('kibanaSolutionSwitcher'));
      await waitForEuiPopoverOpen();

      fireEvent.click(getByText('Non-interactive item'));
      await waitForEuiPopoverOpen();
    });
  });
});
