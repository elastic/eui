import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flatten } from 'lodash';

import {
  GuideSandboxChrome,
} from '../guide_sandbox';

import {
  EuiCode,
  EuiCodeBlock,
  EuiErrorBoundary,
  EuiSpacer,
  EuiTab,
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell,
  EuiTabs,
  EuiText,
  EuiTitle,
} from '../../../../src/components';


const humanizeType = type => {
  if (!type) {
    return '';
  }

  let humanizedType;

  switch (type.name) {
    case 'enum':
      if (Array.isArray(type.value)) {
        humanizedType = type.value.map(({ value }) => value).join(', ');
        break;
      }
      humanizedType = type.value;
      break;

    case 'union':
      if (Array.isArray(type.value)) {
        const unionValues = type.value.map(({ name }) => name);
        unionValues[unionValues.length - 1] = `or ${unionValues[unionValues.length - 1]}`;

        if (unionValues.length > 2) {
          humanizedType = unionValues.join(', ');
        } else {
          humanizedType = unionValues.join(' ');
        }
        break;
      }
      humanizedType = type.value;
      break;

    default:
      humanizedType = type.name;
  }

  return humanizedType;
};


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
      <EuiSpacer size="m" key="textSpacer" />,
      <EuiText key="text">{text}</EuiText>,
    ];
  }

  renderPropsForComponent = (componentName, component) => {
    if (!component.__docgenInfo) {
      return;
    }

    const docgenInfo = Array.isArray(component.__docgenInfo) ? component.__docgenInfo[0] : component.__docgenInfo;
    const { props } = docgenInfo;

    if (!props) {
      return;
    }

    const propNames = Object.keys(props);

    const rows = propNames.map(propName => {
      const {
        description,
        required,
        defaultValue,
        type,
      } = props[propName];

      let humanizedName;

      if (required) {
        humanizedName = (
          <span>
            <strong>{propName}</strong> (required)
          </span>
        );
      } else {
        humanizedName = <strong>{propName}</strong>;
      }

      const humanizedType = humanizeType(type);

      const cells = [
        (
          <EuiTableRowCell key="name">
            {humanizedName}
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="type">
            <EuiCode>{humanizedType}</EuiCode>
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="defaultValue">
            {defaultValue ? <EuiCode>{defaultValue.value}</EuiCode> : ''}
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="description">
            {description}
          </EuiTableRowCell>
        )
      ];

      return (
        <EuiTableRow key={propName}>
          {cells}
        </EuiTableRow>
      );
    });

    const table = (
      <EuiTable className="guideSectionPropsTable" compressed key={`propsTable-${componentName}`}>
        <EuiTableHeader>
          <EuiTableHeaderCell>
            Prop
          </EuiTableHeaderCell>

          <EuiTableHeaderCell>
            Type
          </EuiTableHeaderCell>

          <EuiTableHeaderCell>
            Default
          </EuiTableHeaderCell>

          <EuiTableHeaderCell>
            Note
          </EuiTableHeaderCell>
        </EuiTableHeader>

        <EuiTableBody>
          {rows}
        </EuiTableBody>
      </EuiTable>
    );

    return [
      <EuiSpacer size="m" key={`propsSpacer-${componentName}`} />,
      <EuiTitle size="s" key={`propsName-${componentName}`}><h3>{componentName}</h3></EuiTitle>,
      table,
    ];
  }

  renderProps() {
    const { props } = this.props;
    return flatten(
      this.componentNames.map(componentName => this.renderPropsForComponent(componentName, props[componentName]))
    );
  }

  renderChrome() {
    let header;

    if (this.props.isSandbox) {
      header = (
        <GuideSandboxChrome
          routes={this.props.routes.getAppRoutes()}
          onToggleTheme={this.props.toggleTheme}
          onToggleSandboxChrome={this.onToggleSandboxChrome}
          selectedTheme={this.props.theme}
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
    const source = this.props.source.find(sourceObject => sourceObject.type === name);

    return (
      <div key={name} ref={name}>
        <EuiCodeBlock
          language={codeClass}
          overflowHeight={400}
        >
          {source.code}
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
  isSandbox: PropTypes.bool,
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  routes: PropTypes.object.isRequired,
  props: PropTypes.object,
};

GuideSection.defaultProps = {
  props: {},
};
