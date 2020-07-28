import { PropTypes } from 'react-view';
import { EuiToolTip } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export default () => {
  const docgenInfo = Array.isArray(EuiToolTip.__docgenInfo)
    ? EuiToolTip.__docgenInfo[0]
    : EuiToolTip.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: '<h4>ToolTip content</h4>',
    hidden: false,
  };

  propsToUse.title = {
    ...propsToUse.title,
    type: PropTypes.String,
    value: 'Title',
  };

  propsToUse.content = {
    ...propsToUse.content,
    type: PropTypes.String,
    value: 'Content',
  };

  propsToUse.onMouseOut = {
    ...propsToUse.onMouseOut,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onMouseOut.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  return {
    config: {
      componentName: 'EuiToolTip',
      props: propsToUse,
      scope: {
        EuiToolTip,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiToolTip'],
        },
      },
      customProps: {
        onMouseOut: {
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
