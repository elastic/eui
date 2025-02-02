import React, { Fragment } from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCallOut, EuiText, EuiCode } from '../../../../src/components';
import callOutConfig from './playground';

import Info from './info';
const infoSource = require('!!raw-loader!./info');
const infoSnippet = [
  `<EuiCallOut size="m" title="Just a title. No content." iconType="gear" />
`,
  `<EuiCallOut
  size="s"
  title="A beautiful title"
  iconType="search">
  <p><!-- Content --></p>
</EuiCallOut>
`,
];

import Success from './success';
const successSource = require('!!raw-loader!./success');
const successSnippet = [
  `<EuiCallOut title="Good news, everyone!" color="success" iconType="user">
  <p><!-- Content --></p>
</EuiCallOut>
`,
];

import Warning from './warning';
const warningSource = require('!!raw-loader!./warning');
const warningSnippet = [
  `<EuiCallOut title="Proceed with caution!" color="warning" iconType="help">
  <p><!-- Content --></p>
</EuiCallOut>
`,
];

import Danger from './danger';
const dangerSource = require('!!raw-loader!./danger');
const dangerSnippet = [
  `<EuiCallOut title="Sorry, there was an error" color="danger" iconType="error">
  <p><!-- Content --></p>
</EuiCallOut>
`,
];

import Accent from './accent';
const accentSource = require('!!raw-loader!./accent');
const accentSnippet = [
  `<EuiCallOut title="Shiny new thing has arrived" color="accent" iconType="cheer">
  <p><!-- Content --></p>
</EuiCallOut>
`,
];

import OnDismiss from './on_dismiss';
const onDismissSource = require('!!raw-loader!./on_dismiss');
const onDismissSnippet = [
  `<EuiCallOut onDismiss={onDismiss}>
  <p><!-- Content --></p>
</EuiCallOut>
`,
];

export const CallOutExample = {
  title: 'Callout',
  intro: (
    <Fragment>
      <EuiText>
        <p>
          <strong>EuiCallOut</strong> contains a message directly related to
          content on the page. This includes general information, success,
          warning, and error messages.
        </p>
        <p>
          <strong>Keep these guidelines in mind:</strong>
        </p>
        <ul>
          <li>Minimize the number of callouts per page.</li>
          <li>
            Stack callouts in the order in which they require users&apos;
            attention: error, warning, info, and then success.
          </li>
          <li>
            Offer only one action per callout and ensure it&apos;s an action
            users can perform quickly.
          </li>
          <li>
            If the callout has a permanent spot in the UI, but needs to be less
            obstructive, set the <EuiCode>size</EuiCode> property to{' '}
            <EuiCode>s</EuiCode> (small).
          </li>
          <li>
            Use an <EuiCode>iconType</EuiCode> if it adds context.
          </li>
        </ul>
      </EuiText>
    </Fragment>
  ),
  sections: [
    {
      title: 'Info',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: infoSource,
        },
      ],
      text: (
        <p>
          Use <strong>EuiCallOut</strong> to communicate general information to
          the user.
        </p>
      ),
      props: { EuiCallOut },
      snippet: infoSnippet,
      demo: <Info />,
      playground: callOutConfig,
    },
    {
      title: 'Success',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: successSource,
        },
      ],
      text: (
        <p>
          Use this callout to notify the user of an action that succesfully
          completed. Use success callouts sparingly&mdash;callouts are typically
          used for things that are broken rather than things that succeed.
        </p>
      ),
      snippet: successSnippet,
      demo: <Success />,
    },
    {
      title: 'Warning',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: warningSource,
        },
      ],
      text: (
        <p>
          Use this callout to warn the user against decisions they might regret.
          You should receive a warning message when the program detects that{' '}
          <b>
            something is not behaving right, but it didn&apos;t cause any
            termination
          </b>
          .
        </p>
      ),
      snippet: warningSnippet,
      demo: <Warning />,
    },
    {
      title: 'Danger',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: dangerSource,
        },
      ],
      text: (
        <p>
          Use this callout to let the user know that something went wrong. For
          example if you want to communicate an error. You should receive an
          error message when the issue is{' '}
          <b>
            terminal, this doesn&apos;t always mean that the operation stops
            completely, but the task is not complete
          </b>
          .
        </p>
      ),
      snippet: dangerSnippet,
      demo: <Danger />,
    },
    {
      title: 'Accent',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: accentSource,
        },
      ],
      text: (
        <p>
          Use this callout to announce new capabilities. For example if you want
          to highlight a feature.
        </p>
      ),
      snippet: accentSnippet,
      demo: <Accent />,
    },
    {
      title: 'Dismissible callouts',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: onDismissSource,
        },
      ],
      text: (
        <p>
          To render a cross icon in the top right hand corner, pass an{' '}
          <EuiCode>onDismiss</EuiCode> callback that handles conditionally
          rendering your callout.
        </p>
      ),
      snippet: onDismissSnippet,
      demo: <OnDismiss />,
    },
  ],
};
