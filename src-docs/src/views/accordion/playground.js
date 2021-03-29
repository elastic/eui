import { PropTypes } from 'react-view';
import { EuiAccordion, EuiPanel } from '../../../../src/components/';
import { htmlIdGenerator } from '../../../../src/services';
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

  propsToUse.id = {
    ...propsToUse.id,
    value: htmlIdGenerator('generated')(),
  };

  propsToUse.children = {
    value: `<EuiPanel color="subdued">
  Any content inside of <strong>EuiAccordion</strong> will appear here.
</EuiPanel>`,
    type: PropTypes.ReactNode,
    hidden: false,
  };

  propsToUse.onToggle = simulateFunction(propsToUse.onToggle);

  propsToUse.forceState = createOptionalEnum(propsToUse.forceState);

  propsToUse.extraAction = {
    ...propsToUse.extraAction,
    type: PropTypes.String,
  };

  propsToUse.isLoadingMessage = {
    ...propsToUse.isLoadingMessage,
    type: PropTypes.String,
  };

  return {
    config: {
      componentName: 'EuiAccordion',
      props: propsToUse,
      scope: {
        EuiAccordion,
        EuiPanel,
      },
      imports: {
        '@elastic/eui': {
          named: ['EuiAccordion', 'EuiPanel'],
        },
      },
      customProps: {
        onToggle: dummyFunction,
      },
    },
  };
};
