import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import { Modal } from './modal';
const modalSource = require('!!raw-loader!./modal');
const modalHtml = renderToHtml(Modal);

import { ConfirmModal } from './confirm_modal';
const confirmModalSource = require('!!raw-loader!./confirm_modal');
const confirmModalHtml = renderToHtml(ConfirmModal);

export const ModalExample = {
  title: 'Modal',
  sections: [{
    title: 'Modal',
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
    demo: <Modal />,
  }, {
    title: 'ConfirmModal',
    source: [{
      type: GuideSectionTypes.JS,
      code: confirmModalSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: confirmModalHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>EuiConfirmModal</EuiCode> to ask the user to confirm a decision,
        typically one which is destructive and potentially regrettable.
      </p>
    ),
    demo: <ConfirmModal />,
  }],
};
