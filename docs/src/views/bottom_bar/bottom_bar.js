
import React, {
  Component,
} from 'react';

import {
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiButtonEmpty,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBar: false,
    };
  }

  onButtonClick() {
    this.setState({
      showBar: !this.state.showBar,
    });
  }

  render() {
    const button = (
      <EuiButton color="primary" onClick={this.onButtonClick.bind(this)}>
        Toggle appearance of the bottom bar
      </EuiButton>
    );

    let bottomBar;
    if (this.state.showBar) {
      bottomBar = (
        <EuiBottomBar>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <EuiFlexGroup gutterSize="small">
                <EuiFlexItem>
                  <EuiButton color="ghost" size="small" iconType="help">Help</EuiButton>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton color="ghost" size="small" iconType="user">Add user</EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFlexGroup gutterSize="small">
                <EuiFlexItem>
                  <EuiButtonEmpty color="ghost" size="small" iconType="cross">Discard</EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiButton color="primary" fill size="small" iconType="check">Save</EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>

      );
    }

    return (
      <div>
        {button}
        {bottomBar}
      </div>
    );
  }
}
