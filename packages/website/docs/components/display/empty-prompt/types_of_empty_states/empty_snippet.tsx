import { ReactNode } from 'react';

import {
  EuiPageTemplate,
  EuiImage,
  EuiEmptyPrompt,
  useEuiTheme,
} from '@elastic/eui';
import { Demo } from '@elastic/eui-docusaurus-theme/components';

import { TYPES_OF_USE_CASES } from './use_cases';
import { convertToJsxString } from './utils';
import { USE_CASE_IMAGE_URLS } from './use_case_images';

type Props = {
  radioUseCaseId: string;
};

export const EmptySnippet = ({ radioUseCaseId }: Props) => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';

  const { example } = TYPES_OF_USE_CASES[radioUseCaseId];

  const iconPath = isDarkTheme ? example.iconDark : example.iconLight;
  const icon2xPath = isDarkTheme ? example.iconDark2x : example.iconLight2x;
  const src = iconPath ? USE_CASE_IMAGE_URLS[iconPath as string] : undefined;
  const src2x = icon2xPath ? USE_CASE_IMAGE_URLS[icon2xPath as string] : undefined;

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
        src={src ?? ''}
        srcSet={src2x ? `${src} 1x, ${src2x} 2x` : undefined}
      />
    )
  }

  const snippet = convertToJsxString(
    <EuiPageTemplate minHeight="0" panelled={false} style={{ minHeight: 420 }}>
      <EuiPageTemplate.Section alignment="center">
        <EuiEmptyPrompt
          actions={example.actions}
          body={example.body}
          color={radioUseCaseId === 'error' ? 'danger' : 'plain'}
          iconType={example.iconType}
          icon={icon}
          layout={example.layout ?? 'vertical'}
          title={example.title}
          titleSize="m"
        />
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );

  const code = `import React from 'react';
import {
  EuiPageTemplate,
  EuiImage,
  EuiEmptyPrompt,
  EuiButton,
  EuiButtonEmpty,
  EuiLoadingLogo,
  EuiTitle,
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
} from '@elastic/eui';

export default () => (
  ${snippet}
);`;

  return (
    <Demo key={`${radioUseCaseId}-${colorMode}`} previewPadding="s">
      {code}
    </Demo>
  );
};
