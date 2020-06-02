import { PropTypes } from 'react-view';
import { EuiCallOut, EuiText, EuiIcon } from '../../../../src/components/';
import propUtilityForPlayground from '../../services/playground/props';

export default () => {
  const docgenInfo = Array.isArray(EuiCallOut.__docgenInfo)
    ? EuiCallOut.__docgenInfo[0]
    : EuiCallOut.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = {
    type: PropTypes.ReactNode,
    description: 'iconType label.',
    placeholder: 'icon type',
  };
  propsToUse.title.value = 'Title';

  propsToUse.children = {
    value: `<EuiText>
    <p>
      Any content inside of<strong> EuiCallOut </strong> will appear here.
    </p>
  </EuiText>`,
    type: PropTypes.ReactNode,
    description: 'Visible label.',
    hidden: true,
  };

  return {
    componentName: 'EuiCallOut',
    props: propsToUse,
    scope: {
      EuiCallOut,
      EuiText,
      EuiIcon,
    },
    imports: {
      '@elastic/eui': {
        named: ['EuiCallOut', 'EuiText'],
      },
    },
  };
};
