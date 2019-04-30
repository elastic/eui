import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiAvatar, EuiCode } from '../../../../src/components';

import Avatar from './avatar';
const avatarSource = require('!!raw-loader!./avatar');
const avatarHtml = renderToHtml(Avatar);

import AvatarInitials from './avatar_initials';
const avatarInitialsSource = require('!!raw-loader!./avatar_initials');
const avatarInitialsHtml = renderToHtml(AvatarInitials);

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
            The <EuiCode>Avatar</EuiCode> component creates a user icon. It will
            accept <EuiCode>name</EuiCode> (required) and{' '}
            <EuiCode>image</EuiCode> props and will configure the display and
            accessibility as needed. By default, the background colors come from
            the set of colors used for visualizations. Otherwise you can pass a
            hex value to the <EuiCode>color</EuiCode> prop.
          </p>
        </div>
      ),
      props: { EuiAvatar },
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
          <h3>Types</h3>
          <p>
            The avatar <EuiCode>type</EuiCode>, which primarily defines the
            shape, is keyworded and can be <EuiCode>&quot;user&quot;</EuiCode>{' '}
            (default) or <EuiCode>&quot;space&quot;</EuiCode> (for workspaces).
          </p>
        </div>
      ),
      demo: <AvatarInitials />,
    },
  ],
};
