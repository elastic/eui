import { JSX } from 'react';
import OriginalDanger from '@theme-init/Admonition/Type/Danger';
import type WarningType from '@theme-init/Admonition/Type/Danger';
import type { WrapperProps } from '@docusaurus/types';
import { CallOut } from '../../../components/call_out';
type Props = WrapperProps<typeof WarningType>;

const Danger = (props: Props): JSX.Element => {
  return (
    <CallOut variant="danger">
      <OriginalDanger {...props} />
    </CallOut>
  );
};

export default Danger;
