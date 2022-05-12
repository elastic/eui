import { PropTypes } from 'react-view';
import {
  EuiAutoRefresh,
  EuiAutoRefreshButton,
  EuiRefreshInterval,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export const autoRefreshConfig = () => {
  const docgenInfo = Array.isArray(EuiAutoRefresh.__docgenInfo)
    ? EuiAutoRefresh.__docgenInfo[0]
    : EuiAutoRefresh.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onRefreshChange = simulateFunction(
    propsToUse.onRefreshChange,
    true
  );

  propsToUse.append = {
    ...propsToUse.append,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiAutoRefresh',
      props: propsToUse,
      scope: {
        EuiAutoRefresh,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiAutoRefresh'],
        },
      },
      customProps: {
        onRefreshChange: dummyFunction,
      },
    },
  };
};

export const autoRefreshButtonConfig = () => {
  const docgenInfo = Array.isArray(EuiAutoRefreshButton.__docgenInfo)
    ? EuiAutoRefreshButton.__docgenInfo[0]
    : EuiAutoRefreshButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onRefreshChange = simulateFunction(
    propsToUse.onRefreshChange,
    true
  );

  return {
    config: {
      componentName: 'EuiAutoRefreshButton',
      props: propsToUse,
      scope: {
        EuiAutoRefreshButton,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiAutoRefreshButton'],
        },
      },
      customProps: {
        onRefreshChange: dummyFunction,
      },
    },
  };
};

export const refreshIntervalConfig = () => {
  const docgenInfo = Array.isArray(EuiRefreshInterval.__docgenInfo)
    ? EuiRefreshInterval.__docgenInfo[0]
    : EuiRefreshInterval.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onRefreshChange = simulateFunction(
    propsToUse.onRefreshChange,
    true
  );

  return {
    config: {
      componentName: 'EuiRefreshInterval',
      props: propsToUse,
      scope: {
        EuiRefreshInterval,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiRefreshInterval'],
        },
      },
      customProps: {
        onRefreshChange: dummyFunction,
      },
    },
  };
};
