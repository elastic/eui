import { JSX } from 'react';
import OriginalNote from '@theme-init/Admonition/Type/Note';
import type NoteType from '@theme-init/Admonition/Type/Note';
import type { WrapperProps } from '@docusaurus/types';
import { CallOut } from '../../../components/call_out';

type Props = WrapperProps<typeof NoteType>;

const Note = (props: Props): JSX.Element => {
  return (
    <CallOut variant="note">
      <OriginalNote {...props} />
    </CallOut>
  );
};

export default Note;
