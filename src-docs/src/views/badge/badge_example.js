import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiBadge,
  EuiCode,
  EuiBetaBadge,
  EuiNotificationBadge,
  EuiBadgeGroup,
  EuiCallOut,
} from '../../../../src/components';
import {
  badgeConfig,
  betaBadgeConfig,
  notificationBadgeConfig,
} from './playground';

import Badge from './badge';

const badgeSource = require('!!raw-loader!./badge');
const badgeHtml = renderToHtml(Badge);
const badgeSnippet = [
  `<EuiBadge>Default</EuiBadge>
`,
  `<EuiBadge color="hollow">Hollow</EuiBadge>
`,
  `<EuiBadge color="primary">Primary</EuiBadge>
`,
  `<EuiBadge color="#BADA55">Custom</EuiBadge>
`,
  `<EuiBadge color="secondary" isDisabled>Disabled</EuiBadge>
`,
];

import BadgeWithIcon from './badge_with_icon';
const badgeWithIconSource = require('!!raw-loader!./badge_with_icon');
const badgeWithIconHtml = renderToHtml(BadgeWithIcon);
const badgeWithIconSnippet = `<EuiBadge color="hollow" iconType="cross" iconSide="right">Label</EuiBadge>
`;

import BadgeButton from './badge_button';
const badgeButtonSource = require('!!raw-loader!./badge_button');
const badgeButtonHtml = renderToHtml(BadgeButton);
const badgeButtonSnippet = [
  `<EuiBadge
  color="primary"
  onClick={onBadgeClick}
  onClickAriaLabel="Aria label applied to text button"
>
  Clickable text
</EuiBadge>`,
  `<EuiBadge
  iconType="cross"
  iconSide="right"
  color="hollow"
  iconOnClick={onBadgeIconClick}
  iconOnClickAriaLabel="Aria label applied to icon button"
>
  Text with clickable icon
</EuiBadge>`,
  `<EuiBadge
  iconType="cross"
  iconSide="right"
  color="secondary"
  onClick={onBadgeClick}
  onClickAriaLabel="Aria label applied to text button"
  iconOnClick={onBadgeIconClick}
  iconOnClickAriaLabel="Aria label applied to icon button"
>
  Clickable text with clickable icon
</EuiBadge>`,
];

import BadgeHealth from './badge_health';
const badgeHealthSource = require('!!raw-loader!./badge_health');
const badgeHealthHtml = renderToHtml(BadgeHealth);
const badgeHealthSnippet = [
  `<EuiBadge color="secondary">Healthy</EuiBadge>
`,
  `<EuiBadge color="warning">Warning</EuiBadge>
`,
  `<EuiBadge color="danger">Critical</EuiBadge>
`,
];

import BadgeHref from './badge_href';
const badgeHrefSource = require('!!raw-loader!./badge_href');
const badgeHrefHtml = renderToHtml(BadgeHref);
const badgeHrefSnippet = ['<EuiBadge href="#" />'];

import BadgeTruncate from './badge_truncate';
const badgeTruncateSource = require('!!raw-loader!./badge_truncate');
const badgeTruncateHtml = renderToHtml(BadgeTruncate);
const badgeTruncateSnippet = [
  `<EuiBadgeGroup gutterSize="s">
  <EuiBadge />
  <EuiBadge />
</EuiBadgeGroup>`,
];

import BetaBadge from './beta_badge';
const betaBadgeSource = require('!!raw-loader!./beta_badge');
const betaBadgeHtml = renderToHtml(BetaBadge);
const betaBadgeSnippet = [
  `<EuiBetaBadge label="Beta" />
`,
  `<EuiBetaBadge label="Lab" tooltipContent="Describe why this is considered beta." />
`,
  `<EuiBetaBadge label="Lab" iconType="beaker" />
`,
];

import NotificationBadge from './notification_badge';
const notificationBadgeSource = require('!!raw-loader!./notification_badge');
const notificationBadgeHtml = renderToHtml(NotificationBadge);
const notificationBadgeSnippet = `<EuiNotificationBadge>3</EuiNotificationBadge>
`;

export const BadgeExample = {
  title: 'Badge',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiBadges</strong> are used to focus on important bits of
          information. Although they will automatically space themselves if you
          use them in a repetitive fashion it is good form to wrap them using a{' '}
          <strong>EuiBadgeGroup</strong> so that they will wrap when width is
          constrained (as seen below).
        </p>
      ),
      props: { EuiBadge },
      snippet: badgeSnippet,
      demo: <Badge />,
    },
    {
      title: 'Badge with Icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeWithIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeWithIconHtml,
        },
      ],
      text: <p>Badges can use icons on the left and right (default) sides.</p>,
      snippet: badgeWithIconSnippet,
      demo: <BadgeWithIcon />,
    },
    {
      title: 'Badge with onClick events',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeButtonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeButtonHtml,
        },
      ],
      text: (
        <div>
          <p>
            Badges can have <EuiCode>onClick</EuiCode> events applied to the
            badge itself or the icon within the badge. The latter option is
            useful for when you might use badges in other components (like a tag
            system with autocomplete where you need close events).
          </p>
          <EuiCallOut title="onClick with iconOnClick">
            <p>
              When providing both these click handlers,{' '}
              <strong>EuiBadge</strong> must alter the contents so that it does
              not contain nested button tags. Please make note that if you
              provide props other than those explicit to{' '}
              <strong>EuiBadge</strong>, they will always be applied to the main{' '}
              <EuiCode>button</EuiCode> tag which may be inside of the outer
              most tag.
            </p>
          </EuiCallOut>
        </div>
      ),
      snippet: badgeButtonSnippet,
      demo: <BadgeButton />,
    },
    {
      title: 'Badge for health status',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeHealthSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeHealthHtml,
        },
      ],
      text: (
        <div>
          <p>
            Badges can work as health status indicators in places where there
            are a lot of repeated statuses, e.g. in tables.
          </p>
        </div>
      ),
      snippet: badgeHealthSnippet,
      demo: <BadgeHealth />,
    },
    {
      title: 'Badge with href',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeHrefSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeHrefHtml,
        },
      ],
      text: (
        <div>
          <p>
            Badges can also be made to render anchor tags by passing an{' '}
            <EuiCode>href</EuiCode>.
          </p>
        </div>
      ),
      snippet: badgeHrefSnippet,
      demo: <BadgeHref />,
    },
    {
      title: 'Badge groups and truncation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: badgeTruncateSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: badgeTruncateHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Badges, like buttons, will only every be a single line of text. This
            means text will not wrap, but be truncated if the badge&apos;s width
            reaches that of its parent&apos;s.
          </p>
          <p>
            For this reason, badges also auto-apply the inner text of the badge
            to the <EuiCode>title</EuiCode> attribute of the element to provide
            default browser tooltips with the full badge text.
          </p>
          <p>
            To ensure proper wrapping, truncation and spacing of multiple
            badges, it is advisable to wrap them in a{' '}
            <strong>EuiBadgeGroup</strong>.
          </p>
        </Fragment>
      ),
      props: { EuiBadgeGroup },
      demo: <BadgeTruncate />,
      snippet: badgeTruncateSnippet,
    },
    {
      title: 'Beta badge type',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: betaBadgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: betaBadgeHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>EuiBetaBadge</strong> was created specifically to call
            out modules that are not in GA. Generally the labels used are
            &quot;Beta&quot; or &quot;Lab&quot;. They require an extra{' '}
            <EuiCode>tooltipContent</EuiCode> to describe the purpose of the
            badge. You can pass an optional <EuiCode>title</EuiCode> prop to
            populate the tooltip title or html title attribute but by default it
            will use the <EuiCode>label</EuiCode>.
          </p>
          <p>
            If you pass in an <EuiCode>iconType</EuiCode>, only the icon will be
            used in the badge itself and the label will be applied as the title.
            Only use an icon when attaching the beta badge to small components.
            Beta badges can also be made clickable by passing{' '}
            <EuiCode>href</EuiCode> or <EuiCode>onClick</EuiCode> as needed.
          </p>
          <p>
            They can also be used in conjunction with{' '}
            <Link to="/display/card">
              <strong>EuiCards</strong>
            </Link>{' '}
            and{' '}
            <Link to="/navigation/key-pad-menu">
              <strong>EuiKeyPadMenuItems</strong>
            </Link>
            .
          </p>
        </div>
      ),
      props: { EuiBetaBadge },
      snippet: betaBadgeSnippet,
      demo: <BetaBadge />,
    },
    {
      title: 'Notification badge type',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: notificationBadgeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: notificationBadgeHtml,
        },
      ],
      text: (
        <p>
          Used to showcase the number of notifications, alerts, or hidden
          selections. This badge type is commonly used in the{' '}
          <Link to="/layout/header">
            <strong>EuiHeader</strong>
          </Link>{' '}
          and{' '}
          <Link to="/forms/filter-group">
            <strong>EuiFilterButton</strong>
          </Link>{' '}
          components.
        </p>
      ),
      props: { EuiNotificationBadge },
      snippet: notificationBadgeSnippet,
      demo: <NotificationBadge />,
    },
  ],
  playground: [badgeConfig, betaBadgeConfig, notificationBadgeConfig],
};
