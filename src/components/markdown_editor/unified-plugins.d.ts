/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
/* eslint-disable import/no-duplicates */

declare module 'remark-emoji' {
  import { Plugin } from 'unified';
  const RemarkEmoji: Plugin;
  export = RemarkEmoji;
}

declare module 'mdast-util-to-hast/lib/all' {
  // eslint-disable-next-line import/no-unresolved
  import { Node } from 'unist';
  import { H } from 'mdast-util-to-hast';

  const all: (h: H, node: Node) => Node[];
  export = all;
}
