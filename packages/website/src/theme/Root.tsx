import { createContext, useContext } from 'react';
import { EuiProvider } from '@elastic/eui';
import { Props } from '@theme/Root';

const c = createContext({});

// Wrap docusaurus root component with <EuiProvider>
// See https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
const Root = ({ children }: Props) => {
  const a = useContext(c);

  return (
    <EuiProvider globalStyles={false}>
      {children}
    </EuiProvider>
  );
}

export default Root;
