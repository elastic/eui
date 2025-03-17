import { JSX } from 'react';
import OriginalInfo from '@theme-init/Admonition/Type/Info';
import type InfoType from '@theme-init/Admonition/Type/Info';
import type { WrapperProps } from '@docusaurus/types';
import { CallOut } from '../../../components/call_out';
type Props = WrapperProps<typeof InfoType>;

const Note = (props: Props): JSX.Element => {
  return (
    <CallOut variant="info">
      <OriginalInfo {...props} />
    </CallOut>
  );
};

export default Note;
