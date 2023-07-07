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
        required for full functionality and styling of EUI. It includes{' '}
        <Link to="/theming/theme-provider">
          <strong>EuiThemeProvider</strong>
        </Link>{' '}
        for theming and writing custom styles.
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
            the root of your application.
          </p>

          <Setup />

          <p>
            See{' '}
            <EuiLink href="#/theming/theme-provider">
              <strong>EuiThemeProvider</strong>
            </EuiLink>{' '}
            for full documentation as all relevant props will pass through. For
            instance, it&apos;s likely that you will want to implement color
            mode switching at this level:
          </p>

          <EuiCodeBlock language="tsx" fontSize="m" isCopyable>
            {"<EuiProvider colorMode={isDark ? 'dark' : 'light'} />"}
          </EuiCodeBlock>

          <EuiSpacer size="s" />

          <p>
            It is not recommended to recreate the functionality of{' '}
            <strong>EuiProvider</strong> by composing its constituent parts.
            More context, functionality, and configurations will be added to{' '}
            <strong>EuiProvider</strong> in future releases. Nested instances of{' '}
            <EuiLink href="#/theming/theme-provider">
              <strong>EuiThemeProvider</strong>
            </EuiLink>
            , however, are valid.
          </p>
        </EuiText>
      ),
    },
    {
      title: 'Global styles',
      text: (
        <EuiText>
          <p>
            The provider includes general reset and global styles, applied via
            Emotion. These only need to be applied <strong>once</strong> so to
            prevent these styles from loading in nested instances of the
            provider, pass
            <EuiCode>{'globalStyles={false}'}</EuiCode>.
          </p>

          <h3>
            <EuiCode>@emotion/cache</EuiCode> and style injection location
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
            <EuiLink href="#/utilities/provider#euiprovider-props">
              the props documentation
            </EuiLink>{' '}
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
            will be respected by EUI.
          </p>

          <p>
            Note that EUI does not include the <EuiCode>@emotion/cache</EuiCode>{' '}
            library, so you will need to add it to your application
            dependencies.
          </p>
        </EuiText>
      ),
    },
    {
      title: 'Component defaults',
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
            wrappers, it may be beneficial to enable logging when components do
            not have access to a parent <EuiCode>EuiProvider</EuiCode>.
          </p>
          <p>
            <EuiCode>setEuiDevProviderWarning</EuiCode> is a function that will
            enable adding logging or erroring if the Provider is missing. It
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
              <EuiCode>&apos;error&apos;</EuiCode>: <EuiCode>Throw</EuiCode> an
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
