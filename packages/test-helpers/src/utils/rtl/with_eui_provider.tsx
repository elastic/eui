/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { type ReactElement } from 'react';
import type { render as originalRender, RenderOptions } from '@testing-library/react';
import { EuiProvider } from '@elastic/eui';

/**
 * react-testing-library's `render` function decorator that configures
 * it to use `EuiProvider` as the wrapper.
 *
 * @example
 * ```tsx
 * // Tip: import jest-dom utils globally
 * import '@testing-library/jest-dom';
 * import { render as originalRender } from '@testing-library/react';
 * import { EuiButton } from '@elastic/eui';
 *
 * const myRender = withEuiProvider(originalRender);
 *
 * it('renders my button', () => {
 *   const { getByRole } = myRender(<EuiButton>Hello, World!</EuiButton>);
 *   expect(getByRole('button')).toHaveTextContent('Hello, World!');
 * });
 * ```
 */
export const withEuiProvider = (render: typeof originalRender) => (
  ui: ReactElement,
  {
    wrapper: OriginalWrapper,
    ...options
  }: RenderOptions = {},
) => {
  let wrapper: RenderOptions['wrapper'] = EuiProvider;

  // Combine wrappers if `options.wrapper` is defined
  if (OriginalWrapper) {
    wrapper = (...props: any) => <EuiProvider>
      <OriginalWrapper {...props} />
    </EuiProvider>;
  }

  return render(ui, {
    ...options,
    wrapper,
  });
};
