import React, { Component } from 'react';

import {
  EuiProgress,
  EuiSpacer,
  EuiButton,
  EuiText,
  EuiPanel,
  EuiCallOut,
  EuiCode,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiPortal,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      showProgress: false,
      showHeader: false,
    };

    this.toggleProgress = this.toggleProgress.bind(this);
    this.toggleHeader = this.toggleHeader.bind(this);
  }

  toggleProgress() {
    const currentState = this.state.showProgress;

    if (!currentState) {
      this.timer = setTimeout(() => this.progress(0), 250);
    } else {
      clearTimeout(this.timer);
      this.setState({ value: 0 });
    }

    this.setState({
      showProgress: !this.state.showProgress,
      showHeader: false,
    });
  }

  toggleHeader() {
    this.setState({
      showHeader: !this.state.showHeader,
      showProgress: false,
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(value) {
    if (value > 100) {
      this.setState({ value: 100 });
    } else {
      this.setState({ value });
      const diff = Math.round(Math.random() * 10);
      this.timer = setTimeout(() => this.progress(value + diff), 250);
    }
  }

  render() {
    let progress = null;

    if (this.state.showProgress) {
      progress = (
        <div>
          <EuiCallOut title="Look up!" color="warning" iconType="sortUp">
            <p>The progress bar is fixed to the top of your browser.</p>
          </EuiCallOut>
          <EuiProgress
            value={this.state.value}
            max={100}
            size="s"
            position="fixed"
          />
        </div>
      );
    }

    if (this.state.showHeader) {
      progress = (
        <div>
          <EuiCallOut title="Look up!" color="warning" iconType="sortUp">
            <p>
              The progress bar is fixed to the top of your browser and
              positioned above an <EuiCode>EuiHeader</EuiCode>.
            </p>
          </EuiCallOut>
          <EuiHeader
            style={{ position: 'fixed', top: 0, left: 0, width: '100%' }}>
            <EuiHeaderSection grow={false}>
              <EuiHeaderSectionItem border="right">
                <EuiHeaderLogo
                  iconType="logoKibana"
                  href="#"
                  aria-label="Go to home page"
                />
              </EuiHeaderSectionItem>
            </EuiHeaderSection>
          </EuiHeader>
          <div style={{ position: 'absolute', zIndex: '5' }}>
            <EuiPortal>
              <EuiProgress size="xs" color="accent" position="fixed" />
            </EuiPortal>
          </div>
        </div>
      );
    }

    return (
      <div>
        <EuiPanel style={{ width: 300, position: 'relative' }}>
          <EuiProgress size="xs" color="accent" position="absolute" />
          <EuiText>
            <h2>Absolutely!</h2>
            <p>
              The progress bar is absolutely positioned in this panel. You could
              see how this might be useful in our Toast component.
            </p>
          </EuiText>
        </EuiPanel>

        <EuiSpacer size="l" />

        <EuiFlexGroup gutterSize="s" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiButton size="s" onClick={this.toggleProgress}>
              Toggle a fixed bar
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton size="s" onClick={this.toggleHeader}>
              Toggle a fixed bar with header
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l" />

        {progress}
      </div>
    );
  }
}
