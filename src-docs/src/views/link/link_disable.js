import React, { Component } from 'react';
import {
  EuiLink,
  EuiSwitch,
  EuiSpacer,
  EuiTextColor,
} from '../../../../src/components';

export class LinkDisable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableLink: true,
    };
  }

  toggleLinkDisable = () => {
    this.setState(prevState => ({ disableLink: !prevState.disableLink }));
  };

  render() {
    return (
      <div>
        <EuiSwitch
          label="Disable Links"
          checked={this.state.disableLink}
          onChange={this.toggleLinkDisable}
        />
        <EuiSpacer size="m" />
        <p>
          This{' '}
          <EuiLink
            color="accent"
            disabled={this.state.disableLink}
            onClick={() => window.alert('Button clicked')}>
            paragraph
          </EuiLink>{' '}
          has two{this.state.disableLink ? ' disabled ' : ' enabled '}
          <EuiLink
            color="warning"
            disabled={this.state.disableLink}
            onClick={() => window.alert('Button clicked')}>
            links
          </EuiLink>{' '}
          in it.
        </p>
        <EuiSpacer size="m" />
        <EuiTextColor color="accent">
          When links are disabled, they inherit the{' '}
          <EuiLink
            color="secondary"
            disabled={this.state.disableLink}
            onClick={() => window.alert('Button clicked')}>
            color
          </EuiLink>{' '}
          of surrounding text.
        </EuiTextColor>
      </div>
    );
  }
}
