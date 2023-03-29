import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiToast,
  EuiGlobalToastList,
  EuiGlobalToastListItem,
  EuiText,
} from '../../../../src/components';
import Guidelines from './guidelines';
import toastConfig from './playground';

import ToastList from './toast_list';
const toastListSource = require('!!raw-loader!./toast_list');
const toastListSnippet = [
  `<EuiGlobalToastList
  toasts={[
    {
      id: 1,
      title: "Example Toast",
      text: <p><!-- Content --></p>,
    }
  ]}
  dismissToast={dismissToast}
  toastLifeTimeMs={6000}/>`,
];

import Default from './default';
const defaultSource = require('!!raw-loader!./default');
const defaultToastSnippet = [
  `<EuiToast
  title="Default toast"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </EuiToast>`,
];

import Info from './info';
const infoSource = require('!!raw-loader!./info');
const infoToastSnippet = [
  `<EuiToast
  title="Info toast"
  type="info"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </EuiToast>`,
];

import Success from './success';
const successSource = require('!!raw-loader!./success');
const successToastSnippet = [
  `<EuiToast
  title="Success toast"
  color="success"
  iconType="check"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </EuiToast>`,
];

import Warning from './warning';
const warningSource = require('!!raw-loader!./warning');
const warningToastSnippet = [
  `<EuiToast
  title="Warning toast"
  color="warning"
  iconType="help"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </EuiToast>`,
];

import Danger from './danger';
const dangerSource = require('!!raw-loader!./danger');
const dangerToastSnippet = [
  `<EuiToast
  title="Danger toast"
  color="danger"
  iconType="error"
  onClose={closeToast}>
  <!-- Raw HTML content -->
  </EuiToast>`,
];

export const ToastExample = {
  title: 'Toast',
  guidelines: <Guidelines />,
  intro: (
    <EuiText>
      <p>
        Be sure to read the full{' '}
        <Link to="/guidelines/toast">toast usage guidelines</Link>.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Toast list',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: toastListSource,
        },
      ],
      props: {
        EuiToast,
        EuiGlobalToastList,
        EuiGlobalToastListItem,
      },
      demo: (
        <>
          <ToastList />
        </>
      ),
      snippet: toastListSnippet,
    },
    {
      title: 'Default',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: defaultSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiToast</strong> allows for small notes that appear in the
            bottom right of the screen. They should be used for ephemeral, live
            actions (think <strong>save complete</strong> or{' '}
            <strong>something just finished right now</strong>).
          </p>
          <p>
            They should not be used for historical actions (
            <strong>your report built 30 minutes ago</strong>). This means that
            a user should never be greeted with toasts when starting a session.
            Toasts should be brief and avoid long paragraphs of text or titling.
          </p>
        </>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Default />
        </div>
      ),
      snippet: defaultToastSnippet,
      playground: toastConfig,
    },
    {
      title: 'Info',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: infoSource,
        },
      ],
      text: (
        <p>
          For informative messages use{' '}
          <EuiCode language="js">type=&quot;info&quot;</EuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Info />
        </div>
      ),
      snippet: infoToastSnippet,
    },
    {
      title: 'Success',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: successSource,
        },
      ],
      text: (
        <p>
          For success messages use{' '}
          <EuiCode language="js">color=&quot;success&quot;</EuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Success />
        </div>
      ),
      snippet: successToastSnippet,
    },
    {
      title: 'Warning',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: warningSource,
        },
      ],
      text: (
        <p>
          Use this callout to warn the user against decisions they might regret.
          Show a warning message when the program detects that{' '}
          <b>
            something is not behaving right, but it didn&apos;t cause any
            termination.
          </b>{' '}
          For warning messages use{' '}
          <EuiCode language="js">color=&quot;warning&quot;</EuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Warning />
        </div>
      ),
      snippet: warningToastSnippet,
    },
    {
      title: 'Danger',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: dangerSource,
        },
      ],
      text: (
        <p>
          Use this callout to let the user know that something went wrong. For
          example if you want to communicate an error. You should show an error
          message when the issue is{' '}
          <b>
            terminal, this doesn&apos;t always mean that the operation stops
            completely, but the task is not complete
          </b>
          . For errors messages use{' '}
          <EuiCode language="js">color=&quot;danger&quot;</EuiCode>.
        </p>
      ),
      demo: (
        <div style={{ maxWidth: 320 }}>
          <Danger />
        </div>
      ),
      snippet: dangerToastSnippet,
    },
  ],
};
