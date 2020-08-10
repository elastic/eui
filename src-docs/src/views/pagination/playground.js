import { PropTypes } from 'react-view';
import { EuiPagination, EuiText } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';
import * as t from '@babel/types';

export const paginationConfig = () => {
  const docgenInfo = Array.isArray(EuiPagination.__docgenInfo)
    ? EuiPagination.__docgenInfo[0]
    : EuiPagination.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onPageClick = {
    ...propsToUse.onPageClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onPageClick.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  return {
    config: {
      componentName: 'EuiPagination',
      props: propsToUse,
      scope: {
        EuiPagination,
        EuiText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPagination', 'EuiText'],
        },
      },
      customProps: {
        onPageClick: {
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
