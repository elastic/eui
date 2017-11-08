import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  GuideSandboxChrome,
} from '..';

import {
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiTabs,
  EuiTab,
  EuiCodeBlock,
} from '../../../../src/components';

import {
  Routes,
  Slugify,
} from '../../services';

export class GuideSection extends Component {
  constructor(props) {
    super(props);

    this.tabs = [{
      name: 'Demo',
    }, {
      name: 'JavaScript',
      isCode: true,
    }, {
      name: 'HTML',
      isCode: true,
    }];

    this.state = {
      selectedTab: this.tabs[0],
      sandbox: {
        isChromeVisible: props.isSandbox ? false : undefined,
      },
    };
  }

  onSelectedTabChanged = selectedTab => {
    this.setState({
      selectedTab,
    });
  }

  onToggleSandboxChrome = () => {
    this.setState({
      sandbox: {
        isChromeVisible: !this.state.sandbox.isChromeVisible,
      },
    });
  }

  getId() {
    return Slugify.one(this.props.title);
  }

  componentWillMount() {
    this.props.registerSection(this.getId(), this.props.title);
  }

  componentWillUnmount() {
    this.props.unregisterSection(this.getId());
  }

  renderTabs() {
    return this.tabs.map(tab => (
      <EuiTab
        onClick={() => this.onSelectedTabChanged(tab)}
        isSelected={tab === this.state.selectedTab}
        key={tab.name}
      >
        {tab.name}
      </EuiTab>
    ));
  }

  renderChrome() {
    let header;

    if (this.props.isSandbox) {
      header = (
        <GuideSandboxChrome
          routes={Routes.getAppRoutes()}
          onToggleTheme={this.props.toggleTheme}
          onToggleSandboxChrome={this.onToggleSandboxChrome}
          isVisible={this.state.sandbox.isChromeVisible}
        />
      );
    }

    if (this.props.isSandbox && !this.state.sandbox.isChromeVisible) {
      return header;
    }

    return (
      <div>
        {header}
        <div className="guideSection__text">
          <EuiTitle>
            <h2>{this.props.title}</h2>
          </EuiTitle>
          <EuiSpacer size="m" />
          <EuiText>{this.props.text}</EuiText>
        </div>

        <EuiSpacer size="m" />

        <EuiTabs>
          {this.renderTabs()}
        </EuiTabs>
      </div>
    );
  }

  renderCode(name) {
    const nameToCodeClassMap = {
      JavaScript: 'javascript',
      HTML: 'html',
    };

    const codeClass = nameToCodeClassMap[name];
    const source = this.props.source.find(sourceObject => sourceObject.type === name);

    return (
      <div key={name} ref={name}>
        <EuiCodeBlock
          language={codeClass}
          color="dark"
          overflowHeight={400}
        >
          {source.code}
        </EuiCodeBlock>
      </div>
    );
  }

  renderContent() {
    if (this.state.selectedTab.isCode) {
      return this.renderCode(this.state.selectedTab.name);
    }

    return (
      <div>
        <div className="guideSection__space" />
        {this.props.demo}
      </div>
    );
  }

  render() {
    return (
      <div className="guideSection" id={this.getId()}>
        {this.renderChrome()}
        {this.renderContent()}
      </div>
    );
  }
}

GuideSection.propTypes = {
  title: PropTypes.string,
  source: PropTypes.array,
  children: PropTypes.any,
  registerSection: PropTypes.func.isRequired,
  unregisterSection: PropTypes.func.isRequired,
  isSandbox: PropTypes.bool,
  toggleTheme: PropTypes.func.isRequired,
};
