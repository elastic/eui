import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiModal,
  EuiConfirmModal,
  EuiOverlayMask,
} from '../../../../src/components';

import { Modal } from './modal';
const modalSource = require('!!raw-loader!./modal');
const modalHtml = renderToHtml(Modal);

import { ConfirmModal } from './confirm_modal';
const confirmModalSource = require('!!raw-loader!./confirm_modal');
const confirmModalHtml = renderToHtml(ConfirmModal);

import { OverflowTest } from './overflow_test';
const overflowTestSource = require('!!raw-loader!./overflow_test');
const overflowTestHtml = renderToHtml(OverflowTest);

const modalSnippet = `<EuiModal onClose={this.closeModal}>
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
  title="Modal title goes here"
  onCancel={this.closeModal}
  onConfirm={this.closeModal}
  cancelButtonText={cancelText}
  confirmButtonText={confirmText}
  defaultFocusedButton="confirm">
  <!-- ConfirmModal content -->
</EuiConfirmModal>`,
  `<EuiConfirmModal
  title="Do this destructive thing"
  onCancel={this.closeDestroyModal}
  onConfirm={this.closeDestroyModal}
  cancelButtonText={cancelText}
  confirmButtonText={confirmText}
  buttonColor="danger"
  defaultFocusedButton="confirm">
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
          Use a <EuiCode>EuiModal</EuiCode> to temporarily escape the current UX
          and create another UX within it.
        </p>
      ),
      props: { EuiModal, EuiOverlayMask },
      snippet: modalSnippet,
      demo: <Modal />,
    },
    {
      title: 'Confirm Modal',
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
          Use the <EuiCode>EuiConfirmModal</EuiCode> to ask the user to confirm
          a decision. The default type is a positive or neutral confirmation. To
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
