import React, { Component, Fragment } from 'react';
import { useView } from 'react-view';
import PropTypes from 'prop-types';

import {
  EuiHorizontalRule,
  EuiErrorBoundary,
  EuiSpacer,
  EuiTab,
  EuiText,
  EuiTitle,
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSwitch,
} from '../../../../src/components';

import { cleanEuiImports } from '../../services';

import { extendedTypesInfo } from './guide_section_extends';
import { EuiIcon } from '../../../../src/components/icon';

import Knobs, { markup } from '../../services/playground/knobs';
import { propUtilityForPlayground } from '../../services/playground';
import { GuideSectionSnippets } from './guide_section_parts/guide_section_snippets';
import { GuideSectionExampleCode } from './guide_section_parts/guide_section_code';
import { GuideSectionExample } from './guide_section_parts/guide_section_example';
import playground from '../../services/playground/playground';
import { GuideSectionExampleText } from './guide_section_parts/guide_section_text';

const slugify = (str) => {
  const parts = str
    .toLowerCase()
    .replace(/[-]+/g, ' ')
    .replace(/[^\w^\s]+/g, '')
    .replace(/ +/g, ' ')
    .split(' ');
  return parts.join('-');
};

const tabDisplayNameMap = {
  javascript: 'Demo JS',
  html: 'Demo HTML',
  snippet: 'Snippet',
};

export const renderPropsForComponent = (
  componentName,
  component,
  descriptionOnly
) => {
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
      <>
        <EuiText size="s">
          <p>{markup(description)}</p>
        </EuiText>
        <EuiSpacer />
      </>
    );
  }

  return (
    <React.Fragment key={componentName}>
      <EuiHorizontalRule margin="none" />
      <EuiSpacer size="m" />
      <div className="guideSection__propsTableIntro">
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
      </div>
      {!descriptionOnly && (
        <PlaygroundProps
          isPlayground={false}
          config={{
            componentName: componentName,
            props: propUtilityForPlayground(docgenInfo.props),
            scope: component,
          }}
        />
      )}
    </React.Fragment>
  );
};

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
      selectedTab: undefined,
      renderedCode: null,
      sortedComponents: {},
      isPlayground: false,
    };

    this.memoScroll = 0;
  }

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

    this.setState(
      (prevState) => {
        if (
          prevState.selectedTab &&
          prevState.selectedTab.name === selectedTab.name
        ) {
          // Unselect tabs if clicking the same one that is currently open
          return {
            selectedTab: undefined,
            renderedCode: null,
          };
        }
        return { selectedTab, renderedCode };
      },
      () => {
        if (isCode === 'javascript') {
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
        onClick={() => this.onSelectedTabChanged(tab)}
        isSelected={tab === this.state.selectedTab}
        disabled={this.state.isPlayground}
        key={tab.name}>
        {tab.displayName}
      </EuiTab>
    ));
  }

  renderContent() {
    if (typeof this.state.selectedTab === 'undefined') {
      return;
    }

    if (this.state.selectedTab.name === 'snippet') {
      return (
        <EuiErrorBoundary>
          <EuiHorizontalRule margin="none" />
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

        propsTable = renderPropsForComponent(
          componentName,
          scope[componentName]
        );
      } else {
        propsTable = this.componentNames
          .map((componentName) =>
            renderPropsForComponent(
              componentName,
              this.props.props[componentName]
            )
          )
          .reduce((a, b) => a.concat(b), []); // Flatten the resulting array
      }

      return <EuiErrorBoundary>{propsTable}</EuiErrorBoundary>;
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
                } else if (!this.state.isPlayground) {
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

  renderPlayground() {
    if (!this.props.playground) {
      return;
    }

    const {
      config,
      setGhostBackground,
      playgroundClassName,
    } = this.props.playground();

    const description = renderPropsForComponent(
      config.componentName,
      config.scope[config.componentName],
      true
    );

    return playground({
      config,
      setGhostBackground,
      playgroundClassName,
      playgroundToggle: this.renderPlaygroundToggle(),
      tabs: this.renderTabs(),
      description,
    });
  }

  render() {
    const { title, text, wrapText } = this.props;

    return (
      <div className="guideSection" id={this.props.id}>
        <GuideSectionExampleText
          title={title}
          text={text}
          wrapText={wrapText}
        />

        {this.state.isPlayground && this.renderPlayground()}
        {!this.state.isPlayground && this.props.demo && (
          <GuideSectionExample
            exampleCode={
              <EuiErrorBoundary>
                <div>{this.props.demo}</div>
              </EuiErrorBoundary>
            }
            tabs={this.renderTabs()}
            tabContent={this.renderContent()}
            playground={this.renderPlaygroundToggle()}
            ghostBackground={this.props.ghostBackground}
            tabContentPadding={
              this.state.selectedTab && this.state.selectedTab.name === 'props'
                ? 'm'
                : 'none'
            }
          />
        )}
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
  ghostBackground: PropTypes.bool,
  wrapText: PropTypes.bool,
};

GuideSection.defaultProps = {
  props: {},
  wrapText: true,
};

const PlaygroundProps = ({ config, isPlayground }) => {
  const params = useView(config);

  return <Knobs {...params.knobProps} isPlayground={isPlayground} />;
};
