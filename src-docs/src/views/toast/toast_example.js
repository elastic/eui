import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiButton,
  EuiCode,
  EuiToast,
  EuiGlobalToastList,
  EuiGlobalToastListItem,
} from '../../../../src/components';

import ToastList, { addToast } from './toast_list';
const toastListSource = require('!!raw-loader!./toast_list');
const toastListHtml = renderToHtml(ToastList);

import Default from './default';
const defaultSource = require('!!raw-loader!./default');
const defaultHtml = renderToHtml(Default);

import Info from './info';
const infoSource = require('!!raw-loader!./info');
const infoHtml = renderToHtml(Info);

import Success from './success';
const successSource = require('!!raw-loader!./success');
const successHtml = renderToHtml(Success);

import Warning from './warning';
const warningSource = require('!!raw-loader!./warning');
const warningHtml = renderToHtml(Warning);

import Danger from './danger';
const dangerSource = require('!!raw-loader!./danger');
const dangerHtml = renderToHtml(Danger);

export const ToastExample = {
  title: 'Toast',
  sections: [
    {
      title: 'ToastList',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toastListSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: toastListHtml,
        },
      ],
      props: {
        EuiToast,
        EuiGlobalToastList,
        EuiGlobalToastListItem,
      },
      demo: (
        <div style={{ maxWidth: 320 }}>
          <EuiButton onClick={addToast}>
            Add toast to global toast list
          </EuiButton>

          <ToastList />
        </div>
      ),
    },
    {
      title: 'Default',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: defaultSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: defaultHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiToast</EuiCode> allows for small notes that appear in
            the bottom right of the screen. They should be used for ephemeral,
            live actions (think <strong>save complete</strong> or{' '}
            <strong>something just finished right now</strong>).
          </p>
          <p>
            They should not be used for historical actions (
            <strong>your report built 30 minutes ago</strong>). This means that
            a user should never be greeted with toasts when starting a session.
            Toasts should be brief and avoid long paragraphs of text or titling.
          </p>
        </div>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Default />
        </div>
      ),
    },
    {
      title: 'Info',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: infoSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: infoHtml,
        },
      ],
      text: (
        <p>
          Setting <EuiCode>type=&quot;info&quot;</EuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Info />
        </div>
      ),
    },
    {
      title: 'Success',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: successSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: successHtml,
        },
      ],
      text: (
        <p>
          Setting <EuiCode>type=&quot;success&quot;</EuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Success />
        </div>
      ),
    },
    {
      title: 'Warning',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: warningSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: warningHtml,
        },
      ],
      text: (
        <p>
          Setting <EuiCode>type=&quot;warning&quot;</EuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Warning />
        </div>
      ),
    },
    {
      title: 'Danger',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dangerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: dangerHtml,
        },
      ],
      text: (
        <p>
          Setting <EuiCode>type=&quot;danger&quot;</EuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Danger />
        </div>
      ),
    },
  ],
};
