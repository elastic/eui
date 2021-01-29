/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { PropTypes } from 'react-view';
import {
  EuiPageHeaderContent,
  EuiButton,
  EuiText,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  iconValidator,
} from '../../services/playground';

// HELP: Can we get a "simulate" toggle and pass ReactNodes?
const tabs = [
  {
    label: 'Tab 1',
    isSelected: true,
  },
  {
    label: 'Tab 2',
  },
];

const rightSideContent = [
  <EuiButton fill>Button 1</EuiButton>,
  <EuiButton>Button 2</EuiButton>,
];

export default () => {
  const docgenInfo = Array.isArray(EuiPageHeaderContent.__docgenInfo)
    ? EuiPageHeaderContent.__docgenInfo[0]
    : EuiPageHeaderContent.__docgenInfo;
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

  // HELP: NOT WORKING
  propsToUse.alignItems = {
    ...propsToUse.alignItems,
    defaultValue: 'center',
  };

  propsToUse.description = {
    ...propsToUse.description,
    type: PropTypes.String,
  };

  propsToUse.rightSideContent = {
    ...propsToUse.rightSideContent,
    type: PropTypes.Array,
  };

  propsToUse.children = {
    value: `<EuiText>
    <p>
      Any content children of <strong>EuiPageHeaderContent</strong> will appear here.
    </p>
  </EuiText>`,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiPageHeaderContent',
      props: propsToUse,
      scope: {
        EuiPageHeaderContent,
        EuiText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiPageHeaderContent', 'EuiText'],
        },
      },
    },
  };
};
