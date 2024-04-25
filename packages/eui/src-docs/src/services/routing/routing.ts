import { createContext, useContext } from 'react';

export const ExampleContext = createContext<{ parentPath: string }>({
  parentPath: '/',
});

export const useExitPath = () => {
  const { parentPath } = useContext(ExampleContext);
  return `#${parentPath}`;
};
