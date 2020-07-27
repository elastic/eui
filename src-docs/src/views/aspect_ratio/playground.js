import { PropTypes } from 'react-view';
import { EuiAspectRatio } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiAspectRatio.__docgenInfo)
    ? EuiAspectRatio.__docgenInfo[0]
    : EuiAspectRatio.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.height.value = 9;
  propsToUse.width.value = 16;

  propsToUse.children = {
    value: `<iframe
    title="Elastic is a search company"
    width="560"
    height="315"
    src="https://www.youtube.com/embed/yJarWSLRM24"
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />`,
    type: PropTypes.ReactNode,
    description: 'Visible label.',
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiAspectRatio',
      props: propsToUse,
      scope: {
        EuiAspectRatio,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiAspectRatio'],
        },
      },
    },
  };
};
