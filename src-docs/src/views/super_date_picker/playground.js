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

  // propsToUse.pageCount = {
  //   ...propsToUse.pageCount,
  //   value: 22,
  // };

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
