import { PropTypes } from 'react-view';
import { EuiExpression } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';

export const expressionConfig = () => {
  const docgenInfo = Array.isArray(EuiExpression.__docgenInfo)
    ? EuiExpression.__docgenInfo[0]
    : EuiExpression.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.String,
    value: '100',
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

  propsToUse.description = {
    ...propsToUse.description,
    type: PropTypes.String,
    value: 'Is above',
  };

  propsToUse.descriptionWidth = {
    ...propsToUse.descriptionWidth,
    type: PropTypes.Number,
  };

  return {
    config: {
      componentName: 'EuiExpression',
      props: propsToUse,
      scope: {
        EuiExpression,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiExpression'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};
