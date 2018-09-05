import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

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

import { ModalSizing } from './modal_sizing';
const modalSizingSource = require('!!raw-loader!./modal_sizing');
const modalSizingHtml = renderToHtml(ModalSizing);

export const ModalExample = {
  title: 'Modal',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: modalSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: modalHtml,
    }],
    text: (
      <p>
        Use a <EuiCode>EuiModal</EuiCode> to temporarily escape the current UX and create a
        another UX within it.
      </p>
    ),
    props: { EuiModal, EuiOverlayMask },
    demo: <Modal />,
  }, {
    title: 'Confirm Modal',
    source: [{
      type: GuideSectionTypes.JS,
      code: confirmModalSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: confirmModalHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>EuiConfirmModal</EuiCode> to ask the user to confirm a decision.
        The default type is a positive or neutral confirmation. To change the main button color
        change the the <EuiCode>buttonColor</EuiCode> property to any of the button color options.
      </p>
    ),
    props: { EuiConfirmModal },
    demo: <ConfirmModal />,
  }, {
    title: 'Overflow test',
    source: [{
      type: GuideSectionTypes.JS,
      code: overflowTestSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: overflowTestHtml,
    }],
    text: (
      <p>
        This demo is to test long overflowing body content.
      </p>
    ),
    props: { EuiConfirmModal },
    demo: <OverflowTest />,
  }, {
    title: 'Applying size limits',
    source: [{
      type: GuideSectionTypes.JS,
      code: modalSizingSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: modalSizingHtml,
    }],
    text: (
      <p>
        In circumstances where the content in <EuiCode>EuiModalBody</EuiCode> may change
        dynamically (e.g. search filtering on a table, tabbed content, etc.), you may want to set
        specific size constraints on the modal to prevent jumpiness.
      </p>
    ),
    props: { EuiConfirmModal },
    demo: <ModalSizing />,
  }],
};
