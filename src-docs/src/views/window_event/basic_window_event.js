import React from 'react';

import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
} from '../../../../src/components';

import { ModalExample } from './modal_example_container';

const BasicModal = ({ onClose }) => (
  <EuiOverlayMask>
    <EuiModal onClose={onClose} style={{ width: '800px' }}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Example modal</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        <p>
          This modal closes when you press ESC, using a window event listener.
        </p>
      </EuiModalBody>
    </EuiModal>
  </EuiOverlayMask>
);

export const BasicWindowEvent = () => <ModalExample modal={BasicModal} />;
