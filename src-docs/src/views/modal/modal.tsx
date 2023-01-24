import React, { useState } from 'react';

import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiCodeBlock,
} from '../../../../src/components';
import { EuiSpacer } from '../../../../src/components/spacer';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  let modal;

  if (isModalVisible) {
    modal = (
      <EuiModal onClose={closeModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>Modal title</EuiModalHeaderTitle>
        </EuiModalHeader>

        <EuiModalBody>
          This modal has the following setup:
          <EuiSpacer />
          <EuiCodeBlock language="html" isCopyable>
            {`<EuiModal onClose={closeModal}>
  <EuiModalHeader>
    <EuiModalHeaderTitle><!-- Modal title --></EuiModalHeaderTitle>
  </EuiModalHeader>

  <EuiModalBody>
    <!-- Modal body -->
  </EuiModalBody>

  <EuiModalFooter>
    <EuiButton onClick={closeModal} fill>
      Close
    </EuiButton>
  </EuiModalFooter>
</EuiModal>`}
          </EuiCodeBlock>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={closeModal} fill>
            Close
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }

  return (
    <div>
      <EuiButton onClick={showModal}>Show modal</EuiButton>
      {modal}
    </div>
  );
};
