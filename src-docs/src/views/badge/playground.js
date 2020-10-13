import { PropTypes } from 'react-view';
import {
  EuiBadge,
  EuiNotificationBadge,
  EuiBetaBadge,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  dummyFunction,
} from '../../services/playground';

export const badgeConfig = () => {
  const docgenInfo = Array.isArray(EuiBadge.__docgenInfo)
    ? EuiBadge.__docgenInfo[0]
    : EuiBadge.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClick.custom,
      use: 'switch',
      label: 'Simulate',
      modifyOtherProps: (val, state, set) => {
        if (val) {
          if (!state.onClickAriaLabel.value) {
            set('onClickAriaLabel', 'onClickAriaLabel');
          }
        } else {
          set(state.onClickAriaLabel.value, 'onClickAriaLabel');
        }
      },
    },
  };

  propsToUse.children = {
    type: PropTypes.String,
    value: 'Badge content',
    hidden: true,
    custom: {
      sanitize: (val) => {
        return val.replace(/<(?:"[^"]"['"]|'[^']'['"]|[^'">])+>/g, '');
      },
    },
  };

  propsToUse.onClickAriaLabel = {
    ...propsToUse.onClickAriaLabel,
    type: PropTypes.String,
    custom: {
      ...propsToUse.onClickAriaLabel.custom,
      checkDep: (val, state) => {
        if (state.onClick.value && !val) {
          return 'When passing onClick to EuiBadge, you must also provide onClickAriaLabel';
        }
        return undefined;
      },
    },
  };

  propsToUse.iconOnClickAriaLabel = {
    ...propsToUse.iconOnClickAriaLabel,
    type: PropTypes.String,
  };

  propsToUse.iconType = iconValidator(propsToUse.iconType);

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
      customProps: {
        onClick: dummyFunction,
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

  propsToUse.tooltipContent = {
    ...propsToUse.tooltipContent,
    type: PropTypes.String,
  };

  propsToUse.iconType = iconValidator(propsToUse.iconType);

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
