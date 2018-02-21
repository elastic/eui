import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { flatten } from 'lodash';

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
  EuiTextColor,
  EuiTitle,
  EuiLink
} from '../../../../src/components';

function markup(text) {
  const regex = /(#[a-zA-Z]+)|(`[^`]+`)/g;
  return text.split(regex).map((token, index) => {
    if (!token) {
      return '';
    }
    if (token.startsWith('#')) {
      const id = token.substring(1);
      const onClick = () => {
        document.getElementById(id).scrollIntoView();
      };
      return <EuiLink key={`markup-${index}`} onClick={onClick}>{id}</EuiLink>;
    }
    if (token.startsWith('`')) {
      const code = token.substring(1, token.length - 1);
      return <EuiCode key={`markup-${index}`}>{code}</EuiCode>;
    }
    return token;

  });
}

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
      <EuiSpacer size="m" key="textSpacer" />,
      <EuiText key="text">{text}</EuiText>,
    ];
  }

  renderPropsForComponent = (componentName, component) => {
    if (!component.__docgenInfo) {
      return;
    }

    const docgenInfo = Array.isArray(component.__docgenInfo) ? component.__docgenInfo[0] : component.__docgenInfo;
    const { _euiObjectType, description, props } = docgenInfo;

    if (!props && !description) {
      return;
    }

    const propNames = Object.keys(props);

    const rows = propNames.map(propName => {
      const {
        description: propDescription,
        required,
        defaultValue,
        type,
      } = props[propName];

      let humanizedName = (
        <strong>{propName}</strong>
      );

      if (required) {
        humanizedName = (
          <span>
            <strong>{humanizedName}</strong> <EuiTextColor color="danger">(required)</EuiTextColor>
          </span>
        );
      }

      const humanizedType = humanizeType(type);

      const typeMarkup = markup(humanizedType);
      const descriptionMarkup = markup(propDescription);
      let defaultValueMarkup = '';
      if (defaultValue) {
        defaultValueMarkup = [ <EuiCode key={`defaultValue-${propName}`}>{defaultValue.value}</EuiCode> ];
        if (defaultValue.comment) {
          defaultValueMarkup.push(`(${defaultValue.comment})`);
        }
      }
      const cells = [
        (
          <EuiTableRowCell key="name">
            {humanizedName}
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="type">
            <EuiCode>{typeMarkup}</EuiCode>
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="defaultValue">
            {defaultValueMarkup}
          </EuiTableRowCell>
        ), (
          <EuiTableRowCell key="description">
            {descriptionMarkup}
          </EuiTableRowCell>
        )
      ];

      return (
        <EuiTableRow key={propName}>
          {cells}
        </EuiTableRow>
      );
    });

    const title = _euiObjectType === 'type' ?
      <EuiCode id={componentName}>{componentName}</EuiCode> :
      <EuiText>{componentName}</EuiText>;

    let descriptionElement;

    if (description) {
      descriptionElement = (
        <div key={`description-${componentName}`}>
          <EuiText>
            <p>{markup(description)}</p>
          </EuiText>
          <EuiSpacer size="m" key={`propsSpacer-${componentName}`} />
        </div>
      );
    }

    let table;

    if (rows.length) {
      table = (
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
    }

    return [
      <EuiSpacer size="m" key={`propsSpacer-${componentName}-1`} />,
      <EuiTitle size="s" key={`propsName-${componentName}`}><h3>{title}</h3></EuiTitle>,
      <EuiSpacer size="s" key={`propsSpacer-${componentName}-2`} />,
      descriptionElement,
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
    return (
      <div>
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
