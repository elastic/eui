import { PropTypes } from 'react-view';
import { EuiTitle } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const titleConfig = () => {
  const docgenInfo = Array.isArray(EuiTitle.__docgenInfo)
    ? EuiTitle.__docgenInfo[0]
    : EuiTitle.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: '<h2>Text content</h2>',
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiTitle',
      props: propsToUse,
      scope: {
        EuiTitle,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiTitle'],
        },
      },
    },
  };
};
