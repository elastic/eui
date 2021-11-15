import { PropTypes } from 'react-view';
import { EuiSuperDatePicker } from '../../../../src/components/';
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
