import { PropTypes } from 'react-view';
import { EuiAccordion, EuiText } from '../../../../src/components/';
import {
  propUtilityForPlayground,
  createOptionalEnum,
  dummyFunction,
  simulateFunction,
} from '../../services/playground';

export const accordionConfig = () => {
  const docgenInfo = Array.isArray(EuiAccordion.__docgenInfo)
    ? EuiAccordion.__docgenInfo[0]
    : EuiAccordion.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.buttonContent = {
    ...propsToUse.buttonContent,
    value: 'Click me to toggle',
    type: PropTypes.String,
  };

  propsToUse.children = {
    value: `<EuiText>
    <p>
      Any content inside of <strong>EuiAccordion</strong> will appear here.
    </p>
  </EuiText>`,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.onToggle = simulateFunction(propsToUse.onToggle);

  propsToUse.forceState = createOptionalEnum(propsToUse.forceState);

  return {
    config: {
      componentName: 'EuiAccordion',
      props: propsToUse,
      scope: {
        EuiAccordion,
        EuiText,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiAccordion', 'EuiText'],
        },
      },
      customProps: {
        onToggle: dummyFunction,
      },
    },
  };
};
