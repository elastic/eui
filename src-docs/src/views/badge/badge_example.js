import React, { Fragment } from 'react';

import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiBadge,
  EuiCode,
  EuiBetaBadge,
  EuiNotificationBadge,
  EuiCallOut,
} from '../../../../src/components';

import Badge from './badge';
const badgeSource = require('!!raw-loader!./badge');
const badgeHtml = renderToHtml(Badge);

import BadgeWithIcon from './badge_with_icon';
const badgeWithIconSource = require('!!raw-loader!./badge_with_icon');
const badgeWithIconHtml = renderToHtml(BadgeWithIcon);

import BadgeButton from './badge_button';
const badgeButtonSource = require('!!raw-loader!./badge_button');
const badgeButtonHtml = renderToHtml(BadgeButton);

import BetaBadge from './beta_badge';
const betaBadgeSource = require('!!raw-loader!./beta_badge');
const betaBadgeHtml = renderToHtml(BetaBadge);

import NotificationBadge from './notification_badge';
const notificationBadgeSource = require('!!raw-loader!./notification_badge');
const notificationBadgeHtml = renderToHtml(NotificationBadge);

import BadgeTruncate from './badge_truncate';
const badgeTruncateSource = require('!!raw-loader!./badge_truncate');
const badgeTruncateHtml = renderToHtml(BadgeTruncate);

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
          Badges are used to focus on important bits of information. Although
          they will automatically space themselves if you use them in a
          repetitive fashion it is good form to wrap them using a{' '}
          <EuiCode>FlexGroup</EuiCode> so that they will wrap when width is
          constrained (as is done artificially in the example below).
        </p>
      ),
      props: { EuiBadge },
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
            Badges can have onClick events applied to the badge itself or the
            icon within the badge. The later option is useful for when you might
            use badges in other components (like a tag system with autocomplete
            where you need close events).
          </p>
          <EuiCallOut title="onClick with iconOnClick">
            <p>
              When providing both these click handlers, EuiBadge must alter the
              contents so that it does not contain nested button tags. Please
              make note that if you provide props other than those explicit to
              EuiBadge, they will always be applied to the main{' '}
              <EuiCode>button</EuiCode> tag which may be inside of the outer
              most tag.
            </p>
          </EuiCallOut>
        </div>
      ),
      demo: <BadgeButton />,
    },
    {
      title: 'Badge truncation',
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
        </Fragment>
      ),
      demo: <BadgeTruncate />,
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
            The <EuiCode>EuiBetaBadge</EuiCode> was created specifically to call
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
            Only use an icon when attaching the beta badge to small components
            like the EuiKeyPadMenuItem.
          </p>
          <p>
            They can also be used in conjunction with{' '}
            <Link to="/display/card">EuiCards</Link> and{' '}
            <Link to="/navigation/key-pad-menu">EuiKeyPadMenuItems</Link>.
          </p>
        </div>
      ),
      props: { EuiBetaBadge },
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
          Used to showcase the number of notifications, alerts or hidden
          selections. Typically used in{' '}
          <Link to="/layout/header">EuiHeader</Link> or (eventually){' '}
          <Link to="/forms/filter-group">EuiFilterButtons</Link>.
        </p>
      ),
      props: { EuiNotificationBadge },
      demo: <NotificationBadge />,
    },
  ],
};
