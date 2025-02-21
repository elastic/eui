import useBaseUrl from '@docusaurus/useBaseUrl';

import {
  EuiPageTemplate,
  EuiImage,
  EuiEmptyPrompt,
  useEuiTheme,
  useIsWithinBreakpoints,
} from '@elastic/eui';
import { Demo } from '@elastic/eui-docusaurus-theme/lib/components/demo/demo.js';

import { TYPES_OF_USE_CASES } from './use_cases';
import { convertToJsxString } from './utils';

import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';
import { icon as EuiLogoSecurity } from '@elastic/eui/es/components/icon/assets/logo_security';
import { icon as EuiLogoKibana } from '@elastic/eui/es/components/icon/assets/logo_kibana';
import { icon as EuiLock } from '@elastic/eui/es/components/icon/assets/lock';
import { icon as EuiError } from '@elastic/eui/es/components/icon/assets/error';

appendIconComponentCache({
  logoSecurity: EuiLogoSecurity,
  logoKibana: EuiLogoKibana,
  lock: EuiLock,
  error: EuiError,
});

type Props = {
  radioUseCaseId: string;
};

export const SidebarSnippet = ({ radioUseCaseId }: Props) => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';

  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  const { example } = TYPES_OF_USE_CASES[radioUseCaseId];

  const single = useBaseUrl('/images/single.svg');
  const sideNav = useBaseUrl('/images/empty_prompt/side_nav.svg');

  const src = useBaseUrl(isDarkTheme ? example.iconDark : example.iconLight);
  const src2x = useBaseUrl(
    isDarkTheme ? example.iconDark2x : example.iconLight2x
  );

  const icon =
    example.iconLoading && radioUseCaseId === 'loading'
      ? example.iconLoading
      : example.iconType || (
          <EuiImage
            alt={example.alt || ''}
            size="fullWidth"
            src={src}
            srcSet={`${src} 1x, ${src2x} 2x`}
          />
        );

  const snippet = convertToJsxString(
    <EuiPageTemplate minHeight="0" offset={0} style={{ minHeight: 420 }}>
      <EuiPageTemplate.Sidebar minWidth="25%" style={{ maxWidth: 200 }}>
        <EuiImage
          alt="Fake side nav list"
          size={isMobileSize ? 'original' : 'fullWidth'}
          url={isMobileSize ? single : sideNav}
        />
      </EuiPageTemplate.Sidebar>
      <EuiPageTemplate.Section alignment="center">
        <EuiEmptyPrompt
          actions={example.actions}
          body={example.body}
          color={radioUseCaseId === 'error' ? 'danger' : 'subdued'}
          icon={icon}
          layout={example.layout ?? 'vertical'}
          title={example.title}
          titleSize="m"
        />
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );

  return (
    <Demo
      key={`${radioUseCaseId}-${colorMode}`}
      previewPadding="s"
      scope={{ EuiLogoSecurity, EuiLogoKibana, EuiLock, EuiError }}
    >
      {snippet}
    </Demo>
  );
};
