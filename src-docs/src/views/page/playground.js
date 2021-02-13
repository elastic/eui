/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { PropTypes } from 'react-view';
import {
  EuiPageTemplate,
  EuiPageHeader,
  EuiButton,
  EuiTabs,
  EuiImage,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  simulateFunction,
  generateCustomProps,
  createOptionalEnum,
} from '../../services/playground';

export const pageTemplateConfig = () => {
  const docgenInfo = Array.isArray(EuiPageTemplate.__docgenInfo)
    ? EuiPageTemplate.__docgenInfo[0]
    : EuiPageTemplate.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.pageHeader = simulateFunction({
    ...propsToUse.pageHeader,
    custom: {
      value: '{ pageTitle: "Page title" }',
    },
  });

  propsToUse.children = {
    ...propsToUse.children,
    value: 'Children',
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.pageSideBar = {
    ...propsToUse.pageSideBar,
    value: 'Side bar',
    type: PropTypes.String,
    hidden: false,
  };

  propsToUse.restrictWidth = {
    ...propsToUse.restrictWidth,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiPageTemplate',
      props: propsToUse,
      scope: {
        EuiPageTemplate,
        EuiPageHeader,
        EuiButton,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPageTemplate', 'EuiPageHeader', 'EuiButton'],
        },
      },
      customProps: generateCustomProps(['pageHeader']),
    },
  };
};

const tabs = `[
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
]`;

const rightSideItems = `[
  <EuiButton fill>Button 1</EuiButton>,
  <EuiButton>Button 2</EuiButton>,
]`;

// TODO: Try later to find build a toggle that allows switching between different types of content to pass
// const rightSideItems =
//   '[<EuiImage url="https://source.unsplash.com/400x200/?Water" height="200" />]';

export const pageHeaderConfig = () => {
  const docgenInfo = Array.isArray(EuiPageHeader.__docgenInfo)
    ? EuiPageHeader.__docgenInfo[0]
    : EuiPageHeader.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.iconType = iconValidator(propsToUse.iconType);

  propsToUse.pageTitle = {
    ...propsToUse.pageTitle,
    type: PropTypes.String,
    value: 'Page title',
  };

  propsToUse.description = {
    ...propsToUse.description,
    value: 'Example of a description.',
    type: PropTypes.String,
  };

  propsToUse.rightSideItems = simulateFunction({
    ...propsToUse.rightSideItems,
    custom: {
      value: rightSideItems,
    },
  });

  propsToUse.tabs = simulateFunction({
    ...propsToUse.tabs,
    custom: {
      value: tabs,
    },
  });

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.alignItems = createOptionalEnum(propsToUse.alignItems);

  return {
    config: {
      componentName: 'EuiPageHeader',
      props: propsToUse,
      scope: {
        EuiPageHeader,
        EuiButton,
        EuiTabs,
        EuiImage,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPageHeader', 'EuiButton', 'EuiTabs', 'EuiImage'],
        },
      },
      customProps: generateCustomProps(['rightSideItems', 'tabs']),
    },
  };
};
