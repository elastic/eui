import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiModal, EuiConfirmModal } from '../../../../src/components';
import Guidelines from './guidelines';

import Modal from './modal';
const modalSource = require('!!raw-loader!./modal');
const modalHtml = renderToHtml(Modal);

import ConfirmModal from './confirm_modal';
const confirmModalSource = require('!!raw-loader!./confirm_modal');
const confirmModalHtml = renderToHtml(ConfirmModal);

import OverflowTest from './overflow_test';
import { EuiText } from '../../../../src/components/text';
const overflowTestSource = require('!!raw-loader!./overflow_test');
const overflowTestHtml = renderToHtml(OverflowTest);

const modalSnippet = `<EuiModal onClose={closeModal}>
  <EuiModalHeader>
    <EuiModalHeaderTitle><!-- Modal title --></EuiModalHeaderTitle>
  </EuiModalHeader>

  <EuiModalBody>
    <!-- Modal body -->
  </EuiModalBody>

  <EuiModalFooter>
    <!-- Modal footer -->
  </EuiModalFooter>
</EuiModal>`;

const confirmModalSnippet = [
  `<EuiConfirmModal
  title={title}
  onCancel={closeModal}
  onConfirm={closeModal}
  cancelButtonText={cancelText}
  confirmButtonText={confirmText}>
  <!-- ConfirmModal content -->
</EuiConfirmModal>`,
  `<EuiConfirmModal
  title={title}
  onCancel={closeDestroyModal}
  onConfirm={closeDestroyModal}
  cancelButtonText={cancelText}
  confirmButtonText={confirmText}
  buttonColor="danger">
  <!-- Dangerous ConfirmModal content -->
</EuiConfirmModal>`,
];

export const ModalExample = {
  title: 'Modal',
  intro: (
    <EuiText>
      <p>
        Use a modal to temporarily interrupt a user’s current task and block
        interactions to the content below it. <strong>EuiModal</strong> comes
        with a wrapping <strong>EuiOverlayMask</strong> to obscure the content
        beneath.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Form modal',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: modalHtml,
        },
      ],
      text: (
        <>
          <p>
            Unlike <Link to="/layout/flyout">flyouts</Link>, modals cannot be
            dismissed by clicking on the overlay mask. This is inline with our{' '}
            <Link to="/layout/modal/guidelines">modal usage guidelines</Link>{' '}
            which requires there to be a primary action button, even if that
            button simply closes the modal.
          </p>
        </>
      ),
      props: { EuiModal },
      snippet: modalSnippet,
      demo: <Modal />,
    },
    {
      title: 'Confirm modal',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: confirmModalSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: confirmModalHtml,
        },
      ],
      text: (
        <p>
          Use the <strong>EuiConfirmModal</strong> to ask the user to confirm a
          decision. The default type is a positive or neutral confirmation. To
          change the main button color change the <EuiCode>buttonColor</EuiCode>{' '}
          property to any of the button color options.
        </p>
      ),
      props: { EuiConfirmModal },
      snippet: confirmModalSnippet,
      demo: <ConfirmModal />,
    },
    {
      title: 'Overflow test',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: overflowTestSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: overflowTestHtml,
        },
      ],
      text: <p>This demo is to test long overflowing body content.</p>,
      props: { EuiConfirmModal },
      demo: <OverflowTest />,
    },
  ],
  guidelines: <Guidelines />,
};
