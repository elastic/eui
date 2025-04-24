import { ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {
  EuiPageTemplate,
  EuiImage,
  EuiEmptyPrompt,
  useEuiTheme,
  useIsWithinBreakpoints,
} from '@elastic/eui';
import { Demo } from '@elastic/eui-docusaurus-theme/components';

import { TYPES_OF_USE_CASES } from './use_cases';
import { convertToJsxString } from './utils';

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

  // Conditionally set the `icon` prop if a non-standard icon is needed
  // See EuiEmptyPrompt docs to learn more about custom icon usage
  let icon: ReactNode | undefined;
  if (example.iconLoading) {
    icon = example.iconLoading;
  } else if (example.iconLight && example.iconDark) {
    icon = (
      <EuiImage
        size="fullWidth"
        alt={example.alt ?? ''}
        src={src}
        srcSet={`${src} 1x, ${src2x} 2x`}
      />
    )
  }

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
          iconType={example.iconType}
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
    >
      {snippet}
    </Demo>
  );
};
