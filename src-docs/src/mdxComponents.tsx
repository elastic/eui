import type { MDXProvider } from '@mdx-js/react';
import type { ComponentProps } from 'react';
import { EuiTitle } from '../../src';
import React from 'react';

export const mdxComponents: ComponentProps<typeof MDXProvider>['components'] = {
  h1: ({children}) => (
    <EuiTitle size="l">
      <h1>{children}</h1>
    </EuiTitle>
  ),
};
