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
import { Demo } from '@elastic/eui-docusaurus-theme/lib/components/demo/demo.js';

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

  const icon =
    example.iconLoading && radioUseCaseId === 'loading' ? (
      <EuiLoadingSpinner size="l" />
    ) : (
      example.iconType || (
        <EuiImage
          alt={example.alt || ''}
          size="fullWidth"
          src={src}
          srcSet={`${src} 1x, ${src2x} 2x`}
        />
      )
    );

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
