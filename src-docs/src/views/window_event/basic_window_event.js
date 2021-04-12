import React from 'react';

import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from '../../../../src/components';

import { ModalExample } from './modal_example_container';

const BasicModal = ({ onClose }) => (
  <EuiModal onClose={onClose} style={{ width: '800px' }}>
    <EuiModalHeader>
      <EuiModalHeaderTitle>
        <h1>Example modal</h1>
      </EuiModalHeaderTitle>
    </EuiModalHeader>
    <EuiModalBody>
      <p>
        This modal closes when you press ESC, using a window event listener.
      </p>
    </EuiModalBody>
  </EuiModal>
);

export const BasicWindowEvent = () => <ModalExample modal={BasicModal} />;
