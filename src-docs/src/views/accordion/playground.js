import { PropTypes } from 'react-view';
import { EuiAccordion, EuiText } from '../../../../src/components/';
import propUtilityForPlayground from '../../services/playground/props';

export default () => {
  const docgenInfo = Array.isArray(EuiAccordion.__docgenInfo)
    ? EuiAccordion.__docgenInfo[0]
    : EuiAccordion.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  // propsToUse.onToggle.value = 'e => setOpen(e)';
  // propsToUse.initialIsOpen.stateful = true;
  // eslint-disable-next-line quotes
  propsToUse.buttonContent.value = `<div> Click me to toggle </div>`;
  propsToUse.children = {
    value: `<EuiText>
    <p>
      Any content inside of<strong>EuiAccordion</strong> will appear here.
    </p>
  </EuiText>`,
    type: PropTypes.ReactNode,
    description: 'Visible label.',
    hidden: true,
  };

  return {
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
  };
};
