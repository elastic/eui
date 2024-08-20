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
