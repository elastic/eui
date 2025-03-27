import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { EuiButton } from '@elastic/eui';

import { hasPrRootUrl } from './has_pr_root_url';

type Props = {
  id: string;
  viewMode?: 'story' | 'docs' | 'settings';
};

export const StorybookLink = ({ id, viewMode = 'story' }: Props) => {
  const { siteConfig } = useDocusaurusContext();

  let baseUrl: string;

  if (process.env.NODE_ENV === 'development') {
    // Potentially get the Storybook config for easier maintenance
    baseUrl = 'http://localhost:6006';
  } else if (hasPrRootUrl(siteConfig)) {
    baseUrl = `https://eui.elastic.co/${siteConfig.customFields.prRootUrl}/storybook`;
  } else {
    baseUrl = 'https://eui.elastic.co/storybook';
  }

  const href = `${baseUrl}/iframe.html?id=${id}&viewMode=${viewMode}`;

  return (
    <EuiButton iconType="popout" href={href} target="_blank">
      Open demo
    </EuiButton>
  );
};
