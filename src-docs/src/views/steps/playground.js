import { PropTypes } from 'react-view';
import { EuiStep } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  createOptionalEnum,
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
