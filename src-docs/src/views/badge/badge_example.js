import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiBadge,
  EuiCode,
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

export const BadgeExample = {
  title: 'Badge',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: badgeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: badgeHtml,
    }],
    text: (
      <p>
        Badges are used to focus on important bits of information. Although they
        will automatically space themselves if you use them in a repetitive fashion
        it is good form to wrap them using a <EuiCode>FlexGroup</EuiCode> so
        that they will wrap when width is constrained (as is done artificially in
        the example below).
      </p>
    ),
    props: { EuiBadge },
    demo: <Badge />,
  }, {
    title: 'Badge with Icon',
    source: [{
      type: GuideSectionTypes.JS,
      code: badgeWithIconSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: badgeWithIconHtml,
    }],
    text: (
      <p>
        Badges can use icons on the left and right (default) sides.
      </p>
    ),
    demo: <BadgeWithIcon />,
  }, {
    title: 'Badge with onClick events',
    source: [{
      type: GuideSectionTypes.JS,
      code: badgeButtonSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: badgeButtonHtml,
    }],
    text: (
      <p>
        Badges can have onClick events applied to the badge itself or the icon within the badge.
        The later option is useful for when you might use badges in other components (like a tag
        system with autocomplete where you need close events).
      </p>
    ),
    demo: <BadgeButton />,
  }],
};
