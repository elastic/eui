import { PropTypes } from 'react-view';
import { EuiCard, EuiIcon } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiCard.__docgenInfo)
    ? EuiCard.__docgenInfo[0]
    : EuiCard.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title = {
    ...propsToUse.title,
    type: PropTypes.String,
    value: 'This is a card',
  };

  propsToUse.description = {
    ...propsToUse.description,
    type: PropTypes.String,
    value: "Example of a card's description. Stick to one or two sentences.",
  };

  propsToUse.image = {
    ...propsToUse.image,
    type: PropTypes.String,
  };

  propsToUse.icon = {
    ...propsToUse.icon,
    type: PropTypes.ReactNode,
    value: '<EuiIcon type="logoElastic" size="xl" />',
    hidden: false,
  };

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.footer = {
    ...propsToUse.footer,
    type: PropTypes.String,
  };

  propsToUse.betaBadgeTooltipContent = {
    ...propsToUse.betaBadgeTooltipContent,
    type: PropTypes.String,
  };

  propsToUse.onClick = simulateFunction(propsToUse.onClick);

  return {
    config: {
      componentName: 'EuiCard',
      props: propsToUse,
      scope: {
        EuiCard,
        EuiIcon,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCard', 'EuiIcon'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};
