import React, { Component } from 'react';

import {
  EuiAccordion,
  EuiButton,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';


class AccordionGrow extends Component {
  state = {
    counter: 1
  }

  render() {
    const rows = [];
    for (let i = 1; i <= this.state.counter; i++) {
      rows.push(<p key={i}>Row {i}</p>);
    }

    return (
      <EuiAccordion
        id="accordion1"
        buttonContent="Click me to toggle close / open"
        initialIsOpen={true}
      >
        <EuiText>
          <EuiSpacer size='s' />
          <p>
            <EuiButton onClick={() => this.onIncrease()}>Increase height</EuiButton>
            {' '}
            <EuiButton onClick={() => this.onDecrease()}>Decrease height</EuiButton>
          </p>
          { rows }
        </EuiText>
      </EuiAccordion>
    );
  }

  onIncrease() {
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }));
  }

  onDecrease() {
    this.setState(prevState => ({
      counter: Math.max(0, prevState.counter - 1)
    }));
  }
}

export default AccordionGrow;
