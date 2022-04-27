import { EuiAccordion, EuiPanel } from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const noArrowAccordionId = useGeneratedHtmlId({ prefix: 'noArrowAccordion' });

  return (
    <EuiAccordion
      id={noArrowAccordionId}
      arrowDisplay="none"
      buttonContent="This one has it removed entirely"
    >
      <EuiPanel color="subdued">
        Any content inside of <strong>EuiAccordion</strong> will appear here.
      </EuiPanel>
    </EuiAccordion>
  );
};
