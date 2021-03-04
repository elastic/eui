import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiAvatar, EuiCode } from '../../../../src/components';
import avatarConfig from './playground';

import Avatar from './avatar';
const avatarSource = require('!!raw-loader!./avatar');
const avatarHtml = renderToHtml(Avatar);
const avatarSnippet = [
  `<EuiAvatar size="s" name="Raphael" />
`,
  `<EuiAvatar size="s" name="Cat" imageUrl="https://source.unsplash.com/64x64/?cat" />
`,
];

import AvatarInitials from './avatar_initials';
const avatarInitialsSource = require('!!raw-loader!./avatar_initials');
const avatarInitialsHtml = renderToHtml(AvatarInitials);
const avatarInitialsSnippet = [
  `<EuiAvatar size="m" type="user" name="Two Words" />
`,
  `<EuiAvatar size="m" type="space" name="Kibana" initialsLength={2}/>
`,
  `<EuiAvatar size="m" type="space"  name="Engineering Space" initials="En" initialsLength={2} />
`,
];

import AvatarTypes from './avatar_type';
const avatarTypesSource = require('!!raw-loader!./avatar_type');
const avatarTypesHtml = renderToHtml(AvatarTypes);
const avatarTypesSnippet = [
  `<EuiAvatar size="m" type="user" name="Two Words" />
`,
  `<EuiAvatar size="m" type="space" name="Kibana" initialsLength={2}/>
`,
  `<EuiAvatar size="m" type="space"  name="Engineering Space" initials="En" initialsLength={2} />
`,
];

import AvatarIcons from './avatar_icon';
const avatarIconsSource = require('!!raw-loader!./avatar_icon');
const avatarIconsHtml = renderToHtml(AvatarIcons);
const avatarIconsSnippet = [
  `<EuiAvatar size="m" type="user" name="Two Words" />
`,
  `<EuiAvatar size="m" type="space" name="Kibana" initialsLength={2}/>
`,
  `<EuiAvatar size="m" type="space"  name="Engineering Space" initials="En" initialsLength={2} />
`,
];

import AvatarDisabled from './avatar_disabled';
const avatarDisabledSource = require('!!raw-loader!./avatar_disabled');
const avatarDisabledHtml = renderToHtml(AvatarDisabled);
const avatarDisabledSnippet = [
  `<EuiAvatar size="m" type="user" name="Two Words" />
`,
  `<EuiAvatar size="m" type="space" name="Kibana" initialsLength={2}/>
`,
  `<EuiAvatar size="m" type="space"  name="Engineering Space" initials="En" initialsLength={2} />
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
            The <strong>EuiAvatar</strong> component creates a user icon. It
            will accept <EuiCode>name</EuiCode> (required) and{' '}
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
            Icons can also be used within avatars and will be sized
            appropriately.
          </p>
        </div>
      ),
      snippet: avatarIconsSnippet,
      demo: <AvatarIcons />,
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
            While EuiAvatar doesn&apos;t accept any interactive behaviors
            themselves. You can ensure a visual change if placed within a
            disabled element by passing the disabled prop.
          </p>
        </div>
      ),
      snippet: avatarDisabledSnippet,
      demo: <AvatarDisabled />,
    },
  ],
  playground: avatarConfig,
};
