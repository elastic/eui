import { JSX } from 'react';
import OriginalWarning from '@theme-init/Admonition/Type/Warning';
import type WarningType from '@theme-init/Admonition/Type/Warning';
import type { WrapperProps } from '@docusaurus/types';
import { CallOut } from '../../../components/call_out';

type Props = WrapperProps<typeof WarningType>;

const Warning = (props: Props): JSX.Element => {
  return (
    <CallOut variant="warning">
      <OriginalWarning {...props} />
    </CallOut>
  );
};

export default Warning;
