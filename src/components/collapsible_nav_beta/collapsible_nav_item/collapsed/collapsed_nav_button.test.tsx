/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, waitForEuiToolTipVisible } from '../../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../../test/internal';
import { requiredProps } from '../../../../test';

import { EuiCollapsedNavButton } from './collapsed_nav_button';

describe('EuiCollapsedNavButton', () => {
  shouldRenderCustomStyles(<EuiCollapsedNavButton title="title" />, {
    childProps: ['linkProps'],
  });

  it('renders a tooltip around the icon button', async () => {
    const { baseElement, getByTestSubject } = render(
      <EuiCollapsedNavButton {...requiredProps} title="Nav item" />
    );
    fireEvent.mouseOver(getByTestSubject('euiCollapsedNavButton'));
    await waitForEuiToolTipVisible();

    expect(baseElement).toMatchSnapshot();
  });

  it('renders isSelected', async () => {
    const { container } = render(
      <EuiCollapsedNavButton title="Nav item" href="#" isSelected={true} />
    );
    expect(container).toMatchSnapshot();
  });
});
