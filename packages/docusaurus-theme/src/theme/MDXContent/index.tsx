/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { JSX } from 'react';
import OriginalMDXContent from '@theme-init/MDXContent';
import type MDXContentType from '@theme-init/MDXContent';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof MDXContentType>;

const MDXContent = (props: Props): JSX.Element => (
  <div data-search-children={true}>
    <OriginalMDXContent {...props} />
  </div>
);

export default MDXContent;
