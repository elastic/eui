/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import OriginalMDXComponents from '@theme-init/MDXComponents';
import { Badge } from '../../components/badge';
import { Icon } from '../../components/icon';
import { FigmaEmbed } from '../../components/figma_embed';
import { Demo, DemoSource } from '../../components/demo';

const MDXComponents = {
  ...OriginalMDXComponents,
  Badge,
  FigmaEmbed,
  Icon,
  Demo,
  DemoSource,
};

export default MDXComponents;
