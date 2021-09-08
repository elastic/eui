import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../../components';
import { Typography } from './sass/typography';
import { Animation } from './sass/animation';
import { Breakpoints } from './sass/breakpoints';
import { Shadow } from './sass/shadow';
import { Border } from './sass/border';
import { Color } from './sass/color';
import { Core } from './sass/core';

import {
  EuiText,
  EuiSpacer,
  EuiFlexGrid,
  EuiFlexItem,
  EuiLink,
  EuiCode,
  EuiCodeBlock,
} from '../../../../src/components';

const bemExample = `// Use camelCase naming
.euiButton {
  // Put mixins first before properties
  @include euiButton;
  @include euiSlightShadow;

  border-radius: $euiBorderRadius;


  // Elements exist within the component
  .euiButton__content {
    padding: 0 ($euiSize - $euiSizeXS);
  }

  // Modifiers augment existing components or elements
  &.euiButton--primary {
    background-color: $euiColorPrimary;
  }

  // States are written with a verb prefix
  &.euiButton-isLoading {
    opacity: .5;
  }
}

// Put breakpoints at the bottom of the document
@include euiBreakpoint("xs", "s") {
  .euiButton {
    width: 100%;
  }
}
`;

const ImportOutsideExample = () => {
  const themeContext = useContext(ThemeContext);
  switch (themeContext.theme) {
    case 'light':
      return `@import '@elastic/eui/src/themes/eui/eui_colors_light.scss';
@import '@elastic/eui/src/themes/eui/eui_globals.scss';`;
    case 'dark':
      return `@import '@elastic/eui/src/themes/eui/eui_colors_dark.scss';
@import '@elastic/eui/src/themes/eui/eui_globals.scss';`;
    case 'amsterdam-dark':
      return `@import '@elastic/eui/src/themes/eui-amsterdam/eui_amsterdam_colors_dark.scss';
@import '@elastic/eui/src/themes/eui-amsterdam/eui_amsterdam_globals.scss';`;
    default:
      return `@import '@elastic/eui/src/themes/eui-amsterdam/eui_amsterdam_colors_light.scss';
@import '@elastic/eui/src/themes/eui-amsterdam/eui_amsterdam_globals.scss';`;
  }
};

export const SassGuidelines = {
  title: 'Sass guidelines',
  intro: (
    <>
      <EuiText color="subdued" size="s" grow={false}>
        <p>
          EUI is highly tokenized and recommends using the following{' '}
          <EuiLink href="https://sass-lang.com/">Sass</EuiLink> variables when
          customizing on top of EUI. This way your customizations stay up to
          date with EUI&apos;s theming.
        </p>
      </EuiText>
    </>
  ),
  sections: [
    {
      wrapText: false,
      title: 'Using EUI global Sass',
      text: (
        <>
          <EuiText>
            <p>
              If you want to construct your own import, you would just need to
              import the following core files into a fresh Sass project.
            </p>

            <EuiCodeBlock
              language="scss"
              paddingSize="m"
              fontSize="m"
              isCopyable
            >
              <ImportOutsideExample />
            </EuiCodeBlock>

            <p>
              For more detail see the{' '}
              <Link to="/guidelines/getting-started">Getting Started page</Link>
              .
            </p>
          </EuiText>

          <EuiSpacer size="xl" />

          <EuiFlexGrid columns={2}>
            <EuiFlexItem>
              <EuiText>
                <h3>Component based naming</h3>
                <p>
                  EUI is written in a{' '}
                  <EuiLink href="http://getbem.com/introduction/">BEM</EuiLink>
                  ish style with the addition of verb states (ex:{' '}
                  <EuiCode>*-isLoading</EuiCode>). Below is an example of proper
                  formatting.
                </p>
              </EuiText>
              <EuiSpacer />
              <EuiCodeBlock language="scss" paddingSize="s">
                {bemExample}
              </EuiCodeBlock>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiText grow={false}>
                <h3>Writing Sass the EUI way</h3>
                <p>
                  In general, when writing new SCSS in a project that installs
                  EUI as a dependency try to follow these best practices:
                </p>
              </EuiText>
              <EuiSpacer />
              <EuiText grow={false}>
                <ul>
                  <li>
                    Utilize color variables and functions rather than hard-coded
                    values
                  </li>
                  <li>Utilize the sizing variables for padding and margins</li>
                  <li>
                    Utilize the animation variables for animations when possible
                  </li>
                  <li>
                    Utilize the responsive mixins for all screen width
                    calculations
                  </li>
                  <li>
                    Utilize the typography mixins and variables for all font
                    family, weight, and sizing
                  </li>
                  <li>
                    Utilize the shadow mixins and z-index variables to manage
                    depth
                  </li>
                  <li>
                    Utilize the border and border-radius variable to handle
                    border usage
                  </li>
                  <li>
                    Minimize your overwrites and try to make new Sass additive
                    in nature
                  </li>
                </ul>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGrid>
        </>
      ),
    },
    {
      title: 'Core variables',
      wrapText: false,
      text: <Core />,
    },
    {
      title: 'Going beyond the provided colors',
      wrapText: false,
      text: <Color />,
    },
    {
      title: 'Typography',
      wrapText: false,
      text: <Typography />,
    },
    {
      title: 'Borders',
      wrapText: false,
      text: <Border />,
    },
    {
      title: 'Shadow and Depth',
      wrapText: false,
      text: <Shadow />,
    },
    {
      title: 'Media queries and breakpoints',
      wrapText: false,
      text: <Breakpoints />,
    },
    {
      title: 'Animation',
      wrapText: false,
      text: <Animation />,
    },
  ],
};
