
import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiSpacer,
  EuiSteps,
  EuiButton,
} from '../../../../src/components';

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      status: 'incomplete',
    };

    this.handleComplete = this.handleComplete.bind(this);
  }

  handleComplete() {
    this.setState({
      status: 'complete',
    });
  }

  render() {

    let button;
    if (this.state.status === 'incomplete') {
      button = (
        <EuiButton onClick={this.handleComplete}>You complete me</EuiButton>
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
            <p>
              I am a fancy button just waiting to be pushed!
            </p>
            <EuiSpacer />
            {button}
          </Fragment>
        ),
        status: this.state.status,
      },
    ];

    return (
      <div>
        <EuiSteps
          steps={firstSetOfSteps}
        />

      </div>
    );
  }
}
