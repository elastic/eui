import { EuiPagination, EuiTablePagination } from '../../../../src/components/';
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

  propsToUse.pageCount = {
    ...propsToUse.pageCount,
    value: 22,
  };

  return {
    config: {
      componentName: 'EuiPagination',
      props: propsToUse,
      scope: {
        EuiPagination,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPagination'],
        },
      },
      customProps: {
        onPageClick: dummyFunction,
      },
    },
  };
};

export const tablePaginationConfig = () => {
  const docgenInfo = Array.isArray(EuiTablePagination.__docgenInfo)
    ? EuiTablePagination.__docgenInfo[0]
    : EuiTablePagination.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.pageCount = {
    ...propsToUse.pageCount,
    value: 22,
  };

  return {
    config: {
      componentName: 'EuiTablePagination',
      props: propsToUse,
      scope: {
        EuiTablePagination,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiTablePagination'],
        },
      },
      customProps: {
        onPageClick: dummyFunction,
      },
    },
  };
};
