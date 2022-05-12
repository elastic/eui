import { PropTypes } from 'react-view';
import {
  EuiTimelineItem,
  EuiText,
  EuiAvatar,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  createOptionalEnum,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiTimelineItem.__docgenInfo)
    ? EuiTimelineItem.__docgenInfo[0]
    : EuiTimelineItem.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.icon = {
    ...propsToUse.icon,
    type: PropTypes.ReactNode,
    value: 'email',
  };

  propsToUse.verticalAlign = {
    ...createOptionalEnum(propsToUse.verticalAlign),
    value: 'center',
  };

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: `<EuiText size="s">
    <p>
      <strong>janet@elastic.co</strong> was invited to the project
    </p>
  </EuiText>`,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiTimelineItem',
      props: propsToUse,
      scope: {
        EuiTimelineItem,
        EuiText,
        EuiAvatar,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiTimelineItem', 'EuiText', 'EuiAvatar'],
        },
      },
    },
  };
};
