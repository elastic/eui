import { useLocation } from '@docusaurus/router';
import { EuiButton } from '@elastic/eui';

type Props = {
  id: string;
  viewMode?: 'story' | 'docs' | 'settings';
};

export const StorybookLink = ({ id, viewMode = 'story' }: Props) => {
  const location = useLocation();

  // Determine the base URL based on the environment
  // This is just for the sake of POC! Long-term, it'd be better to receive the base url
  // as an environment variable
  let baseUrl: string;

  if (process.env.NODE_ENV === 'development') {
    // Potentially get the Storybook config for easier maintenance
    baseUrl = 'http://localhost:6006';
  } else if (location.pathname.includes('/pr_')) {
    const prPath = location.pathname.split('/').slice(0, 2).join('/');
    baseUrl = `https://eui.elastic.co${prPath}/storybook`;
  } else {
    baseUrl = 'https://eui.elastic.co/storybook';
  }

  // Construct the dynamic href based on the environment, `id`, and `viewMode`
  // or potentially pass the whole href as is (easy to copy-paste in docs)
  const href = `${baseUrl}/iframe.html?id=${id}&viewMode=${viewMode}`;

  return (
    <EuiButton iconType="popout" href={href} target="_blank">
      Open demo
    </EuiButton>
  );
};
