import React from 'react';

import { EuiCodeBlock, EuiCode, EuiText, EuiSpacer } from '../../../../../src';

import { AppSetup } from './_app_setup';
import { Tokens } from './_tokens';
import { CustomizeTokens } from './_customize_tokens';

export const GettingStarted = {
  title: 'Getting started',
  sections: [
    {
      title: 'Installation',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <p>
              EUI is published through{' '}
              <a href="https://www.npmjs.com/package/@elastic/eui">NPM</a> as a
              dependency. To install EUI into an existing project, use the{' '}
              <EuiCode>yarn</EuiCode> CLI (<EuiCode>npm</EuiCode> is not
              supported).
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="bash" isCopyable fontSize="m">
            {'yarn add @elastic/eui'}
          </EuiCodeBlock>
          <EuiSpacer />
          <EuiText grow={false}>
            <p>
              Note that EUI has{' '}
              <a href="https://github.com/elastic/eui/package.json">
                several <EuiCode>peerDependencies</EuiCode> requirements
              </a>{' '}
              that will also need to be installed if starting with a blank
              project. You can read more about other ways to{' '}
              <a href="https://github.com/elastic/eui/blob/master/wiki/consuming.md">
                consume EUI
              </a>
              .
            </p>
          </EuiText>
        </>
      ),
    },
    {
      title: 'Setting up your application',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <p>
              EUI provides a general context provider to handle global aspects
              like theming. While EUI is in the process of converting from a
              Sass based theme to CSS-in-JS via Emotion. We require that both
              the EuiProvider <strong>and</strong> the compiled CSS (or raw
              Sass) files be imported during this transition.
            </p>
            <p>
              EUI builds with both a light and dark theme. You can import these
              default themes through their respective compiled CSS files. Use
              the <EuiCode>.min.css</EuiCode> file extension for the minified
              version.
            </p>
          </EuiText>

          <EuiSpacer />
          <AppSetup />
          <EuiSpacer />

          <EuiText grow={false}>
            <p>
              For the dark theme, you can swap the words{' '}
              <EuiCode>light</EuiCode> for <EuiCode>dark</EuiCode>.
            </p>
          </EuiText>
        </>
      ),
    },
    {
      title: 'Styling your application',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <p>
              To build your custom components using EUI theme variables,
              functions, and mixins, you will need to consume them through one
              of the <a href="/#/theming/sass">Sass</a>,{' '}
              <a href="/#/theming/theme-provider">Emotion</a>, or{' '}
              <a href="https://github.com/elastic/eui/blob/master/wiki/consuming.md#reusing-the-variables-in-javascript">
                JSON import
              </a>{' '}
              methods.
            </p>
          </EuiText>
          <EuiSpacer />
          <Tokens />
          <EuiSpacer />

          <EuiText grow={false}>
            <h3>Customizing the style tokens with Sass</h3>
            <p>
              EUI can be slightly customized to fit your branding needs by
              altering the base tokens like color and typography. Currently, it
              is only supported using the Sass method and requires a full
              re-compile of all EUI component styles.
            </p>
            <p>
              Simply declare your token overrides before importing the whole EUI
              theme. This will re-compile all of the EUI components with your
              colors.
            </p>
            <p>
              <strong>Do not use in conjunction with the compiled CSS.</strong>
            </p>
          </EuiText>
          <EuiSpacer />
          <CustomizeTokens />
          <EuiSpacer />
          <EuiText grow={false}>
            <h4>Theming tips</h4>
            <p>
              Touch the least amount of variables possible. By nature EUI is
              very rigid. You shouldn&apos;t need much to make drastic changes
              to color. Most themes are less then a dozen variable overwrites in
              total.
            </p>

            <ul>
              <li>
                In general you should only overwrite variables contained in the
                `src/global_styling` folder.
              </li>
              <li>
                Do not overwrite individual component variables or classnames.
                Although this is certainly possible components are much more
                prone to change and you&apos;ll risk breaking your theme.
              </li>
            </ul>
          </EuiText>
        </>
      ),
    },
    {
      title: 'Fonts',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <p>
              By default, EUI ships with a font stack that includes some
              outside, open source fonts. If your system is internet available
              you can include these by adding the following imports to your
              SCSS/CSS files, otherwise you&#39;ll need to bundle the physical
              fonts in your build. EUI will drop to System Fonts (which you may
              prefer) in their absence.
            </p>
          </EuiText>
          <EuiSpacer />

          <EuiCodeBlock language="scss" isCopyable fontSize="m">
            {
              "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');"
            }
          </EuiCodeBlock>
          <EuiSpacer />
          <EuiText grow={false}>
            <p>
              Or grab all weights, including italics, between 400 and 700 as a
              variable font.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="scss" isCopyable fontSize="m">
            {
              "@import url('https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10,300..700;0,300..700&family=Roboto+Mono:ital,wght@0,400..700;1,400..700&display=swap');"
            }
          </EuiCodeBlock>

          <EuiSpacer />

          <EuiText grow={false}>
            <h4 id="embedding-with-font-face-">
              Embedding with <EuiCode>@font-face</EuiCode>
            </h4>
            <p>
              If your application doesn&#39;t allow grabbing the font assets
              from a CDN, you&#39;ll need to download and locally provide the
              font files. You should download the files directly from their
              source site <a href="https://rsms.me/inter/">rsms.me/inter/</a>.
              Then follow the instructions in the provided CSS file for
              importing. We recommend using the single variable font file and
              importing with the following settings:
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="scss" isCopyable fontSize="m">
            {`@font-face {
  font-family: 'Inter';
  font-weight: 300 900;
  font-display: swap;
  font-style: oblique 0deg 10deg;
  src: url("Inter.var.woff2") format("woff2");
}`}
          </EuiCodeBlock>
        </>
      ),
    },
    {
      title: 'Components, Services and Testing imports',
      wrapText: false,
      text: (
        <EuiText grow={false}>
          <p>You can import React components from the top-level EUI module.</p>
          <EuiCodeBlock language="jsx" isCopyable fontSize="m">
            {`import {
  EuiButton,
  EuiCallOut,
  EuiPanel,
} from '@elastic/eui';`}
          </EuiCodeBlock>
          <p>
            Most services are published from the <EuiCode>lib/services</EuiCode>{' '}
            directory. Some are published from their module directories in this
            directory.
          </p>
          <EuiCodeBlock language="jsx" isCopyable fontSize="m">
            {`import { keys } from '@elastic/eui/lib/services';
import { Timer } from '@elastic/eui/lib/services/time';`}
          </EuiCodeBlock>
          <p>
            Test utilities are published from the <EuiCode>lib/test</EuiCode>{' '}
            directory.
          </p>
          <EuiCodeBlock language="jsx" isCopyable fontSize="m">
            {"import { findTestSubject } from '@elastic/eui/lib/test';"}
          </EuiCodeBlock>
        </EuiText>
      ),
    },
    {
      title: 'Customizing with classes',
      wrapText: false,
      text: (
        <EuiText grow={false}>
          <p>
            We do not recommend customizing EUI components by applying styles
            directly to EUI classes, eg. <EuiCode>.euiButton</EuiCode>. All
            components allow you to pass a custom <EuiCode>className</EuiCode>{' '}
            prop directly to the component which will then append this to the
            class list. Utilizing the cascade feature of CSS, you can then
            customize by overriding styles so long as your styles are imported{' '}
            <strong>after</strong> the EUI import.
          </p>
          <EuiCodeBlock language="jsx" isCopyable fontSize="m">
            {'<EuiButton className="myCustomClass__button" />'}
          </EuiCodeBlock>
          <EuiSpacer />
          <p>Renders as:</p>
          <EuiCodeBlock language="html" isCopyable fontSize="m">
            {'<button class="euiButton myCustomClass__button" />'}
          </EuiCodeBlock>
        </EuiText>
      ),
    },
  ],
};
