import { PropTypes } from 'react-view';
import {
  EuiCard,
  EuiCheckableCard,
  EuiIcon,
} from '../../../../src/components/';
import { htmlIdGenerator } from '../../../../src/services';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
  createOptionalEnum,
} from '../../services/playground';

export const cardConfig = () => {
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
  propsToUse.display = createOptionalEnum(propsToUse.display);

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

export const checkableCardConfig = () => {
  const docgenInfo = Array.isArray(EuiCheckableCard.__docgenInfo)
    ? EuiCheckableCard.__docgenInfo[0]
    : EuiCheckableCard.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.id = {
    ...propsToUse.id,
    value: htmlIdGenerator('generated')(),
  };

  propsToUse.label = {
    ...propsToUse.label,
    type: PropTypes.String,
    value: 'Checkable card label',
  };

  propsToUse.onChange = simulateFunction(propsToUse.onChange, true);

  return {
    config: {
      componentName: 'EuiCheckableCard',
      props: propsToUse,
      scope: {
        EuiCheckableCard,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCheckableCard'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};
