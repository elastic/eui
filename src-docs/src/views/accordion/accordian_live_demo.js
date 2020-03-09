import { EuiAccordion, EuiText, EuiCode } from '../../../../src/components';

export const accordianScope = { EuiCode, EuiAccordion, EuiText };
export const accordianLiveDemoCode = `const Accordian = () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="Click me to toggle open / close">
      <EuiText>
        <p>
          Any content inside of <EuiCode>EuiAccordion</EuiCode> will appear
          here.
        </p>
      </EuiText>
    </EuiAccordion>
  </div>
);
render(<Accordian />);`;
