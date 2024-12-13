/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { JSX } from 'react';
import Heading, { Props as HeadingProps } from '@theme/Heading';

const MDXHeading = (props: HeadingProps): JSX.Element => (
  <Heading {...props} />
);

export default MDXHeading;
