/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiResizableContainerContextProvider } from './context';
import { EuiResizableContainerRegistry } from './types';

import { EuiResizableButton } from './resizable_button';

describe('EuiResizableButton', () => {
  // Context setup
  const mockRegistry = { panels: {}, resizers: {} };
  const wrapper: FunctionComponent<
    PropsWithChildren & { registry?: EuiResizableContainerRegistry }
  > = ({ children, registry = mockRegistry }) => (
    <EuiResizableContainerContextProvider registry={registry}>
      {children}
    </EuiResizableContainerContextProvider>
  );

  shouldRenderCustomStyles(<EuiResizableButton />, { wrapper });

  it('renders', () => {
    const { container } = render(<EuiResizableButton {...requiredProps} />, {
      wrapper,
    });

    expect(container).toMatchSnapshot();
  });
});
