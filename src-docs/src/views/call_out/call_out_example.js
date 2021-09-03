import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCallOut, EuiText, EuiCode } from '../../../../src/components';
import callOutConfig from './playground';

import Info from './info';
const infoSource = require('!!raw-loader!./info');
const infoHtml = renderToHtml(Info);
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
const successHtml = renderToHtml(Success);
const successSnippet = [
  `<EuiCallOut title="Good news, everyone!" color="success" iconType="user">
  <p><!-- Content --></p>
</EuiCallOut>
`,
];

import Warning from './warning';
const warningSource = require('!!raw-loader!./warning');
const warningHtml = renderToHtml(Warning);
const warningSnippet = [
  `<EuiCallOut title="Proceed with caution!" color="warning" iconType="help">
  <p><!-- Content --></p>
</EuiCallOut>
`,
];

import Danger from './danger';
const dangerSource = require('!!raw-loader!./danger');
const dangerHtml = renderToHtml(Danger);
const dangerSnippet = [
  `<EuiCallOut title="Sorry, there was an error" color="danger" iconType="alert">
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
            Use an <EuiCode>icon</EuiCode> prop if it adds context.
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
          type: GuideSectionTypes.JS,
          code: infoSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: infoHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use <strong>EuiCallOut</strong> to communicate general information
            to the user.
          </p>
        </div>
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
          Use this callout to warn the user against decisions they might regret.
        </p>
      ),
      snippet: warningSnippet,
      demo: <Warning />,
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
        <p>Use this callout to let the user know that something went wrong.</p>
      ),
      snippet: dangerSnippet,
      demo: <Danger />,
    },
  ],
};
