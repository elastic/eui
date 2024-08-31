import { createContext, useContext } from 'react';
import { DemoSourceMeta } from './demo';

export interface DemoContextObject {
  /**
   * Array of all available sources for this demo instance
   */
  sources: DemoSourceMeta[];

  /**
   * Add source to the list of available sources
   * This should only be used internally when initializing the component!
   */
  addSource(source: DemoSourceMeta): void;
}

export const DemoContext = createContext<DemoContextObject>({
  sources: [],
  addSource: () => {},
});

export const useDemoContext = () => useContext(DemoContext);
