import { PropTypes } from 'react-view';
import { EuiPageHeader } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export default () => {
  const docgenInfo = Array.isArray(EuiPageHeader.__docgenInfo)
    ? EuiPageHeader.__docgenInfo[0]
    : EuiPageHeader.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.pageTitle = {
    ...propsToUse.pageTitle,
    type: PropTypes.String,
    value: 'Page title',
  };

  propsToUse.leftSideContent = {
    ...propsToUse.leftSideContent,
    type: PropTypes.Custom,
    // value: undefined,
    custom: {
      use: 'textarea',
      label: 'Anything',
    },
  };

  propsToUse.description = {
    ...propsToUse.description,
    type: PropTypes.String,
  };

  propsToUse.rightSideContent = {
    ...propsToUse.rightSideContent,
    type: PropTypes.Array,
  };

  return {
    config: {
      componentName: 'EuiPageHeader',
      props: propsToUse,
      scope: {
        EuiPageHeader,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPageHeader'],
        },
      },
    },
  };
};
