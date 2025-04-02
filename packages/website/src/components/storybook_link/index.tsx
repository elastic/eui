import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { EuiButton } from '@elastic/eui';

type Props = {
  id: string;
};

export const StorybookLink = ({ id }: Props) => {
  const { siteConfig } = useDocusaurusContext();

  const href = `${siteConfig.customFields.storybookBaseUrl}/iframe.html?id=${id}`;

  return (
    <EuiButton iconType="popout" href={href} target="_blank">
      Open demo
    </EuiButton>
  );
};
