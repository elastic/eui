import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiAvatar, EuiCode } from '../../../../src/components';
import avatarConfig from './playground';

import Avatar from './avatar';
const avatarSource = require('!!raw-loader!./avatar');
const avatarHtml = renderToHtml(Avatar);
const avatarSnippet = [
  `<EuiAvatar name="Raphael" />
`,
  `<EuiAvatar size="s" name="Cat" imageUrl="https://source.unsplash.com/64x64/?cat" />
`,
  '<EuiAvatar name="Leonardo" color="#BD10E0" />',
];

import AvatarInitials from './avatar_initials';
const avatarInitialsSource = require('!!raw-loader!./avatar_initials');
const avatarInitialsHtml = renderToHtml(AvatarInitials);
const avatarInitialsSnippet = [
  `<EuiAvatar name="Kibana" initialsLength={2}/>
`,
  `<EuiAvatar name="Undefined" initials="?" />
`,
  `<EuiAvatar name="Engineering User" initials="En" initialsLength={2} />
`,
];

import AvatarTypes from './avatar_type';
const avatarTypesSource = require('!!raw-loader!./avatar_type');
const avatarTypesHtml = renderToHtml(AvatarTypes);
const avatarTypesSnippet = [
  `<EuiAvatar type="space" name="Engineering Space" />
`,
];

import AvatarIcons from './avatar_icon';
const avatarIconsSource = require('!!raw-loader!./avatar_icon');
const avatarIconsHtml = renderToHtml(AvatarIcons);
const avatarIconsSnippet = [
  `<EuiAvatar name="Management" iconType="managementApp" />
`,
  `<EuiAvatar name="Management" iconType="managementApp" color="#FAFBFD" iconColor={null} />
`,
  `<EuiAvatar name="Management" iconType="managementApp" iconSize="l" />
`,
];

import AvatarDisabled from './avatar_disabled';
const avatarDisabledSource = require('!!raw-loader!./avatar_disabled');
const avatarDisabledHtml = renderToHtml(AvatarDisabled);
const avatarDisabledSnippet = [
  `<EuiAvatar isDisabled={true} name="Avatar" />
`,
];

export const AvatarExample = {
  title: 'Avatar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <strong>EuiAvatar</strong> component typically creates a user
            icon. It will accept <EuiCode>name</EuiCode> (required) and{' '}
            <EuiCode>image</EuiCode> props and will configure the display and
            accessibility as needed. By default, the background colors come from
            the set of colors used for visualizations. Otherwise you can pass a
            hex value to the <EuiCode>color</EuiCode> prop.
          </p>
        </div>
      ),
      props: { EuiAvatar },
      snippet: avatarSnippet,
      demo: <Avatar />,
      playground: avatarConfig,
    },
    {
      title: 'Initials',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarInitialsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarInitialsHtml,
        },
      ],
      text: (
        <div>
          <p>
            The initials displayed in the avatar try to be smart based on the
            name prop. If the name contains spaces, it will display the first
            character of each word,{' '}
            <strong>always maxing out at 2 characters</strong>. You can
            customize this by passing a combination of{' '}
            <EuiCode>initialsLength</EuiCode> and/or <EuiCode>initials</EuiCode>{' '}
            props. However, the avatar will still always max out at 2
            characters.
          </p>
        </div>
      ),
      snippet: avatarInitialsSnippet,
      demo: <AvatarInitials />,
      props: { EuiAvatar },
    },
    {
      title: 'Types',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarTypesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarTypesHtml,
        },
      ],
      text: (
        <div>
          <p>
            The avatar <EuiCode>type</EuiCode>, which primarily defines the
            shape, is keyworded and can be{' '}
            <EuiCode language="js">&quot;user&quot;</EuiCode> (default) or{' '}
            <EuiCode language="js">&quot;space&quot;</EuiCode> (for workspaces).
          </p>
        </div>
      ),
      snippet: avatarTypesSnippet,
      demo: <AvatarTypes />,
      props: { EuiAvatar },
    },
    {
      title: 'Icons',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarIconsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarIconsHtml,
        },
      ],
      text: (
        <div>
          <p>
            Icons can also be displayed instead of initials or images. When
            simply passing an <EuiCode>iconType</EuiCode>, it will both size and
            color appropriately based on the other <strong>EuiAvatar</strong>{' '}
            props. To customize these specifically, pass{' '}
            <EuiCode>iconSize</EuiCode> and <EuiCode>iconColor</EuiCode>.
          </p>
          <p>
            If your icon has multiples or custom colors like a logo, you can
            keep the default <EuiCode>iconColor</EuiCode> by passing{' '}
            <EuiCode>null</EuiCode>. Otherwise it will get the appropriate
            contrast acceptable variant. Just ensure that you also are providing
            an accesible background color to match that of the icon&apos;s
            color.
          </p>
        </div>
      ),
      snippet: avatarIconsSnippet,
      demo: <AvatarIcons />,
      props: { EuiAvatar },
    },
    {
      title: 'Disabled',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: avatarDisabledSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: avatarDisabledHtml,
        },
      ],
      text: (
        <div>
          <p>
            While <strong>EuiAvatar</strong> doesn&apos;t accept any interactive
            behaviors itself, you can create a visually presented disabled
            avatar by adding <EuiCode>isDisabled</EuiCode> when placed within a
            disabled element.
          </p>
        </div>
      ),
      snippet: avatarDisabledSnippet,
      demo: <AvatarDisabled />,
      props: { EuiAvatar },
    },
  ],
};
