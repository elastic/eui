import { PropTypes } from 'react-view';
import {
  EuiSuperDatePicker,
  EuiSuperUpdateButton,
} from '../../../../src/components/';
import {
  propUtilityForPlayground,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export const superDatePickerConfig = () => {
  const docgenInfo = Array.isArray(EuiSuperDatePicker.__docgenInfo)
    ? EuiSuperDatePicker.__docgenInfo[0]
    : EuiSuperDatePicker.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onTimeChange = simulateFunction(propsToUse.onTimeChange, true);
  propsToUse.onRefreshChange = simulateFunction(propsToUse.onRefreshChange);

  propsToUse.isPaused = {
    ...propsToUse.isPaused,
    type: PropTypes.Boolean,
    defaultValue: true,
    value: true,
  };

  propsToUse.showUpdateButton = {
    ...propsToUse.showUpdateButton,
    type: PropTypes.Boolean,
    defaultValue: true,
    value: true,
  };

  propsToUse.locale = {
    ...propsToUse.locale,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiSuperDatePicker',
      props: propsToUse,
      scope: {
        EuiSuperDatePicker,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSuperDatePicker'],
        },
      },
      customProps: {
        onTimeChange: dummyFunction,
        onRefreshChange: dummyFunction,
      },
    },
  };
};

export const superUpdateButtonConfig = () => {
  const docgenInfo = Array.isArray(EuiSuperUpdateButton.__docgenInfo)
    ? EuiSuperUpdateButton.__docgenInfo[0]
    : EuiSuperUpdateButton.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.onClick = simulateFunction(propsToUse.onClick, true);

  return {
    config: {
      componentName: 'EuiSuperUpdateButton',
      props: propsToUse,
      scope: {
        EuiSuperUpdateButton,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiSuperUpdateButton'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};
