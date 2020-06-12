import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiModal,
  EuiConfirmModal,
  EuiOverlayMask,
} from '../../../../src/components';

import Modal from './modal';
const modalSource = require('!!raw-loader!./modal');
const modalHtml = renderToHtml(Modal);

import ConfirmModal from './confirm_modal';
const confirmModalSource = require('!!raw-loader!./confirm_modal');
const confirmModalHtml = renderToHtml(ConfirmModal);

import OverflowTest from './overflow_test';
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
  sections: [
    {
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
        <p>
          Use a modal to temporarily interrupt a user’s current task and block
          interactions to the content below it. Be sure to read the full{' '}
          <Link to="/guidelines/modals">modal usage guidelines</Link>.
        </p>
      ),
      props: { EuiModal, EuiOverlayMask },
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
};
