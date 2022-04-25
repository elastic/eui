import React from 'react';
import { Link } from 'react-router-dom';

import {
  EuiText,
  EuiProvider,
  EuiCode,
  EuiCodeBlock,
  EuiLink,
  EuiSpacer,
} from '../../../../src/components';

import { GuideSectionPropsTable } from '../../components/guide_section/guide_section_parts/guide_section_props_table';

import Setup from './provider_setup';
import GlobalStyles from './provider_styles';

export const ProviderExample = {
  title: 'Provider',
  intro: (
    <EuiText>
      <p>
        <strong>EuiProvider</strong> contains all necessary context providers
        required for full functionality and styling of EUI. It currently
        includes the{' '}
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
            <EuiLink href="/#/theming/theme-provider">
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
            <EuiLink href="/#/theming/theme-provider">
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
            injection location. We recommend using a{' '}
            <EuiCode>{'<meta>'}</EuiCode> tag to achieve this.
          </p>

          <GlobalStyles />

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
      title: 'EuiProvider props',
      wrapText: false,
      text: <GuideSectionPropsTable component={EuiProvider} />,
    },
  ],
};
