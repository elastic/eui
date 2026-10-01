import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { EuiButton } from '@elastic/eui';

type Props = {
  id: string;
};

export const StorybookLink = ({ id }: Props) => {
  const { siteConfig } = useDocusaurusContext();

  const href = `${
    siteConfig.customFields.storybookBaseUrl
  }/index.html?path=/story/${encodeURIComponent(id)}`;

  return (
    <EuiButton iconType="external" href={href} target="_blank">
      Open demo
    </EuiButton>
  );
};
