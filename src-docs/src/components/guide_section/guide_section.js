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
} from '../../../../src/components';

import { getParameters } from 'codesandbox/lib/api/define';

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
      this.tabs.push(
        {
          name: 'javascript',
          displayName: 'Demo JS',
          isCode: true,
        },
        {
          name: 'html',
          displayName: 'Demo HTML',
          isCode: true,
        }
      );
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
    };
  }

  onSelectedTabChanged = selectedTab => {
    this.setState({
      selectedTab,
    });
  };

  renderTabs() {
    return this.tabs.map(tab => (
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
    const { snippet } = this.props;

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
    const { description, props } = docgenInfo;

    if (!props && !description) {
      return;
    }

    const propNames = Object.keys(props);

    const rows = propNames.map(propName => {
      const {
        description: propDescription = '',
        required,
        defaultValue,
        type,
      } = props[propName];

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

      const typeMarkup = (
        <span className="eui-textBreakNormal">{markup(humanizedType)}</span>
      );
      const descriptionMarkup = markup(propDescription);
      let defaultValueMarkup = '';
      if (defaultValue) {
        defaultValueMarkup = [
          <EuiCode key={`defaultValue-${propName}`}>
            <span className="eui-textBreakNormal">{defaultValue.value}</span>
          </EuiCode>,
        ];
        if (defaultValue.comment) {
          defaultValueMarkup.push(`(${defaultValue.comment})`);
        }
      }
      const cells = [
        <EuiTableRowCell key="name" header="Prop">
          {humanizedName}
        </EuiTableRowCell>,
        <EuiTableRowCell key="type" header="Type">
          <EuiCode>{typeMarkup}</EuiCode>
        </EuiTableRowCell>,
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

    const title = <span id={componentName}>{componentName}</span>;

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
            <EuiTableHeaderCell style={{ Width: '20%' }}>
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
      <EuiTitle size="s" key={`propsName-${componentName}`}>
        <h3>{title}</h3>
      </EuiTitle>,
      <EuiSpacer size="s" key={`propsSpacer-${componentName}-2`} />,
      descriptionElement,
      table,
    ];
  };

  renderProps() {
    const { props } = this.props;
    return this.componentNames
      .map(componentName =>
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
    const nameToCodeClassMap = {
      javascript: 'javascript',
      html: 'html',
    };

    const codeClass = nameToCodeClassMap[name];
    const { code } = this.props.source.find(
      sourceObject => sourceObject.type === name
    );
    const npmImports = code
      .replace(/(from )'(..\/)+src\/components(\/?';)/, "from '@elastic/eui';")
      .replace(
        /(from )'(..\/)+src\/services(\/?';)/,
        "from '@elastic/eui/lib/services';"
      )
      .replace(/(from )'(..\/)+src\/components\/.*?';/, "from '@elastic/eui';");

    return (
      <div key={name} ref={name}>
        <EuiSpacer size="s" />
        {this.renderCodeSandBoxButton()}
        <EuiSpacer size="s" />
        <EuiCodeBlock language={codeClass} overflowHeight={400}>
          {npmImports}
        </EuiCodeBlock>
      </div>
    );
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
          {this.renderCode(this.state.selectedTab.name)}
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

  renderCodeSandBoxButton() {
    /** This cleans the Demo JS example for Code Sanbox.
        - Replaces relative imports with pure @elastic/eui ones
        - Changes the JS example from a default export to a component const named Demo
        **/
    const exampleCleaned = this.props.source[0].code
      .replace(/(from )'(..\/)+src\/components(\/?';)/, "from '@elastic/eui';")
      .replace(
        /(from )'(..\/)+src\/services(\/?';)/,
        "from '@elastic/eui/lib/services';"
      )
      .replace(/(from )'(..\/)+src\/components\/.*?';/, "from '@elastic/eui';")
      .replace('export default', 'const Demo =');

    // Renders the new Demo component generically into the code sandbox page
    const exampleClose = `ReactDOM.render(
      <Demo />,
      document.getElementById('root')
    );`;
    // The Code Sanbbox demo needs to import CSS at the top of the document
    const exampleStart = `import ReactDOM from 'react-dom';
    import '@elastic/eui/dist/eui_theme_light.css'`;

    // Concat the three pieces of the example into a single string
    const codeSandboxExample = `${exampleStart}
    ${exampleCleaned}
    ${exampleClose}
    `;

    // Check the imports
    const extraDeps = [
      ...exampleCleaned.matchAll(/import\s.*?'(?<import>[^.].*?)'/g),
    ]
      .map(x => x.groups.import)
      .reduce((deps, dep) => {
        deps[dep] = 'latest';
        return deps;
      }, {});

    const codeSandboxParams = getParameters({
      files: {
        'package.json': {
          content: {
            dependencies: {
              react: 'latest',
              'react-dom': 'latest',
              'react-scripts': 'latest',
              moment: 'latest',
              '@elastic/eui': 'latest',
              '@elastic/datemath': 'latest',
              ...extraDeps,
            },
          },
        },
        'index.js': {
          content: codeSandboxExample,
        },
      },
    });

    return (
      <form
        action="https://codesandbox.io/api/v1/sandboxes/define"
        method="POST"
        target="_blank"
        className="eui-textRight">
        <input type="hidden" name="parameters" value={codeSandboxParams} />
        <EuiButtonEmpty size="xs" type="submit" iconType="logoCodesandbox">
          Open in Codesandbox
        </EuiButtonEmpty>
      </form>
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
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  routes: PropTypes.object.isRequired,
  props: PropTypes.object,
};

GuideSection.defaultProps = {
  props: {},
};
