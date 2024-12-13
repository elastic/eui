import React from 'react';

import { GuideSectionTypes } from '../../../components';

import { EuiCallOut, EuiCode, EuiLink, EuiText } from '../../../../../src';

import Rendering from './rendering';
const RenderingSource = require('!!raw-loader!./rendering');

import Reacting from './reacting';
const ReactingSource = require('!!raw-loader!./reacting');

export const HighContrastModeExample = {
  title: 'High contrast mode',
  isBeta: true,
  intro: (
    <EuiText>
      <p>
        The <EuiCode>highContrastMode</EuiCode> determines and sets certain
        un-overrideable modifications to the EUI theme, primarily around borders
        and shadows. Borders will always be pure black or white (depending on
        the color mode), and shadows will be entirely replaced with borders.
      </p>
      <p>
        By default, if this prop is not passed, <strong>EuiProvider</strong>{' '}
        will detect and use the user's system contrast preferences.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Rendering a specific contrast mode',
      text: (
        <>
          <p>
            While it's usually best to keep all high contrast mode the same
            across your app for visual consistency, some instances may benefit
            from an exaggerated change in contrast. For this you can set{' '}
            <strong>EuiThemeProvider</strong>'s{' '}
            <EuiCode>highContrastMode</EuiCode> to <EuiCode>true</EuiCode>.
          </p>
          <EuiCallOut
            color="warning"
            iconType="warning"
            title={
              <>
                In general, we do not ever recommend manually turning off high
                contrast via <EuiCode>highContrastMode={'{false}'}</EuiCode>.
                Respect the user's contrast preferences where possible.
              </>
            }
          />
        </>
      ),
      demo: <Rendering />,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: RenderingSource,
        },
      ],
    },
    {
      title: 'Forced contrast themes and colors',
      text: (
        <>
          <p>
            Please note that some OSes and browsers have something called{' '}
            <EuiLink
              href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors"
              target="_blank"
            >
              forced colors mode
            </EuiLink>
            , which overrides <strong>all</strong> colors, backgrounds, borders,
            and shadows. An example of this is Windows High Contrast modes.
          </p>
          <p>
            Since this is done at a level that EUI can do nothing about, if
            forced colors mode is detected by <strong>EuiProvider</strong>, EUI
            will ignore any passed <EuiCode>highContrastMode</EuiCode> or{' '}
            <EuiCode>colorMode</EuiCode> props, as this user choice and system
            setting takes precedence.
          </p>
          <EuiCallOut>
            To quickly test your application in forced colors mode without
            switching OS themes, you can{' '}
            <EuiLink
              href="https://devtoolstips.org/tips/en/emulate-forced-colors/"
              target="_blank"
            >
              use Chrome or Edge's devtools to emulate forced-colors mode.
            </EuiLink>
          </EuiCallOut>
        </>
      ),
    },
    {
      title: 'Reacting to user high contrast modes',
      text: (
        <p>
          The detected or current highContrastMode is available via
          <EuiCode>useEuiTheme()</EuiCode>. It returns either{' '}
          <EuiCode>"forced"</EuiCode>, <EuiCode>"preferred"</EuiCode>, or simply{' '}
          <EuiCode>false</EuiCode>. You can use this information to (for
          example) conditionally render or opt out of rendering certain styles
          or colors.
        </p>
      ),
      demo: <Reacting />,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ReactingSource,
        },
      ],
    },
  ],
};
