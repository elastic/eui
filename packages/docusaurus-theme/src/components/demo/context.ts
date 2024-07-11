import { createContext, useContext } from 'react';
import { DemoSourceMeta } from './demo';

export interface DemoContextObject {
  sources: DemoSourceMeta[];
  addSource(source: DemoSourceMeta): void;
}

export const DemoContext = createContext<DemoContextObject>({
  sources: [],
  addSource: () => {},
});

export const useDemoContext = () => useContext(DemoContext);
