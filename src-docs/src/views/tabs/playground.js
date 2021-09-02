import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';
import { EuiTab, EuiTabs } from '../../../../src/components/';
import { PropTypes } from 'react-view';

export const tabConfig = () => {
  const docgenInfo = Array.isArray(EuiTab.__docgenInfo)
    ? EuiTab.__docgenInfo[0]
    : EuiTab.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = {
    ...propsToUse.onClick,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onClick.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.String,
    value: 'Tab content',
  };

  return {
    config: {
      componentName: 'EuiTab',
      props: propsToUse,
      scope: {
        EuiTab,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiTab'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};

export const tabsConfig = () => {
  const docgenInfo = Array.isArray(EuiTabs.__docgenInfo)
    ? EuiTabs.__docgenInfo[0]
    : EuiTabs.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    value:
      '<EuiTab>Tab 1</EuiTab><EuiTab isSelected>Tab 2</EuiTab><EuiTab disabled>Tab 3</EuiTab><EuiTab href="#">Tab link</EuiTab>',
    type: PropTypes.ReactNode,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiTabs',
      props: propsToUse,
      scope: {
        EuiTabs,
        EuiTab,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiTabs', 'EuiTab'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};
