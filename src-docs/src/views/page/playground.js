/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { PropTypes } from 'react-view';
import { EuiPageHeader, EuiButton } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
  simulateFunction,
  generateCustomProps,
} from '../../services/playground';

const tabs = `[
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
]`;

const rightSideContent = `[
  <EuiButton fill>Button 1</EuiButton>,
  <EuiButton>Button 2</EuiButton>,
]`;

export default () => {
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

  propsToUse.leftSideContent = {
    ...propsToUse.leftSideContent,
    type: PropTypes.String,
  };

  propsToUse.description = {
    ...propsToUse.description,
    value: 'Example of a description.',
    type: PropTypes.String,
  };

  propsToUse.rightSideContent = simulateFunction({
    ...propsToUse.rightSideContent,
    custom: {
      value: rightSideContent,
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

  return {
    config: {
      componentName: 'EuiPageHeader',
      props: propsToUse,
      scope: {
        EuiPageHeader,
        EuiButton,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPageHeader', 'EuiButton'],
        },
      },
      customProps: generateCustomProps(['rightSideContent', 'tabs']),
    },
  };
};
