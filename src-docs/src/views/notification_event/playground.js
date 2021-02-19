import { PropTypes } from 'react-view';
import {
  propUtilityForPlayground,
  simulateFunction,
  dummyFunction,
} from '../../services/playground';
import { EuiNotificationEventReadButton } from '../../../../src/components/';

export const notificationEventReadButtonConfig = () => {
  const docgenInfo = Array.isArray(EuiNotificationEventReadButton.__docgenInfo)
    ? EuiNotificationEventReadButton.__docgenInfo[0]
    : EuiNotificationEventReadButton.__docgenInfo;

  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.eventName = {
    ...propsToUse.eventName,
    value: 'alert-critical-01',
    type: PropTypes.String,
  };

  propsToUse.onClick = simulateFunction(propsToUse.onClick, true);

  return {
    config: {
      componentName: 'EuiNotificationEventReadButton',
      props: propsToUse,
      scope: {
        EuiNotificationEventReadButton,
      },
      customProps: {
        onClick: dummyFunction,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiNotificationEventReadButton'],
        },
      },
    },
  };
};
