import { propUtilityForPlayground } from '../../services/playground';
import { EuiLoadingElastic } from '../../../../src/components/';

export const loadingConfig = () => {
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
