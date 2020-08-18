import { EuiSpacer } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const spacerConfig = () => {
  const docgenInfo = Array.isArray(EuiSpacer.__docgenInfo)
    ? EuiSpacer.__docgenInfo[0]
    : EuiSpacer.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  return {
    config: {
      componentName: 'EuiSpacer',
      props: propsToUse,
      scope: {
        EuiSpacer,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSpacer'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightSpacer',
  };
};
