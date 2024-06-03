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

  const modalTitleId = useGeneratedHtmlId();

  return (
    <>
      <EuiButton onClick={showModal}>Show modal</EuiButton>

      {isModalVisible && (
        <EuiModal aria-labelledby={modalTitleId} onClose={closeModal}>
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}>
              Modal title
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            This modal has the following setup:
            <EuiSpacer />
            <EuiCodeBlock language="html" isCopyable>
              {`<EuiModal aria-labelledby={titleId} onClose={closeModal}>
  <EuiModalHeader>
    <EuiModalHeaderTitle title={titleId}><!-- Modal title --></EuiModalHeaderTitle>
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
