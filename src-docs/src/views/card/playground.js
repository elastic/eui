import { PropTypes } from 'react-view';
import { EuiCard } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

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

  return {
    config: {
      componentName: 'EuiCard',
      props: propsToUse,
      scope: {
        EuiCard,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiCard'],
        },
      },
      customProps: {
        onClick: {
          generate: val => {
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
