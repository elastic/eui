import { PropTypes } from 'react-view';
import { EuiLink } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export default () => {
  const docgenInfo = Array.isArray(EuiLink.__docgenInfo)
    ? EuiLink.__docgenInfo[0]
    : EuiLink.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.href = {
    type: PropTypes.String,
    value: 'http://www.elastic.co',
  };
  propsToUse.target = {
    type: PropTypes.String,
    value: '_blank',
  };

  propsToUse.children = {
    value: 'Link to our website',
    type: PropTypes.String,
    hidden: false,
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

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    setGhostBackground,
    config: {
      componentName: 'EuiLink',
      props: propsToUse,
      scope: {
        EuiLink,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiLink'],
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
