import React from 'react';
import { Link } from 'react-router-dom';

import {
  EuiText,
  EuiProvider,
  EuiCode,
  EuiCodeBlock,
  EuiLink,
  EuiSpacer,
  EuiCallOut,
} from '../../../../src/components';

import { GuideSectionPropsTable } from '../../components/guide_section/guide_section_parts/guide_section_props_table';

import Setup from './provider_setup';
import GlobalStyles from './provider_styles';
import Warnings from './provider_warning';
import {
  EuiComponentDefaultsProps,
  euiProviderComponentDefaultsSnippet,
} from './provider_component_defaults';

export const ProviderExample = {
  title: 'Provider',
  intro: (
    <EuiText>
      <p>
        <strong>EuiProvider</strong> contains all necessary context providers
        required for full functionality and styling of EUI. A single instance of{' '}
        <strong>EuiProvider</strong> should exist at the top level of your app,
        where functionality will flow down the component tree.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Basic setup',
      text: (
        <EuiText>
          <p>
            For EUI to work correctly, set up <strong>EuiProvider</strong> at
            the root of your application:
          </p>

          <Setup />

          <p>
            <strong>EuiProvider</strong> includes global reset and utilites
            styles and other app-wide contexts, functionality, and configuration
            options. It should only be instantiated <strong>once</strong>. This
            requirement is enforced internally - if another nested instance of{' '}
            <strong>EuiProvider</strong> is detected, that instance will return
            early without further processing, and will{' '}
            <Link to="#enforce-usage">warn if configured to do so</Link>. Nested
            instances of <strong>EuiThemeProvider</strong>, however, are valid.
          </p>
        </EuiText>
      ),
    },
    {
      title: 'Theming and global styles',
      text: (
        <EuiText>
          <p>
            To customize the global theme of your app, use the{' '}
            <EuiCode>theme</EuiCode>, <EuiCode>colorMode</EuiCode>, and{' '}
            <EuiCode>modify</EuiCode> props (documented in{' '}
            <Link to="/theming/theme-provider">
              <strong>EuiThemeProvider</strong>
            </Link>
            ). For instance, it&apos;s likely that you will want to implement
            color mode switching at the top level:
          </p>

          <EuiCodeBlock language="tsx" fontSize="m" isCopyable>
            {"<EuiProvider colorMode={isDark ? 'dark' : 'light'} />"}
          </EuiCodeBlock>
          <EuiSpacer />

          <p>
            If you do not wish your app to include EUI's default global reset
            CSS or{' '}
            <Link to="/utilities/css-utility-classes">utility CSS classes</Link>
            , this is configurable via the <EuiCode>globalStyles</EuiCode> or{' '}
            <EuiCode>utilityClasses</EuiCode> props. You can either pass in your
            own as a React component returning an{' '}
            <EuiLink href="https://emotion.sh/docs/globals" target="_blank">
              Emotion Global
            </EuiLink>
            , or remove them completely by setting the props to{' '}
            <EuiCode>false</EuiCode>:
          </p>

          <EuiCodeBlock language="tsx" fontSize="m" isCopyable>
            {'<EuiProvider globalStyles={false} utilityClasses={false} />'}
          </EuiCodeBlock>

          <h3 id="cache-location">
            @emotion/cache and style injection location
          </h3>
          <p>
            In the case that your app has its own static stylesheet,{' '}
            <EuiCode>@emotion</EuiCode> styles may not be injected into the
            correct location in the <EuiCode>{'<head>'}</EuiCode>, causing
            unintentional overrides or unapplied styles.{' '}
            <EuiLink href="https://emotion.sh/docs/@emotion/cache" external>
              The <strong>@emotion/cache</strong> library
            </EuiLink>{' '}
            provides configuration options that help with specifying the
            injection location. We recommend using <EuiCode>{'<meta>'}</EuiCode>{' '}
            tags to achieve this.
          </p>

          <GlobalStyles />

          <p>
            For most applications, the above configuration will be enough to
            have styles ordered correctly. In advanced more cases, you may use
            the <EuiCode>default</EuiCode>,<EuiCode>global</EuiCode>, and{' '}
            <EuiCode>utility</EuiCode> properties on the{' '}
            <EuiCode>cache</EuiCode> prop to further define where specific
            styles should be inserted. See{' '}
            <EuiLink href="#euiprovider-props">the props documentation</EuiLink>{' '}
            for details.
          </p>

          <p>
            Any other options available with{' '}
            <EuiLink
              href="https://emotion.sh/docs/@emotion/cache#createcache"
              external
            >
              the <strong>createCache</strong> API
            </EuiLink>{' '}
            will be respected by EUI. Note that EUI does not include the{' '}
            <EuiCode>@emotion/cache</EuiCode> library, so you will need to add
            it to your application dependencies.
          </p>
        </EuiText>
      ),
    },
    {
      title: 'Component defaults',
      isBeta: true,
      text: (
        <EuiText>
          <EuiCallOut title="Beta status" iconType="beta">
            <p>
              This functionality is still currently in beta, and the list of
              components as well as defaults that EUI will be supporting is
              still under consideration. If you have a component you would like
              to see added, feel free to{' '}
              <EuiLink
                href="https://github.com/elastic/eui/discussions/6922"
                target="_blank"
              >
                discuss that request in EUI's GitHub repo
              </EuiLink>
              .
            </p>
          </EuiCallOut>
          <EuiSpacer />

          <p>
            All EUI components ship with a set of baseline defaults that can
            usually be configured via props. For example,{' '}
            <Link to="/utilities/focus-trap">
              <strong>EuiFocusTrap</strong>
            </Link>{' '}
            defaults to <EuiCode>crossFrame={'{false}'}</EuiCode> - i.e., it
            does not trap focus between iframes. If you wanted to change that
            behavior in your app across all instances of{' '}
            <strong>EuiFocusTrap</strong>, you would be stuck manually passing
            that prop over and over again, including in higher-level components
            (like modals, popovers, and flyouts) that utilize focus traps.
          </p>
          <p>
            <strong>EuiProvider</strong> allows overriding some component
            defaults across all component usages globally via the{' '}
            <EuiCode>componentDefaults</EuiCode> prop like so:
          </p>

          <EuiCodeBlock language="jsx" isCopyable fontSize="m">
            {euiProviderComponentDefaultsSnippet}
          </EuiCodeBlock>

          <p>
            The above example would override EUI's default table pagination size
            (50) across all usages of EUI tables and data grids, all EUI focus
            traps would trap focus even from iframes, and all EUI portals would
            be inserted at a specified position (instead of the end of the
            document body).
          </p>
          <p>
            The current list of supported components and the prop defaults they
            accept are:
          </p>
          <GuideSectionPropsTable component={EuiComponentDefaultsProps} />
        </EuiText>
      ),
    },
    {
      title: 'Enforce usage',
      text: (
        <EuiText>
          <p>
            For complex applications with multiple mount points or template
            wrappers, it may be beneficial to enable logging. Doing so will
            allow you to see warnings for duplicate{' '}
            <strong>EuiProviders</strong>, as well as when components do not
            have access to a parent <strong>EuiProvider</strong>. To enable
            logging or erroring, use <EuiCode>setEuiDevProviderWarning</EuiCode>
            :
          </p>

          <Warnings />

          <p>
            <EuiCode>setEuiDevProviderWarning</EuiCode>
            accepts three levels:
          </p>
          <ul>
            <li>
              <EuiCode>&apos;log&apos;</EuiCode>: uses{' '}
              <EuiCode>console.log</EuiCode>
            </li>
            <li>
              <EuiCode>&apos;warn&apos;</EuiCode>: uses{' '}
              <EuiCode>console.warn</EuiCode>
            </li>
            <li>
              <EuiCode>&apos;error&apos;</EuiCode>: <EuiCode>Throw</EuiCode>s an
              exception
            </li>
          </ul>
        </EuiText>
      ),
    },
    {
      title: 'EuiProvider props',
      wrapText: false,
      text: <GuideSectionPropsTable component={EuiProvider} />,
    },
  ],
};
