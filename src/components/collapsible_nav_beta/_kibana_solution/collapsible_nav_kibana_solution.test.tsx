/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, waitForEuiPopoverOpen } from '../../../test/rtl';
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

    fireEvent.click(getByLabelText('Solution view'));
    await waitForEuiPopoverOpen();
    expect(getByText('Some other solution')).toBeInTheDocument();

    expect(getByRole('dialog')).toMatchSnapshot('popover');
  });
});
