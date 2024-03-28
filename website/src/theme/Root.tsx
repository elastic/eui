import { EuiProvider } from '@elastic/eui';
import { Props } from '@theme/Root';

// Wrap docusaurus root component with <EuiProvider>
// See https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
const Root = ({ children }: Props) => (
  <EuiProvider globalStyles={false}>
    {children}
  </EuiProvider>
);

export default Root;
