import React from 'react';
import { Link } from 'react-router-dom';

import { EuiCodeBlock, EuiCode, EuiText, EuiSpacer } from '../../../../../src';

import { AppSetup } from './_app_setup';
import { Tokens } from './_tokens';
import { Customizing } from './_customizing';
import { ThemeNotice } from '../../../views/theme/_components/_theme_notice.tsx';

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
              <a href="https://github.com/elastic/eui/blob/main/package.json">
                several <EuiCode>peerDependencies</EuiCode> requirements
              </a>{' '}
              that will also need to be installed when starting with a blank
              project.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="bash" isCopyable fontSize="m">
            {
              'yarn add @elastic/eui @elastic/datemath @emotion/react @emotion/css moment prop-types'
            }
          </EuiCodeBlock>
          <EuiSpacer />
          <EuiText grow={false}>
            <p>
              You can read more about other ways to{' '}
              <a href="https://github.com/elastic/eui/blob/main/wiki/consuming.md">
                consume EUI
              </a>{' '}
              in our wiki.
            </p>
          </EuiText>
        </>
      ),
    },
    {
      title: 'Setting up your application',
      wrapText: false,
      text: <AppSetup />,
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
              of the <Link to="/theming/sass">Sass</Link>,{' '}
              <Link to="/theming/theme-provider">Emotion</Link>, or{' '}
              <a href="https://github.com/elastic/eui/blob/main/wiki/consuming.md#reusing-the-variables-in-javascript">
                JSON import
              </a>{' '}
              methods.
            </p>
          </EuiText>
          <EuiSpacer />
          <Tokens />
          <EuiSpacer />

          <EuiText grow={false}>
            <h3>Customizing the style tokens</h3>
            <p>
              EUI can be slightly customized to fit your branding needs by
              altering the base tokens like color and typography. Simply declare
              your token overrides before importing the whole EUI theme. This
              will re-compile all of the EUI components with your colors.
            </p>
            <p>
              For a full list of global tokens visit{' '}
              <Link to="/theming/customizing-themes">Customizing theme</Link>.
            </p>
          </EuiText>
          <EuiSpacer />
          <ThemeNotice />
          <EuiSpacer />
          <Customizing />
          <EuiSpacer />
          <EuiText grow={false}>
            <h4>Do not use in conjunction with the compiled CSS.</h4>
            <p>If you provide both, it will duplicate the imported styles.</p>
            <h4>Touch the least amount of variables possible.</h4>
            <p>
              By nature EUI is very rigid. You shouldn&apos;t need much to make
              drastic changes to color. Most themes are less then a dozen
              variable overwrites in total.
            </p>
            <h4>
              Do not overwrite individual component variables or{' '}
              <EuiCode>.eui</EuiCode> class names.
            </h4>
            <p>
              Although this may be possible, components are much more prone to
              change and you&apos;ll risk breaking your theme. All EUI
              components accept custom a <EuiCode>className</EuiCode> which you
              can use to append your custom styles.
            </p>
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
            {`<link
  href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@300;400;500;600;700&family=Roboto+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
  rel="stylesheet"
/>`}
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
            {`<link
  href="https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10,300..700;0,300..700&family=Roboto+Mono:ital,wght@0,400..700;1,400..700&display=swap"
  rel="stylesheet"
/>`}
          </EuiCodeBlock>

          <EuiSpacer />

          <EuiText grow={false}>
            <h3 id="embedding-with-font-face-">
              Embedding with <EuiCode>@font-face</EuiCode>
            </h3>
            <p>
              If your application doesn&#39;t allow grabbing the font assets
              from a CDN, you&#39;ll need to download and locally provide the
              font files. You can download the files directly from their source
              site <a href="https://rsms.me/inter/">rsms.me/inter/</a>, then
              follow the instructions in the provided CSS file for importing. We
              recommend using the single variable font file and importing with
              the following settings:
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
        <>
          <EuiText grow={false}>
            <p>
              You can import React components from the top-level EUI module.
            </p>
          </EuiText>
          <EuiSpacer />

          <EuiCodeBlock language="jsx" isCopyable fontSize="m">
            {`import {
  EuiButton,
  EuiCallOut,
  EuiPanel,
} from '@elastic/eui';`}
          </EuiCodeBlock>
          <EuiSpacer />
          <EuiText grow={false}>
            <p>
              Most services are published from the{' '}
              <EuiCode>lib/services</EuiCode> directory. Some are published from
              their module directories in this directory.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="jsx" isCopyable fontSize="m">
            {`import { keys } from '@elastic/eui/lib/services';
import { Timer } from '@elastic/eui/lib/services/time';`}
          </EuiCodeBlock>
          <EuiSpacer />
          <EuiText grow={false}>
            <p>
              Test utilities are published from the <EuiCode>lib/test</EuiCode>{' '}
              directory.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="jsx" isCopyable fontSize="m">
            {`import { findTestSubject } from '@elastic/eui/lib/test'; // Enzyme
import { findByTestSubject, render, screen } from '@elastic/eui/lib/test/rtl'; // React Testing Library`}
          </EuiCodeBlock>
        </>
      ),
    },
    {
      title: 'Customizing with classes',
      wrapText: false,
      text: (
        <>
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
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="jsx" isCopyable fontSize="m">
            {'<EuiButton className="myCustomClass__button" />'}
          </EuiCodeBlock>
          <EuiSpacer />
          <p>Renders as:</p>
          <EuiCodeBlock language="html" isCopyable fontSize="m">
            {'<button class="euiButton myCustomClass__button" />'}
          </EuiCodeBlock>
        </>
      ),
    },
  ],
};
