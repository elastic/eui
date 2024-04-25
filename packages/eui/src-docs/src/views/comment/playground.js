import { PropTypes } from 'react-view';
import { EuiComment, EuiText } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiComment.__docgenInfo)
    ? EuiComment.__docgenInfo[0]
    : EuiComment.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: `<EuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </p>
  </EuiText>`,
    hidden: false,
  };

  propsToUse.username = {
    ...propsToUse.username,
    type: PropTypes.String,
    value: 'Juana',
  };

  propsToUse.timestamp = {
    ...propsToUse.timestamp,
    type: PropTypes.String,
    value: 'Jan 1, 2020',
  };
  propsToUse.event = {
    ...propsToUse.event,
    type: PropTypes.String,
    value: 'added a comment',
  };

  return {
    config: {
      componentName: 'EuiComment',
      props: propsToUse,
      scope: {
        EuiComment,
        EuiText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiComment', 'EuiText'],
        },
      },
    },
  };
};
