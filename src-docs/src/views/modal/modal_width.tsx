import React, { useState } from 'react';

import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiCodeBlock,
  EuiSpacer,
  useGeneratedHtmlId,
} from '../../../../src';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const modalTitle = useGeneratedHtmlId();

  return (
    <>
      <EuiButton onClick={showModal}>Show modal with custom width</EuiButton>

      {isModalVisible && (
        <EuiModal
          aria-labelledby={modalTitle}
          style={{ width: 800 }}
          onClose={closeModal}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitle}>
              Modal title
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            This modal has the following setup:
            <EuiSpacer />
            <EuiCodeBlock language="html" isCopyable>
              {`<EuiModal aria-labelledby={titleId} style={{ width: 800 }} onClose={closeModal}>
  <EuiModalHeader>
    <EuiModalHeaderTitle id={titleId}><!-- Modal title --></EuiModalHeaderTitle>
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
      )}
    </>
  );
};
