import { PropTypes } from 'react-view';
import { EuiCallOut, EuiText } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  mapOptions,
} from '../../services/playground';
import { iconTypes } from '../icon/icons';

export default () => {
  const docgenInfo = Array.isArray(EuiCallOut.__docgenInfo)
    ? EuiCallOut.__docgenInfo[0]
    : EuiCallOut.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);
  const options = mapOptions(iconTypes);

  propsToUse.iconType = {
    ...propsToUse.iconType,
    value: undefined,
    type: PropTypes.String,
    custom: {
      ...propsToUse.iconType.custom,
      validator: val => options[val],
    },
  };

  propsToUse.title = {
    ...propsToUse.title,
    value: 'Title',
    type: PropTypes.String,
  };

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
    config: {
      componentName: 'EuiCallOut',
      props: propsToUse,
      scope: {
        EuiCallOut,
        EuiText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCallOut', 'EuiText'],
        },
      },
    },
  };
};
