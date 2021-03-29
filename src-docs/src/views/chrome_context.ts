import { createContext } from 'react';

interface ChromeContextInterface {
  setIsChromeHidden(isChromeHidden: boolean): void;
}

export const ChromeContext = createContext<ChromeContextInterface>({
  setIsChromeHidden: () => undefined,
});
