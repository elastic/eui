import { PropTypes } from 'react-view';
import {
  EuiBadge,
  EuiNotificationBadge,
  EuiBetaBadge,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  mapOptions,
} from '../../services/playground';
import { iconTypes } from '../icon/icons';

const iconOptions = mapOptions(iconTypes);

export const badgeConfig = () => {
  const docgenInfo = Array.isArray(EuiBadge.__docgenInfo)
    ? EuiBadge.__docgenInfo[0]
    : EuiBadge.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = {
    ...propsToUse.onClick,
    value: "() => console.log('Clicked')",
  };

  propsToUse.children = {
    type: PropTypes.String,
    value: 'Badge content',
    hidden: true,
  };

  propsToUse.iconType = {
    ...propsToUse.iconType,
    value: undefined,
    type: PropTypes.String,
    custom: {
      ...propsToUse.iconType.custom,
      validator: val => iconOptions[val],
    },
  };

  propsToUse.color = {
    ...propsToUse.color,
    value: undefined,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiBadge',
      props: propsToUse,
      scope: {
        EuiBadge,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiBadge'],
        },
      },
    },
  };
};

export const betaBadgeConfig = () => {
  const docgenInfo = Array.isArray(EuiBetaBadge.__docgenInfo)
    ? EuiBetaBadge.__docgenInfo[0]
    : EuiBetaBadge.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'content',
  };

  propsToUse.iconType = {
    ...propsToUse.iconType,
    value: undefined,
    type: PropTypes.String,
    custom: {
      ...propsToUse.iconType.custom,
      validator: val => iconOptions[val],
    },
  };

  return {
    config: {
      componentName: 'EuiBetaBadge',
      props: propsToUse,
      scope: {
        EuiBetaBadge,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiBetaBadge'],
        },
      },
    },
  };
};

export const notificationBadgeConfig = () => {
  const docgenInfo = Array.isArray(EuiNotificationBadge.__docgenInfo)
    ? EuiNotificationBadge.__docgenInfo[0]
    : EuiNotificationBadge.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.String,
    value: '10',
    hidden: true,
  };

  return {
    config: {
      componentName: 'EuiNotificationBadge',
      props: propsToUse,
      scope: {
        EuiNotificationBadge,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiNotificationBadge'],
        },
      },
    },
  };
};
