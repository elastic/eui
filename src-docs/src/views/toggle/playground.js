import { PropTypes } from 'react-view';
import { EuiToggle } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
} from '../../services/playground';

export const toggleConfig = () => {
  const docgenInfo = Array.isArray(EuiToggle.__docgenInfo)
    ? EuiToggle.__docgenInfo[0]
    : EuiToggle.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.label.value = 'Is toggle on?';
  propsToUse.checked.stateful = true;
  propsToUse.children = {
    ...propsToUse.children,
    type: PropTypes.ReactNode,
    value: "{checked ? 'On' : 'Off'}",
    hidden: false,
  };

  propsToUse.value = {
    ...propsToUse.value,
    type: PropTypes.String,
  };

  propsToUse.onChange = {
    ...propsToUse.onChange,
    type: PropTypes.Custom,
    value: undefined,
    custom: {
      ...propsToUse.onChange.custom,
      use: 'switch',
      label: 'Simulate',
    },
  };

  return {
    config: {
      componentName: 'EuiToggle',
      props: propsToUse,
      scope: {
        EuiToggle,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiToggle'],
        },
      },
      customProps: {
        onChange: dummyFunction,
      },
    },
  };
};
