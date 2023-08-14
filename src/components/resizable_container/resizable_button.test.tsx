/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { render, fireEvent } from '@testing-library/react';
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

  describe('disabled', () => {
    it('renders as disabled if the disabled prop is passed', () => {
      const { container } = render(<EuiResizableButton disabled />, {
        wrapper,
      });

      expect(container.firstChild).toBeDisabled();
    });

    it('renders as disabled if the resizerId is disabled in context', () => {
      const { container } = render(
        <EuiResizableContainerContextProvider
          registry={
            {
              panels: {},
              resizers: {
                'resizable-button_generated-id': { isDisabled: true },
              },
            } as unknown as EuiResizableContainerRegistry // Skipping correct obj types for the sake of the test
          }
        >
          <EuiResizableButton />
        </EuiResizableContainerContextProvider>
      );

      expect(container.firstChild).toBeDisabled();
    });
  });

  describe('focus', () => {
    it('focuses the button on click', () => {
      const { container } = render(<EuiResizableButton />, {
        wrapper,
      });
      fireEvent.click(container.firstChild!);

      expect(container.firstChild).toBe(document.activeElement);
    });

    it('calls the onFocus prop', () => {
      const onFocus = jest.fn();
      const { container } = render(<EuiResizableButton onFocus={onFocus} />, {
        wrapper,
      });
      fireEvent.focus(container.firstChild!);

      expect(onFocus).toHaveBeenCalledWith('resizable-button_generated-id');
    });
  });
});
