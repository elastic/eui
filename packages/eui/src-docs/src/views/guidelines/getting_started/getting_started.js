import React from 'react';
import { Link } from 'react-router-dom';

import {
  EuiCodeBlock,
  EuiCode,
  EuiText,
  EuiSpacer,
  EuiPanel,
  EuiCallOut,
  EuiLink,
} from '../../../../../src';

import { AppSetup } from './_app_setup';
import { GuideSectionExampleCode } from '../../../components/guide_section/guide_section_parts/guide_section_code';
const consumingSource = require('!!raw-loader!../../theme/consuming');
const overrideSimpleSource = require('!!raw-loader!../../theme/override_simple');
import { euiProviderComponentDefaultsSnippet } from '../../provider/provider_component_defaults';

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
              <a href="https://github.com/elastic/eui/blob/main/packages/eui/package.json#L260">
                several <EuiCode>peerDependencies</EuiCode> requirements
              </a>{' '}
              that will also need to be installed when starting with a blank
              project.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="bash" isCopyable fontSize="m">
            {
              'yarn add @elastic/eui @elastic/eui-theme-borealis @elastic/datemath @emotion/react @emotion/css moment'
            }
          </EuiCodeBlock>
          <EuiSpacer />
          <EuiText grow={false}>
            <p>
              You can read more about other ways to{' '}
              <a href="https://github.com/elastic/eui/blob/main/wiki/consuming-eui/">
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
              You can build custom components using EUI's theme tokens, consumed
              via <EuiCode>useEuiTheme()</EuiCode>. The below example uses
              Emotion's <EuiCode>css</EuiCode> prop, but any CSS-in-JS library
              should be able to interpolate the JS variables.
            </p>
            <p>
              For more ways to consume EUI's theme, see the{' '}
              <Link to="/theming/theme-provider#consuming-with-the-react-hook">
                <strong>EuiThemeProvider</strong> documentation
              </Link>
              .
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiPanel paddingSize="none" hasBorder css={{ overflow: 'hidden' }}>
            <GuideSectionExampleCode code={consumingSource} />
          </EuiPanel>
          <EuiSpacer />

          <EuiText grow={false}>
            <h3>Customizing with classes</h3>
            <p>
              For consumers using vanilla or preprocessed CSS, all components
              allow you to pass a custom <EuiCode>className</EuiCode> prop,
              which will be appended onto the component.
            </p>
            <EuiCallOut
              color="warning"
              title={
                <>
                  Avoid overwriting <EuiCode>.eui</EuiCode> class names
                </>
              }
            >
              EUI's class names are not a guaranteed API and are prone to
              change, which will risk breaking your theme. Target your custom
              classNames instead.
            </EuiCallOut>
            <EuiSpacer />
            <p>
              While EUI's styles are generally low in{' '}
              <EuiLink
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity"
                target="_blank"
              >
                specificity
              </EuiLink>{' '}
              due to our usage of CSS-in-JS, you may need to ensure that your
              CSS is defined after ours in your <EuiCode>{'<head>'}</EuiCode>.{' '}
              See{' '}
              <Link to="/utilities/provider#cache-customization">
                <strong>EuiProvider</strong>'s cache customization
              </Link>{' '}
              for more style injection options.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiPanel paddingSize="none" hasBorder css={{ overflow: 'hidden' }}>
            <GuideSectionExampleCode
              code={{
                default: `import React from 'react';
import { EuiButton } from '@elastic/eui';

const myCustomCSS = \`
  .myCustomButton {
    background-color: pink;
  }
\`;

export default () => (
  <>
    <style>{myCustomCSS}</style>
    <EuiButton className="myCustomButton">Hello world!</EuiButton>
  </>
);`,
              }}
            />
          </EuiPanel>
          <EuiSpacer />

          <EuiText grow={false}>
            <h3>Customizing the style tokens</h3>
            <p>
              EUI can be slightly customized to fit your branding needs by
              altering the base tokens like color and typography. You can pass a
              full or partial list of override tokens to the{' '}
              <strong>EuiProvider</strong>'s <EuiCode>modify</EuiCode> prop.
            </p>
            <EuiCallOut
              title="Touch the least amount of variables possible"
              color="warning"
            >
              By nature, EUI is very rigid. You shouldn't need much to make
              drastic changes to color. Most themes are less then a dozen
              variable overwrites in total.
            </EuiCallOut>
            <EuiSpacer />
            <p>
              For a full list of global tokens, visit{' '}
              <Link to="/theming/customizing-themes">Customizing themes</Link>.
              For more examples of the <EuiCode>modify</EuiCode> prop, see the{' '}
              <Link to="/theming/theme-provider#simple-instance-overrides">
                <strong>EuiThemeProvider</strong> docs
              </Link>
              .
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiPanel paddingSize="none" hasBorder css={{ overflow: 'hidden' }}>
            <GuideSectionExampleCode code={overrideSimpleSource} />
          </EuiPanel>
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
      title: 'Customizing component defaults',
      wrapText: false,
      text: (
        <>
          <EuiText grow={false}>
            <p>
              While all props can be individually customized via props, some
              components can have their default props customized globally via{' '}
              <strong>EuiProvider's</strong>{' '}
              <EuiCode>componentDefaults</EuiCode> API.{' '}
              <Link to="/utilities/provider#component-defaults">
                Read more in EuiProvider's documentation
              </Link>
              .
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock language="jsx" isCopyable fontSize="m">
            {euiProviderComponentDefaultsSnippet}
          </EuiCodeBlock>
        </>
      ),
    },
  ],
};
