import { PropTypes } from 'react-view';
import { EuiStep, EuiStepHorizontal } from '../../../../src/components/steps';
import {
  propUtilityForPlayground,
  createOptionalEnum,
  simulateFunction,
  dummyFunction,
} from '../../services/playground';

export const stepConfig = () => {
  const docgenInfo = Array.isArray(EuiStep.__docgenInfo)
    ? EuiStep.__docgenInfo[0]
    : EuiStep.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title.value = 'Step';

  propsToUse.status = createOptionalEnum(propsToUse.status);

  propsToUse.children = {
    value: 'Do this first',
    type: PropTypes.String,
    hidden: false,
  };

  return {
    config: {
      componentName: 'EuiStep',
      props: propsToUse,
      scope: {
        EuiStep,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiStep'],
        },
      },
    },
  };
};

export const stepHorizontalConfig = () => {
  const docgenInfo = Array.isArray(EuiStepHorizontal.__docgenInfo)
    ? EuiStepHorizontal.__docgenInfo[0]
    : EuiStepHorizontal.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.title.value = 'Horizontal step';

  propsToUse.onClick = simulateFunction(propsToUse.onClick, true);

  return {
    config: {
      componentName: 'EuiStepHorizontal',
      props: propsToUse,
      scope: {
        EuiStepHorizontal,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiStepHorizontal'],
        },
      },
      customProps: {
        onClick: dummyFunction,
      },
    },
  };
};
