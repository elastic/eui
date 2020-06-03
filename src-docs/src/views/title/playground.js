import { PropTypes } from 'react-view';
import { EuiTitle } from '../../../../src/components/';
import propUtilityForPlayground from '../../services/playground/props';

export default () => {
  const docgenInfo = Array.isArray(EuiTitle.__docgenInfo)
    ? EuiTitle.__docgenInfo[0]
    : EuiTitle.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);
  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    // eslint-disable-next-line quotes
    value: `<h2>Text content</h2>`,
  };

  return {
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
  };
};
