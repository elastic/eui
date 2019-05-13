import React, { Component, Fragment } from 'react';

import { EuiSpacer, EuiSteps, EuiButton } from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'incomplete',
    };

    this.handleComplete = this.handleComplete.bind(this);
    this.handleWarning = this.handleWarning.bind(this);
    this.handleDanger = this.handleDanger.bind(this);
    this.makeIncomplete = this.makeIncomplete.bind(this);
  }

  handleComplete() {
    this.setState({
      status: 'complete',
    });
  }

  handleWarning() {
    this.setState({
      status: 'warning',
    });
  }

  handleDanger() {
    this.setState({
      status: 'danger',
    });
  }

  makeIncomplete() {
    this.setState({
      status: 'incomplete',
    });
  }

  render() {
    let completeButton;
    if (this.state.status !== 'complete') {
      completeButton = (
        <EuiButton onClick={this.handleComplete}>You complete me</EuiButton>
      );
    } else {
      completeButton = (
        <EuiButton onClick={this.makeIncomplete}>Reset</EuiButton>
      );
    }

    let warningButton;
    if (this.state.status !== 'warning') {
      warningButton = (
        <EuiButton color="warning" onClick={this.handleWarning}>
          Uh oh!
        </EuiButton>
      );
    } else {
      warningButton = (
        <EuiButton color="warning" onClick={this.makeIncomplete}>
          Reset
        </EuiButton>
      );
    }

    let dangerButton;
    if (this.state.status !== 'danger') {
      dangerButton = (
        <EuiButton color="danger" onClick={this.handleDanger}>
          Something terrible
        </EuiButton>
      );
    } else {
      dangerButton = (
        <EuiButton color="danger" onClick={this.makeIncomplete}>
          Reset
        </EuiButton>
      );
    }

    const firstSetOfSteps = [
      {
        title: 'Normal step',
        children: <p>Do this first</p>,
      },
      {
        title: 'Push the button to complete this final step',
        children: (
          <Fragment>
            <p>We are fancy buttons just waiting to be pushed!</p>
            <EuiSpacer />
            {completeButton} {warningButton} {dangerButton}
          </Fragment>
        ),
        status: this.state.status,
      },
    ];

    return (
      <div>
        <EuiSteps steps={firstSetOfSteps} />
      </div>
    );
  }
}
