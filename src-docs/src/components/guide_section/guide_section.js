import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

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
  EuiLink,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

import { CodeSandboxLink } from '../codesandbox';

import { cleanEuiImports } from '../../services';

import { extendedTypesInfo } from './guide_section_extends';

const slugify = (str) => {
  const parts = str
    .toLowerCase()
    .replace(/[-]+/g, ' ')
    .replace(/[^\w^\s]+/g, '')
    .replace(/ +/g, ' ')
    .split(' ');
  return parts.join('-');
};

export const markup = (text) => {
  const regex = /(#[a-zA-Z]+)|(`[^`]+`)/g;
  return text.split('\n').map((token) => {
    const values = token.split(regex).map((token, index) => {
      if (!token) {
        return '';
      }
      if (token.startsWith('#')) {
        const id = token.substring(1);
        const onClick = () => {
          document.getElementById(id).scrollIntoView();
        };
        return (
          <EuiLink key={`markup-${index}`} onClick={onClick}>
            {id}
          </EuiLink>
        );
      }
      if (token.startsWith('`')) {
        const code = token.substring(1, token.length - 1);
        return <EuiCode key={`markup-${index}`}>{code}</EuiCode>;
      }
      if (token.includes('\n')) {
        return token
          .split('\n')
          .map((item) => [item, <br key={`markup-${index}`} />]);
      }
      return token;
    });
    return [...values, <br key="lineBreak" />];
  });
};

export const humanizeType = (type) => {
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
        unionValues[unionValues.length - 1] = `or ${
          unionValues[unionValues.length - 1]
        }`;

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

const nameToCodeClassMap = {
  javascript: 'javascript',
  html: 'html',
};

const tabDisplayNameMap = {
  javascript: 'Demo JS',
  html: 'Demo HTML',
  snippet: 'Snippet',
};

export class GuideSection extends Component {
  constructor(props) {
    super(props);

    this.componentNames = Object.keys(props.props);
    const hasSnippet = 'snippet' in props;

    this.tabs = [];

    if (props.demo) {
      this.tabs.push({
        name: 'demo',
        displayName: 'Demo',
      });
    }

    if (props.source) {
      props.source.map((source) => {
        this.tabs.push({
          name:
            (source.displayName && slugify(source.displayName)) ||
            tabDisplayNameMap[source.type] ||
            'tab',
          displayName:
            source.displayName || tabDisplayNameMap[source.type] || 'Tab',
          isCode: source.type || true,
          code: source.code,
        });
      });
    }

    if (hasSnippet) {
      this.tabs.push({
        name: 'snippet',
        displayName: 'Snippet',
        isCode: true,
      });
    }

    if (this.componentNames.length) {
      this.tabs.push({
        name: 'props',
        displayName: 'Props',
      });
    }

    this.state = {
      selectedTab: this.tabs.length > 0 ? this.tabs[0] : undefined,
      renderedCode: null,
      sortedComponents: {},
    };

    this.memoScroll = 0;
  }

  onSort = (componentName) => {
    const { sortedComponents } = this.state;
    if (
      !sortedComponents[componentName] ||
      sortedComponents[componentName] === 'NONE'
    ) {
      this.setState({
        sortedComponents: { ...sortedComponents, [componentName]: 'ASC' },
      });
    } else if (sortedComponents[componentName] === 'ASC') {
      this.setState({
        sortedComponents: { ...sortedComponents, [componentName]: 'DSC' },
      });
    } else {
      this.setState({
        sortedComponents: { ...sortedComponents, [componentName]: 'NONE' },
      });
    }
  };

  onSelectedTabChanged = (selectedTab) => {
    const { isCode, code } = selectedTab;
    let renderedCode = null;

    if (isCode === 'html' || isCode === 'javascript') {
      renderedCode = code;

      if (isCode === 'javascript') {
        renderedCode = renderedCode.default
          .replace(
            /(from )'(..\/)+src\/services(\/?';)/g,
            "from '@elastic/eui/lib/services';"
          )
          .replace(
            /(from )'(..\/)+src\/components\/.*?';/g,
            "from '@elastic/eui';"
          );
        renderedCode = renderedCode.split('\n');
        const linesWithImport = [];
        // eslint-disable-next-line guard-for-in
        for (const idx in renderedCode) {
          const line = renderedCode[idx];
          if (
            line.includes('import') &&
            line.includes("from '@elastic/eui';")
          ) {
            linesWithImport.push(line);
            renderedCode[idx] = '';
          }
        }
        if (linesWithImport.length > 1) {
          linesWithImport[0] = linesWithImport[0].replace(
            " } from '@elastic/eui';",
            ','
          );
          for (let i = 1; i < linesWithImport.length - 1; i++) {
            linesWithImport[i] = linesWithImport[i]
              .replace('import {', '')
              .replace(" } from '@elastic/eui';", ',');
          }
          linesWithImport[linesWithImport.length - 1] = linesWithImport[
            linesWithImport.length - 1
          ].replace('import {', '');
        }
        const newImport = linesWithImport.join('');
        renderedCode.unshift(newImport);
        renderedCode = renderedCode.join('\n');
        let len = renderedCode.replace('\n\n\n', '\n\n').length;
        while (len < renderedCode.length) {
          renderedCode = renderedCode.replace('\n\n\n', '\n\n');
          len = renderedCode.replace('\n\n\n', '\n\n').length;
        }
        renderedCode = cleanEuiImports(renderedCode);
      } else if (isCode === 'html') {
        renderedCode = code.render();
      }
    }

    this.setState({ selectedTab, renderedCode, code }, () => {
      if (isCode === 'javascript') {
        requestAnimationFrame(() => {
          const pre = this.refs.javascript.querySelector('.euiCodeBlock__pre');
          if (!pre) return;
          pre.scrollTop = this.memoScroll;
        });
      }
    });
  };

  renderTabs() {
    return this.tabs.map((tab) => (
      <EuiTab
        onClick={() => this.onSelectedTabChanged(tab)}
        isSelected={tab === this.state.selectedTab}
        key={tab.name}>
        {tab.displayName}
      </EuiTab>
    ));
  }

  renderText() {
    const { text } = this.props;

    if (!text) {
      return;
    }

    return [<EuiText key="text">{text}</EuiText>];
  }

  renderSnippet() {
    let { snippet } = this.props;

    if (this.props.source?.find((tab) => tab.type === 'snippet')) {
      snippet = this.props.source?.find((tab) => tab.type === 'snippet').code;
    }

    if (!snippet) {
      return;
    }

    let snippetCode;
    if (typeof snippet === 'string') {
      snippetCode = (
        <Fragment key="snippet">
          <EuiSpacer size="m" />
          <EuiCodeBlock language="html" fontSize="m" paddingSize="m" isCopyable>
            {snippet}
          </EuiCodeBlock>
        </Fragment>
      );
    } else {
      snippetCode = snippet.map((snip, index) => (
        <Fragment key={`snippet${index}`}>
          <EuiSpacer size="m" />
          <EuiCodeBlock language="html" fontSize="m" paddingSize="m" isCopyable>
            {snip}
          </EuiCodeBlock>
        </Fragment>
      ));
    }

    return snippetCode;
  }

  renderPropsForComponent = (componentName, component) => {
    if (!component.__docgenInfo) {
      return;
    }

    const docgenInfo = Array.isArray(component.__docgenInfo)
      ? component.__docgenInfo[0]
      : component.__docgenInfo;
    const { description, props, extendedInterfaces } = docgenInfo;

    if (!props && !description) {
      return;
    }

    const { sortedComponents } = this.state;

    const propNames = Object.keys(props);
    if (
      sortedComponents[componentName] &&
      sortedComponents[componentName] !== 'NONE'
    ) {
      propNames.sort((a, b) => {
        if (sortedComponents[componentName] === 'ASC') {
          return a < b ? -1 : 1;
        } else {
          return a < b ? 1 : -1;
        }
      });
    }

    const rows = propNames.map((propName) => {
      const {
        description: propDescription = '',
        required,
        defaultValue,
        type,
      } = props[propName];

      const codeBlockProps = {
        className: 'guideSection__tableCodeBlock',
        paddingSize: 'none',
        language: 'ts',
      };

      let humanizedName = (
        <strong className="eui-textBreakNormal">{propName}</strong>
      );

      if (required) {
        humanizedName = (
          <span>
            {humanizedName}{' '}
            <EuiTextColor color="danger">(required)</EuiTextColor>
          </span>
        );
      }

      const humanizedType = humanizeType(type);

      const functionMatches = [
        ...humanizedType.matchAll(/\([^=]*\) =>\s\w*\)*/g),
      ];
      const types = humanizedType.split(/\([^=]*\) =>\s\w*\)*/);

      const typeMarkup = (
        <span className="eui-textBreakNormal">{markup(humanizedType)}</span>
      );
      const descriptionMarkup = markup(propDescription);
      let defaultValueMarkup = '';
      if (defaultValue) {
        defaultValueMarkup = [
          <EuiCodeBlock {...codeBlockProps} key={`defaultValue-${propName}`}>
            {defaultValue.value}
          </EuiCodeBlock>,
        ];
        if (defaultValue.comment) {
          defaultValueMarkup.push(`(${defaultValue.comment})`);
        }
      }

      let defaultTypeCell = (
        <EuiTableRowCell key="type" header="Type" textOnly={false}>
          <EuiCodeBlock {...codeBlockProps}>{typeMarkup}</EuiCodeBlock>
        </EuiTableRowCell>
      );
      if (functionMatches.length > 0) {
        const elements = [];
        let j = 0;
        for (let i = 0; i < types.length; i++) {
          if (functionMatches[j]) {
            elements.push(
              <Fragment key={`type-${i}`}>
                {types[i]} <br />
              </Fragment>
            );
            elements.push(
              <Fragment key={`function-${i}`}>
                {functionMatches[j][0]} <br />
              </Fragment>
            );
            j++;
          } else {
            elements.push(
              <Fragment key={`type-${i}`}>
                {types[i]} <br />
              </Fragment>
            );
          }
        }
        defaultTypeCell = (
          <EuiTableRowCell key="type" header="Type" textOnly={false}>
            <EuiCodeBlock whiteSpace="pre" {...codeBlockProps}>
              {elements}
            </EuiCodeBlock>
          </EuiTableRowCell>
        );
      }

      const cells = [
        <EuiTableRowCell key="name" header="Prop">
          {humanizedName}
        </EuiTableRowCell>,
        defaultTypeCell,
        <EuiTableRowCell
          key="defaultValue"
          header="Default"
          hideForMobile={!defaultValue}>
          {defaultValueMarkup}
        </EuiTableRowCell>,
        <EuiTableRowCell
          key="description"
          header="Note"
          isMobileFullWidth={true}
          hideForMobile={!propDescription}>
          {descriptionMarkup}
        </EuiTableRowCell>,
      ];

      return <EuiTableRow key={propName}>{cells}</EuiTableRow>;
    });

    const extendedTypes = extendedInterfaces
      ? extendedInterfaces.filter((type) => !!extendedTypesInfo[type])
      : [];
    // if there is an HTMLAttributes type present among others, remove HTMLAttributes
    if (extendedTypes.includes('HTMLAttributes') && extendedTypes.length > 1) {
      const htmlAttributesIndex = extendedTypes.indexOf('HTMLAttributes');
      extendedTypes.splice(htmlAttributesIndex, 1);
    }
    const extendedTypesElements = extendedTypes.map((type, index) => (
      <Fragment key={`extendedTypeValue-${extendedTypesInfo[type].name}`}>
        <EuiLink href={extendedTypesInfo[type].url}>
          {extendedTypesInfo[type].name}
        </EuiLink>
        {index + 1 < extendedTypes.length && ', '}
      </Fragment>
    ));

    let descriptionElement;

    if (description) {
      descriptionElement = (
        <div key={`description-${componentName}`}>
          <EuiText>
            <p>{markup(description)}</p>
          </EuiText>
          <EuiSpacer size="m" id={`propsSpacer-${componentName}`} />
        </div>
      );
    }

    let table;

    if (rows.length) {
      table = (
        <EuiTable compressed key={`propsTable-${componentName}`}>
          <EuiTableHeader>
            <EuiTableHeaderCell
              onSort={() => {
                this.onSort(componentName);
              }}
              isSorted={
                sortedComponents[componentName] &&
                sortedComponents[componentName] !== 'NONE'
              }
              isSortAscending={
                sortedComponents[componentName] &&
                sortedComponents[componentName] === 'ASC'
              }
              style={{ Width: '20%' }}>
              Prop
            </EuiTableHeaderCell>

            <EuiTableHeaderCell style={{ width: '15%' }}>
              Type
            </EuiTableHeaderCell>

            <EuiTableHeaderCell style={{ width: '15%' }}>
              Default
            </EuiTableHeaderCell>

            <EuiTableHeaderCell style={{ width: '50%' }}>
              Note
            </EuiTableHeaderCell>
          </EuiTableHeader>

          <EuiTableBody>{rows}</EuiTableBody>
        </EuiTable>
      );
    }

    return [
      <EuiSpacer size="m" key={`propsSpacer-${componentName}-1`} />,
      <EuiFlexGroup
        key={`propsName-${componentName}`}
        alignItems="baseline"
        wrap>
        <EuiFlexItem grow={false}>
          <EuiTitle size="s">
            <h3 id={componentName}>{componentName}</h3>
          </EuiTitle>
        </EuiFlexItem>
        {extendedTypesElements.length > 0 && (
          <EuiFlexItem>
            <EuiText size="s">
              <p>[ extends {extendedTypesElements} ]</p>
            </EuiText>
          </EuiFlexItem>
        )}
      </EuiFlexGroup>,
      <EuiSpacer size="s" key={`propsSpacer-${componentName}-2`} />,
      descriptionElement,
      table,
    ];
  };

  renderProps() {
    const { props } = this.props;
    return this.componentNames
      .map((componentName) =>
        this.renderPropsForComponent(componentName, props[componentName])
      )
      .reduce((a, b) => a.concat(b), []); // Flatten the resulting array
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

        {this.tabs.length > 0 && (
          <>
            <EuiSpacer size="m" />
            <EuiTabs>{this.renderTabs()}</EuiTabs>
          </>
        )}
      </div>
    );
  }

  renderCode(name) {
    const euiCodeBlock = (
      <EuiCodeBlock language={nameToCodeClassMap[name]} overflowHeight={400}>
        {this.state.renderedCode}
      </EuiCodeBlock>
    );

    const divProps = {
      key: name,
      ref: name,
    };

    const memoScrollUtility = () => {
      const pre = this.refs.javascript.querySelector('.euiCodeBlock__pre');
      this.memoScroll = pre.scrollTop;
    };

    if (name === 'javascript') {
      return (
        <div {...divProps} onScroll={memoScrollUtility}>
          {euiCodeBlock}
          {name === 'javascript'
            ? this.renderCodeSandBoxButton(this.state.code)
            : null}
        </div>
      );
    }

    return <div {...divProps}> {euiCodeBlock} </div>;
  }

  renderContent() {
    if (typeof this.state.selectedTab === 'undefined') {
      return;
    }

    if (this.state.selectedTab.name === 'snippet') {
      return <EuiErrorBoundary>{this.renderSnippet()}</EuiErrorBoundary>;
    }

    if (this.state.selectedTab.isCode) {
      return (
        <EuiErrorBoundary>
          {this.renderCode(this.state.selectedTab.isCode)}
        </EuiErrorBoundary>
      );
    }

    if (this.state.selectedTab.name === 'props') {
      return <EuiErrorBoundary>{this.renderProps()}</EuiErrorBoundary>;
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

  renderCodeSandBoxButton(code) {
    if (!code) {
      return;
    }

    return (
      <CodeSandboxLink
        className="guideSectionExampleCode__link"
        content={code.default}>
        <EuiButtonEmpty size="xs" iconType="logoCodesandbox">
          Try out this demo on Code Sandbox
        </EuiButtonEmpty>
      </CodeSandboxLink>
    );
  }

  render() {
    const chrome = this.renderChrome();

    return (
      <div className="guideSection" id={this.props.id}>
        {chrome}
        {this.renderContent()}
        {this.props.extraContent}
      </div>
    );
  }
}

GuideSection.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  source: PropTypes.array,
  snippet: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.any,
  routes: PropTypes.object.isRequired,
  props: PropTypes.object,
};

GuideSection.defaultProps = {
  props: {},
};
