import { EuiPagination, EuiText } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export const paginationConfig = () => {
  const docgenInfo = Array.isArray(EuiPagination.__docgenInfo)
    ? EuiPagination.__docgenInfo[0]
    : EuiPagination.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onPageClick = simulateFunction(propsToUse.onPageClick);
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
        onPageClick: dummyFunction,
      },
    },
  };
};
