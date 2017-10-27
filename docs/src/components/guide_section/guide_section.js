import PropTypes from 'prop-types';
import React, { Component } from 'react';

import {
  EuiText,
  EuiTitle,
  EuiSpacer,
  EuiTabs,
  EuiTab,
  EuiCodeBlock,
} from '../../../../src/components';

import Slugify from '../../services/string/slugify';

export class GuideSection extends Component {
  constructor(props) {
    super(props);
    this.onClickSource = this.onClickSource.bind(this);

    this.tabs = [{
      id: 'demo',
      name: 'Demo',
    }, {
      id: 'javascript',
      name: 'JavaScript',
    }, {
      id: 'html',
      name: 'HTML',
    }];

    this.state = {
      selectedTabId: 'demo',
    };
  }

  onSelectedTabChanged = id => {
    this.setState({
      selectedTabId: id,
    });
  }

  getId() {
    return Slugify.one(this.props.title);
  }

  onClickSource() {
    this.props.openCodeViewer(this.props.source, this.props.title);
  }

  componentWillMount() {
    this.props.registerSection(this.getId(), this.props.title);
  }

  componentWillUnmount() {
    this.props.unregisterSection(this.getId());
  }

  renderTabs() {
    return this.tabs.map((tab,index) => (
      <EuiTab
        onClick={() => this.onSelectedTabChanged(tab.id)}
        isSelected={tab.id === this.state.selectedTabId}
        key={index}
      >
        {tab.name}
      </EuiTab>
    ));
  }

  renderSection(type, code) {
    const typeToCodeClassMap = {
      JavaScript: 'javascript',
      HTML: 'html',
    };

    const codeClass = typeToCodeClassMap[type];

    if (code && (codeClass === this.state.selectedTabId)) {
      return (
        <div key={type} ref={type}>
          <EuiCodeBlock
            language={codeClass}
            color="dark"
            overflowHeight={400}
          >
            {code}
          </EuiCodeBlock>
        </div>
      );
    }
  }

  renderDemo() {
    if (this.props.demo && (this.state.selectedTabId === 'demo')) {
      return (
        <div>
          <div className="guideSection__space" />
          {this.props.demo}
        </div>
      );
    }
  }

  render() {

    const codeSections = this.props.source.map(sourceObject => (
      this.renderSection(sourceObject.type, sourceObject.code)
    ));

    return (
      <div className="guideSection">
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
        {this.renderDemo()}
        {codeSections}
      </div>
    );
  }
}

GuideSection.propTypes = {
  title: PropTypes.string,
  source: PropTypes.array,
  children: PropTypes.any,
  openCodeViewer: PropTypes.func,
  registerSection: PropTypes.func,
  unregisterSection: PropTypes.func,
};
