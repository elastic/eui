import { PropTypes } from 'react-view';
import { EuiToast } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  createOptionalEnum,
} from '../../services/playground';
import * as t from '@babel/types';

export default () => {
  const docgenInfo = Array.isArray(EuiToast.__docgenInfo)
    ? EuiToast.__docgenInfo[0]
    : EuiToast.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.title = {
    ...propsToUse.title,
    type: PropTypes.String,
    value: 'Toast content',
  };

  propsToUse.color = createOptionalEnum(propsToUse.color);

  propsToUse.onClose = {
    ...propsToUse.onClose,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClose.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  return {
    config: {
      componentName: 'EuiToast',
      props: propsToUse,
      scope: {
        EuiToast,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiToast'],
        },
      },
      customProps: {
        onClose: {
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
