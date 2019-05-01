import React, { Component } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexItem,
  EuiFlexGroup,
  EuiMutationObserver,
  EuiPanel,
  EuiSpacer,
} from '../../../../src/components';

export class MutationObserver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastMutation: 'no changes detected',
      buttonColor: 'primary',
      items: ['Item 1', 'Item 2', 'Item 3'],
    };
  }

  toggleButtonColor = () => {
    this.setState(({ buttonColor }) => ({
      buttonColor: buttonColor === 'primary' ? 'warning' : 'primary',
    }));
  };

  addItem = () => {
    this.setState(({ items }) => ({
      items: [...items, `Item ${items.length + 1}`],
    }));
  };

  onMutation = ([{ type }]) => {
    this.setState({
      lastMutation:
        type === 'attributes'
          ? 'button class name changed'
          : 'DOM tree changed',
    });
  };

  render() {
    return (
      <div>
        <p>{this.state.lastMutation}</p>

        <EuiSpacer />

        <EuiMutationObserver
          observerOptions={{ subtree: true, attributes: true, childList: true }}
          onMutation={this.onMutation}>
          {mutationRef => (
            <div ref={mutationRef}>
              <EuiButton
                color={this.state.buttonColor}
                fill={true}
                onClick={this.toggleButtonColor}>
                Toggle button color
              </EuiButton>

              <EuiSpacer />

              <EuiFlexGroup>
                <EuiFlexItem grow={false}>
                  <EuiPanel grow={false}>
                    <ul>
                      {this.state.items.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <EuiSpacer size="s" />
                    <EuiButtonEmpty onClick={this.addItem}>
                      add item
                    </EuiButtonEmpty>
                  </EuiPanel>
                </EuiFlexItem>
              </EuiFlexGroup>
            </div>
          )}
        </EuiMutationObserver>
      </div>
    );
  }
}
