import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';
import { EuiTab } from '../../../../src/components/';
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
