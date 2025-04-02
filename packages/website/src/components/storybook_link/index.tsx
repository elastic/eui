import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { EuiButton } from '@elastic/eui';

type Props = {
  id: string;
  viewMode?: 'story' | 'docs' | 'settings';
};

export const StorybookLink = ({ id, viewMode = 'story' }: Props) => {
  const { siteConfig } = useDocusaurusContext();

  const href = `${siteConfig.customFields.storybookBaseUrl}/iframe.html?id=${id}&viewMode=${viewMode}`;

  return (
    <EuiButton iconType="popout" href={href} target="_blank">
      Open demo
    </EuiButton>
  );
};
