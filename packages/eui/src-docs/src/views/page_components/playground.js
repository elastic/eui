import { PropTypes } from 'react-view';
import { EuiPage, EuiPageSection } from '../../../../src';
import { propUtilityForPlayground } from '../../services/playground';

export const pageConfig = () => {
  const docgenInfo = Array.isArray(EuiPage.__docgenInfo)
    ? EuiPage.__docgenInfo[0]
    : EuiPage.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    value: 'Children',
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.direction = {
    ...propsToUse.direction,
    value: 'row',
  };

  propsToUse.restrictWidth = {
    ...propsToUse.restrictWidth,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiPage',
      props: propsToUse,
      scope: {
        EuiPage,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPage'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightLayout--playground',
  };
};

export const pageSectionConfig = () => {
  const docgenInfo = Array.isArray(EuiPageSection.__docgenInfo)
    ? EuiPageSection.__docgenInfo[0]
    : EuiPageSection.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    ...propsToUse.children,
    value: 'Children',
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.restrictWidth = {
    ...propsToUse.restrictWidth,
    type: PropTypes.String,
  };

  // TODO Can we create a cust enum that can also evaluate true/false values as booleans?
  propsToUse.bottomBorder = {
    ...propsToUse.bottomBorder,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiPageSection',
      props: propsToUse,
      scope: {
        EuiPageSection,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPageSection'],
        },
      },
    },
    playgroundClassName: 'guideDemo__highlightLayout--playground',
  };
};
