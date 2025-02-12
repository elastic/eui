import useBaseUrl from '@docusaurus/useBaseUrl';

import {
  EuiPageTemplate,
  EuiImage,
  EuiEmptyPrompt,
  useEuiTheme,
} from '@elastic/eui';
import { Demo } from '@elastic/eui-docusaurus-theme/lib/components/demo/demo.js';

import { TYPES_OF_USE_CASES } from './use_cases';
import { convertToJsxString } from './utils';

type Props = {
  radioUseCaseId: string;
};

export const EmptySnippet = ({ radioUseCaseId }: Props) => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';

  const { example } = TYPES_OF_USE_CASES[radioUseCaseId];

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
    <EuiPageTemplate minHeight="0" panelled={false} style={{ minHeight: 420 }}>
      <EuiPageTemplate.Section alignment="center">
        <EuiEmptyPrompt
          actions={example.actions}
          body={example.body}
          color={radioUseCaseId === 'error' ? 'danger' : 'plain'}
          icon={icon}
          layout={example.layout ?? 'vertical'}
          title={example.title}
          titleSize="m"
        />
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );

  return (
    <Demo key={`${radioUseCaseId}-${colorMode}`} previewPadding="s">
      {snippet}
    </Demo>
  );
};
