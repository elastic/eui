import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';
import {
  EuiLoadingElastic,
  EuiLoadingChart,
  EuiLoadingLogo,
  EuiLoadingSpinner,
  EuiLoadingContent,
} from '../../../../src/components/';
import { PropTypes } from 'react-view';

export const loadingElasticConfig = () => {
  const docgenInfo = Array.isArray(EuiLoadingElastic.__docgenInfo)
    ? EuiLoadingElastic.__docgenInfo[0]
    : EuiLoadingElastic.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'EuiLoadingElastic',
      props: propsToUse,
      scope: {
        EuiLoadingElastic,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiLoadingElastic'],
        },
      },
    },
  };
};

export const loadingChartConfig = () => {
  const docgenInfo = Array.isArray(EuiLoadingChart.__docgenInfo)
    ? EuiLoadingChart.__docgenInfo[0]
    : EuiLoadingChart.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'EuiLoadingChart',
      props: propsToUse,
      scope: {
        EuiLoadingChart,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiLoadingChart'],
        },
      },
    },
  };
};

export const loadingLogoConfig = () => {
  const docgenInfo = Array.isArray(EuiLoadingLogo.__docgenInfo)
    ? EuiLoadingLogo.__docgenInfo[0]
    : EuiLoadingLogo.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);
  propsToUse.logo = iconValidator(propsToUse.logo);

  return {
    config: {
      componentName: 'EuiLoadingLogo',
      props: propsToUse,
      scope: {
        EuiLoadingLogo,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiLoadingLogo'],
        },
      },
    },
  };
};

export const loadingSpinnerConfig = () => {
  const docgenInfo = Array.isArray(EuiLoadingSpinner.__docgenInfo)
    ? EuiLoadingSpinner.__docgenInfo[0]
    : EuiLoadingSpinner.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'EuiLoadingSpinner',
      props: propsToUse,
      scope: {
        EuiLoadingSpinner,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiLoadingSpinner'],
        },
      },
    },
  };
};

export const loadingContentConfig = () => {
  const docgenInfo = Array.isArray(EuiLoadingContent.__docgenInfo)
    ? EuiLoadingContent.__docgenInfo[0]
    : EuiLoadingContent.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.lines = {
    ...propsToUse.lines,
    type: PropTypes.Number,
  };

  return {
    config: {
      componentName: 'EuiLoadingContent',
      props: propsToUse,
      scope: {
        EuiLoadingContent,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiLoadingContent'],
        },
      },
    },
  };
};
