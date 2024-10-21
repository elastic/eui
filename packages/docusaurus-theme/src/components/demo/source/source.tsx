/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { PropsWithChildren, useEffect } from 'react';
import { useDemoContext } from '../context';
import { getSourceFromChildren } from './get_source_from_children';

export interface DemoSourceProps extends PropsWithChildren {
  filename?: string;
  isActive?: boolean;
}

export const DemoSource = ({ children, filename, isActive = false }: DemoSourceProps) => {
  const demoContext = useDemoContext();

  useEffect(() => {
    const source = getSourceFromChildren(children);

    if (source) {
      const transformedSource = source.replace(/\n$/, '');

      demoContext.addSource({
        code: transformedSource,
        isActive,
        filename,
      });
    }
  }, [children]);

  return null;
}
