import { ReactNode } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {
  EuiPageTemplate,
  EuiFlexGrid,
  EuiFlexItem,
  EuiPanel,
  EuiImage,
  EuiEmptyPrompt,
  useEuiTheme,
  EuiLoadingSpinner,
} from '@elastic/eui';
import { Demo } from '@elastic/eui-docusaurus-theme/components';

import { TYPES_OF_USE_CASES } from './use_cases';
import { convertToJsxString } from './utils';

type Props = {
  radioUseCaseId: string;
};

export const MultipleSnippet = ({ radioUseCaseId }: Props) => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';

  const { example } = TYPES_OF_USE_CASES[radioUseCaseId];

  const contentCenter = useBaseUrl('/images/empty_prompt/content_center.svg');

  const src = useBaseUrl(isDarkTheme ? example.iconDark : example.iconLight);
  const src2x = useBaseUrl(
    isDarkTheme ? example.iconDark2x : example.iconLight2x
  );

  // Conditionally set the `icon` prop if a non-standard icon is needed
  // See EuiEmptyPrompt docs to learn more about custom icon usage
  let icon: ReactNode | undefined;
  if (example.iconLoading) {
    icon = <EuiLoadingSpinner size="l" />;
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

  const centerStyles = {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minWidth: '100%',
  };

  const snippet = convertToJsxString(
    <EuiPageTemplate minHeight="0" panelled={false} style={{ minHeight: 420 }}>
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiEmptyPrompt
            actions={example.actions}
            body={example.body}
            color={radioUseCaseId === 'error' ? 'danger' : 'plain'}
            hasBorder={!(radioUseCaseId === 'error')}
            icon={icon}
            iconType={example.iconType}
            layout={example.layout ?? 'vertical'}
            style={centerStyles}
            title={example.title}
            titleSize="s"
          />
        </EuiFlexItem>
        {[...Array(3)].map((_, i) => (
          <EuiFlexItem key={i} style={{ minHeight: '250px' }}>
            <EuiPanel color="plain" hasBorder style={centerStyles}>
              <EuiImage alt="" size="fullWidth" url={contentCenter} />
            </EuiPanel>
          </EuiFlexItem>
        ))}
      </EuiFlexGrid>
    </EuiPageTemplate>
  );

  return (
    <Demo key={`${radioUseCaseId}-${colorMode}`} previewPadding="s">
      {snippet}
    </Demo>
  );
};
