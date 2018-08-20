import React, { Component } from 'react';

import {
  EuiWindowEvent,
  EuiIcon,
  EuiButton,
  EuiSpacer,
} from '../../../../src/components';

export class WindowEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stars: []
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  add() {
    this.setState((state) => ({ stars: [...state.stars, <EuiIcon type="starEmpty" />] }));
  }

  remove({ key }) {
    if (key === 'Backspace' || key === 'Delete') {
      this.setState((state) => ({ stars: state.stars.slice(0, -1) }));
      return;
    }
  }

  render() {
    const { stars } = this.state;
    return (
      <div>
        <EuiWindowEvent event="keydown" handler={this.remove} />
        <EuiButton onClick={this.add}>Add a Star</EuiButton>

        <EuiSpacer size="m" />

        <p>To remove a star, press the backspace or delete key.</p>

        <EuiSpacer size="m" />

        <div className="stars-container">
          {stars.map((star, i) => <span key={i} style={{ marginRight: '5px' }}>{star}</span>)}
        </div>
      </div>
    );
  }
}
