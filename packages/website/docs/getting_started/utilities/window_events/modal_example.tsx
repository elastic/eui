import React, { useState } from 'react';

import { EuiWindowEvent, EuiButton } from '@elastic/eui';

export const ModalExample = (props) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const close = () => {
    if (open) {
      setOpen(false);
    }
  };

  const closeOnEscape = ({ key }) => {
    if (key === 'Escape') {
      close();
    }
  };

  const { modal: Modal, buttonText = 'Open Modal' } = props;
  const button = <EuiButton onClick={openModal}>{buttonText}</EuiButton>;

  return (
    <div>
      <EuiWindowEvent event="keydown" handler={closeOnEscape} />
      {open ? <Modal onClose={close} /> : button}
    </div>
  );
};
