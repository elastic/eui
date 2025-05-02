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
import { PropTable } from '../../components/prop_table';
import { ListItem } from './ListItem';
import { Blockquote } from './Blockquote';
import { Paragraph } from './Paragraph';
import { UnorderedList } from './UnorderedList';
import { OrderedList } from './OrderedList';
import { Guideline, GuidelineText } from '../../components';

const MDXComponents = {
  ...OriginalMDXComponents,
  // Base content components
  p: Paragraph,
  li: ListItem,
  ul: UnorderedList,
  ol: OrderedList,
  blockquote: Blockquote,

  // Custom components
  Badge,
  FigmaEmbed,
  Icon,
  Demo,
  DemoSource,
  PropTable,
  Guideline,
  GuidelineText,
};

export default MDXComponents;
