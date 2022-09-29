// eslint-disable-next-line import/no-unresolved
import type { MDXComponents } from 'mdx/types';
import { EuiTitle } from '../../src';
import React from 'react';

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <EuiTitle size="l">
      <h1>{children}</h1>
    </EuiTitle>
  ),
};
