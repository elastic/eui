import { PropTypes } from 'react-view';
import { EuiButton } from '../../../../src/components/';
import propUtilityForPlayground from '../../services/playground/props';

export default () => {
  const docgenInfo = Array.isArray(EuiButton.__docgenInfo)
    ? EuiButton.__docgenInfo[0]
    : EuiButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    value: 'Button',
    type: PropTypes.ReactNode,
    description: 'Visible label.',
    hidden: true,
  };
  return {
    componentName: 'EuiButton',
    props: propsToUse,
    scope: {
      EuiButton,
    },
    imports: {
      '@elastic/eui': {
        named: ['EuiButton'],
      },
    },
  };
};
