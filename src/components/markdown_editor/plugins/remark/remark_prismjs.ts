/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import refractor from 'refractor';
import visit from 'unist-util-visit';
import { Plugin } from 'unified';

const attacher: Plugin = () => {
  return (ast) => visit(ast, 'code', visitor);

  function visitor(node: any) {
    const { data = {}, lang: language } = node;

    if (!language) {
      return;
    }

    node.data = data;
    data.hChildren = refractor.highlight(node.value, language);
    data.hProperties = {
      ...data.hProperties,
      language,
      className: [
        'prismjs',
        ...(data.hProperties?.className || []),
        `language-${language}`,
      ],
    };
  }
};

export default attacher;
