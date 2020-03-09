import {
  EuiAccordion,
  EuiText,
  EuiTextColor,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFieldPassword,
  EuiIcon,
  EuiTextArea,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiButtonIcon,
  EuiSpacer,
  EuiCode,
  EuiButton,
  EuiScreenReaderOnly,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services/accessibility/html_id_generator';

/* 
  Unstyled Accordian
*/
export const accordianUnstyledScope = { EuiCode, EuiAccordion, EuiText };
export const accordianUnstyledLiveDemoCode = `const Accordian = () => (
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

/* 
  Arrow Accordian
*/
export const accordianArrowScope = {
  EuiAccordion,
  EuiText,
  EuiCode,
  EuiSpacer,
};
export const accordianArrowLiveDemoCode = `const Accordian = () => (
  <div>
    <EuiAccordion
      id="accordion10"
      buttonContent="Arrows default to the left"
      paddingSize="s">
      <EuiText>
        <p>
          Any content inside of <EuiCode>EuiAccordion</EuiCode> will appear
          here.
        </p>
      </EuiText>
    </EuiAccordion>
    <EuiSpacer />
    <EuiAccordion
      id="accordion11"
      arrowDisplay="right"
      buttonContent="This one has it on the right"
      paddingSize="s">
      <EuiText>
        <p>
          Any content inside of <EuiCode>EuiAccordion</EuiCode> will appear
          here.
        </p>
      </EuiText>
    </EuiAccordion>
    <EuiSpacer />
    <EuiAccordion
      id="accordion12"
      arrowDisplay="none"
      buttonContent="This one has it removed entirely"
      paddingSize="s">
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

/* 
  Multiple Accordian
*/
export const accordianMultipleScope = { EuiSpacer, EuiAccordion, EuiText };
export const accordianMultipleLiveDemoCode = `const Accordian = () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="An accordion with padding applied through props"
      paddingSize="l">
      <EuiText>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
      </EuiText>
    </EuiAccordion>

    <EuiSpacer />

    <EuiAccordion
      id="accordion2"
      buttonContent="A second accordion with padding and a very long title that should truncate because of eui-textTruncate"
      buttonContentClassName="eui-textTruncate"
      paddingSize="l">
      <EuiText>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
      </EuiText>
    </EuiAccordion>

    <EuiSpacer />

    <EuiAccordion
      id="accordion3"
      buttonContent="A third accordion with a nested accordion"
      paddingSize="m">
      <EuiText>
        <p>
          This content area will grow to accomodate when the accordion below
          opens
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiAccordion id="accordion4" buttonContent="A fourth nested accordion">
        <EuiText>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
        </EuiText>
      </EuiAccordion>
      <EuiSpacer />
    </EuiAccordion>
  </div>
);
render(<Accordian />);`;

/* 
  Extra Accordian
*/
export const accordianExtraScope = { EuiButton, EuiAccordion };
export const accordianExtraLiveDemoCode = `const Accordian = () => (
  <EuiAccordion
    id="accordionExtra"
    buttonContent="Click to open"
    extraAction={<EuiButton size="s">Extra action!</EuiButton>}
    paddingSize="l">
    <div>Opened content.</div>
  </EuiAccordion>
);
render(<Accordian />);`;

/* 
  Open Accordian
*/
export const accordianOpenScope = { EuiAccordion, EuiText, EuiCode };
export const accordianOpenLiveDemoCode = `const Accordian = () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="I am opened by default. Click me to toggle close / open"
      initialIsOpen={true}
      paddingSize="l">
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

/* 
  Callback Accordian
*/
export const accordianCallbackScope = { EuiAccordion, EuiText, EuiCode };
export const accordianCallbackLiveDemoCode = `const Accordian = () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="I have an \`onToggle\` callback"
      onToggle={isOpen =>
        console.log(\`EuiAccordion is now \${isOpen ? 'open' : 'closed'}\`)
      }
      paddingSize="l">
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

/* 
  Grow Accordian
*/
export const accordianGrowScope = {
  EuiAccordion,
  EuiButton,
  EuiSpacer,
  EuiText,
  EuiScreenReaderOnly,
  htmlIdGenerator,
};
export const accordianGrowLiveDemoCode = `class Rows extends React.Component {
  constructor() {
    super()
    this.state = { counter: 1, }
  }

  onIncrease() {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }));
  }

  onDecrease() {
    this.setState(prevState => ({
      counter: Math.max(0, prevState.counter - 1),
    }));
  }

  render() {
    const rows = [];
    const { counter } = this.state;
    for (let i = 1; i <= counter; i++) {
      rows.push(<li key={i}>Row {i}</li>);
    }
    const growingAccordianDescriptionId = htmlIdGenerator()();
    const listId = htmlIdGenerator()();
    return (
      <EuiText>
        <EuiScreenReaderOnly>
          <p id={growingAccordianDescriptionId}>
            Currently height is set to {counter} items
          </p>
        </EuiScreenReaderOnly>
        <EuiSpacer size="s" />
        <p>
          <EuiButton
            onClick={() => this.onIncrease()}
            aria-controls={listId}
            aria-describedby={growingAccordianDescriptionId}>
            Increase height to {counter + 1} items
          </EuiButton>{' '}
          <EuiButton
            aria-controls={listId}
            aria-describedby={growingAccordianDescriptionId}
            onClick={() => this.onDecrease()}
            isDisabled={counter === 1}>
            Decrease height to {counter - 1} item{counter > 2 && 's'}
          </EuiButton>
        </p>
        <ul id={listId}>{rows}</ul>
      </EuiText>
    );
  }
}

class AccordionGrow extends React.Component {
  render() {
    return (
      <EuiAccordion
        id="accordion1"
        buttonContent="Click me to toggle close / open"
        initialIsOpen={true}
        paddingSize="l">
        <Rows />
      </EuiAccordion>
    );
  }
}
render(<AccordionGrow />);`;

/* 
  Form Accordian
*/
export const accordianFormScope = {
  EuiAccordion,
  EuiText,
  EuiTextColor,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiFieldPassword,
  EuiIcon,
  EuiTextArea,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiButtonIcon,
};
export const accordianFormLiveDemoCode = `const repeatableForm = (
  <EuiForm>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiFormRow label="Username">
          <EuiFieldText icon="user" placeholder="John" />
        </EuiFormRow>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiFormRow
          label="Password"
          helpText="Must include one number and one symbol">
          <EuiFieldPassword icon="lock" />
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="m" />

    <EuiFormRow label="Body">
      <EuiTextArea placeholder="I am a textarea, put some content in me!" />
    </EuiFormRow>
  </EuiForm>
);

const buttonContent = (
  <div>
    <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiIcon type="logoWebhook" size="m" />
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiTitle size="s" className="euiAccordionForm__title">
          <h6>Webhook</h6>
        </EuiTitle>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiText size="s">
      <p>
        <EuiTextColor color="subdued">
          Will send a POST request to www.example.com/some/path/
        </EuiTextColor>
      </p>
    </EuiText>
  </div>
);

const extraAction = (
  <EuiButtonIcon
    iconType="cross"
    color="danger"
    className="euiAccordionForm__extraAction"
    aria-label="Delete"
  />
);

const Accordian = () => (
  <div>
  <EuiTitle size="s">
    <h3>I am a complicated, highly styled, repeatable form!</h3>
  </EuiTitle>

  <EuiSpacer size="l" />

  <EuiAccordion
    id="accordionForm1"
    className="euiAccordionForm"
    buttonClassName="euiAccordionForm__button"
    buttonContent={buttonContent}
    extraAction={extraAction}
    paddingSize="l">
    {repeatableForm}
  </EuiAccordion>

  <EuiAccordion
    id="accordionForm2"
    className="euiAccordionForm"
    buttonClassName="euiAccordionForm__button"
    buttonContent={buttonContent}
    extraAction={extraAction}
    paddingSize="l">
    {repeatableForm}
  </EuiAccordion>
</div>
);
render(<Accordian />);`;
