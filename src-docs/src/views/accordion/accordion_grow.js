/* eslint react/no-multi-comp: 0 */
/* eslint react/prefer-stateless-function: 0 */

import React, { Component } from 'react';

import {
  EuiAccordion,
  EuiButton,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

class Rows extends Component {
  state = {
    counter: 1,
  };

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
    return (
      <EuiText>
        <EuiSpacer size="s" />
        <p>
          <EuiButton onClick={() => this.onIncrease()} aria-controls={listId} aria-describedby={growingAccordianDescriptionId}>
            Increase height to {counter + 1} items
          </EuiButton>{' '}
          <EuiButton
            onClick={() => this.onDecrease()}
            isDisabled={counter === 1}>
            Decrease height to {counter - 1} item{counter > 2 && 's'}
          </EuiButton>
        </p>
		// TODO generate the listId
        <ul id={listId}>{rows}</ul>
      </EuiText>
    );
  }
}

class AccordionGrow extends Component {
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

export default AccordionGrow;
