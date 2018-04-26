import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { flatten } from 'lodash';

import {
  EuiCodeBlock,
  EuiErrorBoundary,
  EuiSpacer,
  EuiTab,
  EuiTabs,
  EuiText,
  EuiTitle
} from '../../../../src/components';

import GuideProps from './guide_props';


export class GuideSection extends Component {
  constructor(props) {
    super(props);

    this.componentNames = Object.keys(props.props);

    this.tabs = [{
      name: 'Demo',
    }, {
      name: 'JavaScript',
      isCode: true,
    }, {
      name: 'HTML',
      isCode: true,
    }];

    if (this.componentNames.length) {
      this.tabs.push({
        name: 'Props',
      });
    }

    this.state = {
      selectedTab: this.tabs[0],
    };
  }

  onSelectedTabChanged = selectedTab => {
    this.setState({
      selectedTab,
    });
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

  renderText() {
    const { text } = this.props;

    if (!text) {
      return;
    }

    return [
      <EuiText key="text">{text}</EuiText>,
    ];
  }

  renderPropsForComponent = (componentName, component) => {
    return (
      <GuideProps key={componentName} componentName={componentName} component={component} />
    );
  }

  renderProps() {
    const { props } = this.props;
    return flatten(
      this.componentNames.map(componentName => this.renderPropsForComponent(componentName, props[componentName]))
    );
  }

  renderChrome() {
    let title;

    if (this.props.title) {
      title = (
        <Fragment>
          <EuiTitle>
            <h2>{this.props.title}</h2>
          </EuiTitle>
          <EuiSpacer size="m" key="textSpacer" />
        </Fragment>
      );
    }
    return (
      <div>
        <div className="guideSection__text">
          {title}
          {this.renderText()}
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
    const { code } = this.props.source.find(sourceObject => sourceObject.type === name);
    const npmImports = code
      .replace(/(from )'(..\/)+src\/components(\/?';)/, `from '@elastic/eui';`)
      .replace(/(from )'(..\/)+src\/services(\/?';)/, `from '@elastic/eui/services';`);

    return (
      <div key={name} ref={name}>
        <EuiCodeBlock
          language={codeClass}
          overflowHeight={400}
        >
          {npmImports}
        </EuiCodeBlock>
      </div>
    );
  }

  renderContent() {
    if (this.state.selectedTab.isCode) {
      return (
        <EuiErrorBoundary>
          {this.renderCode(this.state.selectedTab.name)}
        </EuiErrorBoundary>
      );
    }

    if (this.state.selectedTab.name === 'Props') {
      return (
        <EuiErrorBoundary>
          {this.renderProps()}
        </EuiErrorBoundary>
      );
    }

    return (
      <EuiErrorBoundary>
        <div>
          <div className="guideSection__space" />
          {this.props.demo}
        </div>
      </EuiErrorBoundary>
    );
  }

  render() {
    const chrome = this.renderChrome();

    return (
      <div className="guideSection" id={this.props.id}>
        {chrome}
        {this.renderContent()}
      </div>
    );
  }
}

GuideSection.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  source: PropTypes.array,
  children: PropTypes.any,
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  routes: PropTypes.object.isRequired,
  props: PropTypes.object,
};

GuideSection.defaultProps = {
  props: {},
};
