import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiConfirmModal,
  EuiText,
} from '../../../../src/components';
import Guidelines from './guidelines';

import Modal from './modal';
const modalSource = require('!!raw-loader!./modal');

import ModalForm from './modal_form';
const modalFormSource = require('!!raw-loader!./modal_form');

import ConfirmModal from './confirm_modal';
const confirmModalSource = require('!!raw-loader!./confirm_modal');

import ConfirmLoadingModal from './confirm_modal_loading';
const confirmModalLoadingSource = require('!!raw-loader!./confirm_modal_loading');

import ModalWidth from './modal_width';
const modalWidthSource = require('!!raw-loader!./modal_width');

const modalSnippet = `<EuiModal onClose={closeModal}>
  <EuiModalHeader>
    <EuiModalHeaderTitle><h1><!-- Modal title --></h1></EuiModalHeaderTitle>
  </EuiModalHeader>

  <EuiModalBody>
    <!-- Modal body -->
  </EuiModalBody>

  <EuiModalFooter>
    <EuiButton onClick={closeModal} fill>Close</EuiButton>
  </EuiModalFooter>
</EuiModal>`;

const modalWidthSnippet = `<EuiModal style={{ width: 800 }} onClose={closeModal}>
  <EuiModalHeader>
    <EuiModalHeaderTitle><h1><!-- Modal title --></h1></EuiModalHeaderTitle>
  </EuiModalHeader>

  <EuiModalBody>
    <!-- Modal body -->
  </EuiModalBody>

  <EuiModalFooter>
    <EuiButton onClick={closeModal} fill>Close</EuiButton>
  </EuiModalFooter>
</EuiModal>`;

const modalFormSnippet = `<EuiModal onClose={closeModal}>
  <EuiModalHeader>
    <EuiModalHeaderTitle><h1><!-- Modal title --></h1></EuiModalHeaderTitle>
  </EuiModalHeader>

  <EuiModalBody>
    <EuiForm id={formId} component="form"><!-- Modal body --></EuiForm>
  </EuiModalBody>

  <EuiModalFooter>
    <EuiButtonEmpty onClick={closeModal}>Cancel</EuiButtonEmpty>
    <EuiButton type="submit" form={formId} fill>Save</EuiButton>
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

const confirmModalLoadingSnippet = [
  `<EuiConfirmModal
  title={title}
  onCancel={closeModal}
  onConfirm={closeModal}
  cancelButtonText={cancelText}
  confirmButtonText={confirmText}
  confirmButtonDisabled
  isLoading>
  <!-- ConfirmModal content -->
</EuiConfirmModal>`,
];

export const ModalExample = {
  title: 'Modal',
  guidelines: <Guidelines />,
  intro: (
    <EuiText>
      <p>
        A modal works best for focusing users&apos; attention on a{' '}
        <strong>short</strong> amount of content and getting them to make a
        decision. Use it to temporarily interrupt a user’s current task and
        block interactions to the content below it.
      </p>
      <p>
        If your modal content is more complex, or requires considerable time to
        complete, consider using an{' '}
        <Link to="/layout/flyout">
          <strong>EuiFlyout</strong>
        </Link>{' '}
        instead.
      </p>
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modalSource,
        },
      ],
      text: (
        <>
          <p>
            Each <strong>EuiModal</strong> requires a specific set of nested
            child components. They can be omitted if necessary, but the order
            cannot be changed or interrupted.
          </p>
          <p>
            Modals come a wrapping <strong>EuiOverlayMask</strong> to obscure
            the content beneath, but unlike{' '}
            <Link to="/layout/flyout">flyouts</Link>, modals cannot be dismissed
            by clicking on the overlay mask. This is inline with our{' '}
            <Link to="/layout/modal/guidelines">modal usage guidelines</Link>{' '}
            which requires there to be a primary action button, even if that
            button simply closes the modal.
          </p>
        </>
      ),
      props: {
        EuiModal,
        EuiModalHeader,
        EuiModalHeaderTitle,
        EuiModalBody,
        EuiModalFooter,
      },
      snippet: modalSnippet,
      demo: <Modal />,
    },
    {
      title: 'Forms in a modal',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modalFormSource,
        },
      ],
      text: (
        <>
          <p>
            Since the child components of <strong>EuiModal</strong> are required
            to be in a specific order, you can only wrap the contents within{' '}
            <strong>EuiModalBody</strong> with the{' '}
            <EuiCode>{'<form />'}</EuiCode> element. You can then hook up your
            submit button inside <strong>EuiModalFooter</strong> by adding the{' '}
            <EuiCode>id</EuiCode> of the <EuiCode>{'<form />'}</EuiCode> element
            to the <EuiCode>form</EuiCode> prop of the button.
          </p>
        </>
      ),
      props: { EuiModal },
      snippet: modalFormSnippet,
      demo: <ModalForm />,
    },
    {
      title: 'Confirm modal',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: confirmModalSource,
        },
      ],
      text: (
        <p>
          Use the <strong>EuiConfirmModal</strong> to ask the user to confirm a
          decision. It is a contextual wrapper around <strong>EuiModal</strong>{' '}
          that provides some helpful props for filling in common modal pieces.
          By default, the button color indicates a positive or neutral action.
          Change the <EuiCode>buttonColor</EuiCode> property to{' '}
          <EuiCode>danger</EuiCode> to indicate a destructive action.
        </p>
      ),
      props: { EuiConfirmModal },
      snippet: confirmModalSnippet,
      demo: <ConfirmModal />,
    },
    {
      title: 'Loading and disabling confirm button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: confirmModalLoadingSource,
        },
      ],
      text: (
        <p>
          <strong>EuiConfirmModal</strong> supports being able to apply loading
          and disabled states to the confirm button with the{' '}
          <EuiCode>confirmButtonDisabled</EuiCode> and{' '}
          <EuiCode>isLoading</EuiCode> props respectively. This is helpful to
          indicate the fetching of data and/or to wait for a user&apos;s input
          before enabling the confirm action.
        </p>
      ),
      props: { EuiConfirmModal },
      snippet: confirmModalLoadingSnippet,
      demo: <ConfirmLoadingModal />,
    },
    {
      title: 'Widths',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: modalWidthSource,
        },
      ],
      text: (
        <>
          <p>
            Modals start with a minimum width of <EuiCode>400px</EuiCode>, just
            enough to display form rows. They will grow to fit the contents
            until it reaches the specified <EuiCode>maxWidth</EuiCode>, the
            default of which is set to the medium breakpoint.
          </p>
          <p>
            If the modal is not growing wide enough to fit your contents, you
            can pass a specific <EuiCode>style.width</EuiCode>, just remember
            that modals will always shrink to fit the window width.
          </p>
        </>
      ),
      props: { EuiModal },
      snippet: modalWidthSnippet,
      demo: <ModalWidth />,
    },
  ],
};
