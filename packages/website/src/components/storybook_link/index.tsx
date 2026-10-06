import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { EuiButton } from '@elastic/eui';
import { getStorybookUrl } from '@elastic/eui-docusaurus-theme/lib/utils/storybook';

type Props = {
  id: string;
};

export const StorybookLink = ({ id }: Props) => {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.customFields?.storybookBaseUrl;

  if (typeof baseUrl !== 'string') return null;

  const href = getStorybookUrl(baseUrl, id);

  return (
    <EuiButton iconType="external" href={href} target="_blank">
      Open demo
    </EuiButton>
  );
};
