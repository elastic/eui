import React, { Component, Fragment } from 'react';
import { useView, Compiler, Placeholder } from 'react-view';
import format from 'html-format';
import PropTypes from 'prop-types';

import {
  EuiHorizontalRule,
  EuiCodeBlock,
  EuiErrorBoundary,
  EuiSpacer,
  EuiTab,
  EuiTabs,
  EuiText,
  EuiTitle,
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSwitch,
} from '../../../../src/components';

import { cleanEuiImports } from '../../services';

import { extendedTypesInfo } from './guide_section_extends';
import { EuiIcon } from '../../../../src/components/icon';

import Knobs, { markup } from '../../services/playground/knobs';
import { propUtilityForPlayground } from '../../services/playground';
import { GuideSectionSnippets } from './guide_section_parts/guide_section_snippets';
import { GuideSectionExampleCode } from './guide_section_parts/guide_section_code';

export class GuideSection extends Component {
  constructor(props) {
    super(props);

    this.componentNames = Object.keys(props.props);
    const hasSnippet = 'snippet' in props;

    this.tabs = [];

    // if (props.demo) {
    //   this.tabs.push({
    //     name: 'demo',
    //     displayName: 'Demo',
    //   });
    // }

    if (props.source) {
      this.tabs.push(
        {
          name: 'javascript',
          displayName: (
            <>
              <EuiIcon type="editorCodeBlock" /> JS
            </>
          ),
          isCode: true,
        },
        {
          name: 'html',
          displayName: 'HTML',
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
      selectedTab: undefined,
      renderedCode: null,
      sortedComponents: {},
      isPlayground: false,
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
    const { name } = selectedTab;
    let renderedCode = null;

    if (name === 'html' || name === 'javascript') {
      const { code } = this.props.source.find(
        (sourceObject) => sourceObject.type === name
      );
      renderedCode = code;

      if (name === 'javascript') {
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
      } else if (name === 'html') {
        renderedCode = code.render();
      }
    }

    this.setState(
      (prevState) => {
        if (prevState.selectedTab && prevState.selectedTab.name === name) {
          // Unselect tabs if clicking the same one that is currently open
          return {
            selectedTab: undefined,
            renderedCode: null,
          };
        }
        return { selectedTab, renderedCode };
      },
      () => {
        if (name === 'javascript') {
          requestAnimationFrame(() => {
            const pre = this.refs.javascript.querySelector(
              '.euiCodeBlock__pre'
            );
            if (!pre) return;
            pre.scrollTop = this.memoScroll;
          });
        }
      }
    );
  };

  renderTabs() {
    return this.tabs.map((tab) => (
      <EuiTab
        className="euiTab--small"
        onClick={() => this.onSelectedTabChanged(tab)}
        isSelected={tab === this.state.selectedTab}
        key={tab.name}>
        {tab.displayName}
      </EuiTab>
    ));
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

    return (
      <>
        <EuiSpacer size="m" />
        <EuiFlexGroup alignItems="baseline" wrap>
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
        </EuiFlexGroup>
        <EuiSpacer size="s" />
        {descriptionElement}
        <PlaygroundProps
          isPlayground={this.state.isPlayground}
          config={
            this.state.isPlayground
              ? this.props.playground().config
              : {
                  componentName: componentName,
                  props: propUtilityForPlayground(docgenInfo.props),
                  scope: component,
                }
          }
        />
      </>
    );
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
      <div className="guideSection__text">
        {title}
        {this.props.text && <EuiText key="text">{this.props.text}</EuiText>}
      </div>
    );
  }

  renderExample() {
    if (this.state.isPlayground && this.props.playground) {
      return <PlaygroundExample config={this.props.playground().config} />;
    }
    return (
      <EuiErrorBoundary>
        <div>{this.props.demo}</div>
      </EuiErrorBoundary>
    );
  }

  renderContent() {
    if (typeof this.state.selectedTab === 'undefined') {
      return;
    }

    if (this.state.selectedTab.name === 'snippet') {
      return (
        <EuiErrorBoundary>
          <EuiHorizontalRule margin="none" />
          <EuiSpacer />
          <GuideSectionSnippets snippets={this.props.snippet} />
        </EuiErrorBoundary>
      );
    }

    if (this.state.selectedTab.isCode) {
      return (
        <EuiErrorBoundary>
          <EuiHorizontalRule margin="none" />
          <GuideSectionExampleCode
            language={this.state.selectedTab.name}
            code={this.state.renderedCode}
            codeSandbox={this.props.source[0].code.default}
          />
        </EuiErrorBoundary>
      );
    }

    if (this.state.selectedTab.name === 'props') {
      let propsTable;

      if (this.state.isPlayground) {
        const { componentName, scope } = this.props.playground().config;

        propsTable = this.renderPropsForComponent(
          componentName,
          scope[componentName]
        );
      } else {
        propsTable = this.renderProps();
      }

      return (
        <EuiErrorBoundary>
          <EuiHorizontalRule margin="none" />
          {propsTable}
        </EuiErrorBoundary>
      );
    }
  }

  renderPlaygroundToggle() {
    const isPlaygroundUnsupported =
      // Check for IE11 -- TODO: NOT WORKING IN HERE
      typeof window !== 'undefined' &&
      typeof document !== 'undefined' &&
      !!window.MSInputMethodContext &&
      !!document.documentMode;

    if (!isPlaygroundUnsupported && this.props.playground) {
      return (
        <EuiSwitch
          onChange={() => {
            this.setState(
              (prevState) => ({
                isPlayground: !prevState.isPlayground,
              }),
              () => {
                if (
                  this.state.isPlayground &&
                  (!this.state.selectedTab ||
                    (this.state.selectedTab &&
                      this.state.selectedTab.name !== 'props'))
                ) {
                  this.onSelectedTabChanged(
                    this.tabs.find((tab) => tab.name === 'props')
                  );
                } else if (
                  !this.state.isPlayground &&
                  this.state.selectedTab &&
                  this.state.selectedTab.name !== 'props'
                ) {
                  this.setState({ selectedTab: undefined });
                }
              }
            );
          }}
          checked={this.state.isPlayground}
          compressed
          label={
            <EuiText component="span" size="xs">
              <strong>Playground</strong>
            </EuiText>
          }
        />
      );
    }
  }

  render() {
    const chrome = this.renderChrome();

    return (
      <div className="guideSection" id={this.props.id}>
        {chrome}
        <EuiSpacer />
        <EuiPanel paddingSize="none" style={{ overflow: 'hidden' }}>
          <EuiPanel hasShadow={false} paddingSize="l" color="transparent">
            <EuiFlexGroup direction="column" alignItems="center">
              {this.renderExample()}
            </EuiFlexGroup>
          </EuiPanel>
          <EuiPanel
            paddingSize="s"
            color="subdued"
            hasShadow={false}
            borderRadius="none">
            <EuiFlexGroup gutterSize="none" alignItems="center">
              <EuiFlexItem>
                {this.tabs.length > 0 && (
                  <EuiTabs size="s" display="condensed">
                    {this.renderTabs()}
                  </EuiTabs>
                )}
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                {this.renderPlaygroundToggle()}
              </EuiFlexItem>
            </EuiFlexGroup>
            {this.renderContent()}
          </EuiPanel>
        </EuiPanel>
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
  playground: PropTypes.any,
};

GuideSection.defaultProps = {
  props: {},
};

const PlaygroundExample = ({
  config,
  // setGhostBackground,
  // playgroundClassName,
}) => {
  const params = useView(config);

  const getSnippet = (code) => {
    let regex = /return \(([\S\s]*?)(;)$/gm;
    let newCode = code.match(regex);

    if (newCode) {
      newCode = newCode[0];
      if (newCode.startsWith('return ('))
        newCode = newCode.replace('return (', '');
    } else {
      regex = /return ([\S\s]*?)(;)$/gm;
      newCode = code.match(regex)[0];
      if (newCode.startsWith('return '))
        newCode = newCode.replace('return ', '');
    }

    if (newCode.endsWith(');')) {
      newCode = newCode.replace(/(\);)$/m, '');
    }

    return format(newCode.trim(), ' '.repeat(4));
  };

  return (
    <>
      <EuiFlexItem grow={false}>
        <div>
          <Compiler
            {...params.compilerProps}
            minHeight={62}
            placeholder={Placeholder}
          />
        </div>
      </EuiFlexItem>
      <EuiFlexItem className="eui-fullWidth" grow={true}>
        <EuiCodeBlock language="html" fontSize="m" paddingSize="m" isCopyable>
          {getSnippet(params.editorProps.code)}
        </EuiCodeBlock>
      </EuiFlexItem>
    </>
  );
};

const PlaygroundProps = ({
  config,
  isPlayground,
  // setGhostBackground,
  // playgroundClassName,
}) => {
  const params = useView(config);

  return <Knobs {...params.knobProps} isPlayground={isPlayground} />;
};
