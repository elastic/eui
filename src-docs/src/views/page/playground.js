/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { PropTypes } from 'react-view';
import {
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

const tabs = `[
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
]`;

// const rightSideContent = `[
//   <EuiButton fill>Button 1</EuiButton>,
//   <EuiButton>Button 2</EuiButton>,
// ]`;
const rightSideContent =
  '[<EuiImage url="https://source.unsplash.com/400x200/?Water" height="200" />]';

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

  propsToUse.alignItems = createOptionalEnum(propsToUse.alignItems);

  // propsToUse.alignItems = {
  //   ...propsToUse.alignItems,
  //   type: PropTypes.Enum,
  //   defaultValue: '-- Choose --',
  //   options: {
  //     empty: '-- Choose --',
  //     subdued: 'subdued',
  //     secondary: 'secondary',
  //     accent: 'accent',
  //     danger: 'danger',
  //     warning: 'warning',
  //     ghost: 'ghost',
  //   },
  // };

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
      customProps: generateCustomProps(['rightSideContent', 'tabs']),
    },
  };
};
