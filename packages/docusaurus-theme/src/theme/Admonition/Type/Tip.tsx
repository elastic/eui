import { JSX } from 'react';
import OriginalTip from '@theme-init/Admonition/Type/Tip';
import type TipType from '@theme-init/Admonition/Type/Tip';
import type { WrapperProps } from '@docusaurus/types';
import { CallOut } from '../../../components/call_out';

type Props = WrapperProps<typeof TipType>;

const Tip = (props: Props): JSX.Element => {
  return (
    <CallOut variant="tip">
      <OriginalTip {...props} />
    </CallOut>
  );
};

export default Tip;
