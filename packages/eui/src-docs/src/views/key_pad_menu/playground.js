import { PropTypes } from 'react-view';
import {
  EuiKeyPadMenuItem,
  EuiIcon,
  EuiBetaBadge,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';
import * as t from '@babel/types';

export const keyPadMenuItemConfig = () => {
  const docgenInfo = Array.isArray(EuiKeyPadMenuItem.__docgenInfo)
    ? EuiKeyPadMenuItem.__docgenInfo[0]
    : EuiKeyPadMenuItem.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClick.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };
  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Label',
  };

  propsToUse.betaBadgeTooltipContent = {
    ...propsToUse.betaBadgeTooltipContent,
    type: PropTypes.String,
  };

  propsToUse.betaBadgeIconType = iconValidator(propsToUse.betaBadgeIconType);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: '<EuiIcon type="dashboardApp" size="l" />',
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiKeyPadMenuItem',
      props: propsToUse,
      scope: {
        EuiKeyPadMenuItem,
        EuiIcon,
        EuiBetaBadge,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiKeyPadMenuItem', 'EuiIcon', 'EuiBetaBadge'],
        },
      },
      customProps: {
        onClick: {
          generate: (val) => {
            if (!val) return null;
            const obj = t.arrowFunctionExpression(
              [],
              t.blockStatement([]),
              false
            );
            return obj;
          },
        },
      },
    },
  };
};
