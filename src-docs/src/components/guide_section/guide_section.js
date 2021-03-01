import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  EuiErrorBoundary,
  EuiText,
  EuiSwitch,
} from '../../../../src/components';
import { slugify } from '../../../../src/services';

import { GuideSectionExample } from './guide_section_parts/guide_section_example';
import playground from '../../services/playground/playground';
import { GuideSectionExampleText } from './guide_section_parts/guide_section_text';
import { GuideSectionExampleTabs } from './guide_section_parts/guide_section_tabs';
import { GuideSectionPropsTable } from './guide_section_parts/guide_section_props_table';

const tabDisplayNameMap = {
  javascript: 'Demo JS',
  html: 'Demo HTML',
  snippet: 'Snippet',
};
export class GuideSection extends Component {
  constructor(props) {
    super(props);

    this.componentNames = Object.keys(props.props);

    this.state = {
      selectedTab: undefined,
      sortedComponents: {},
      isPlayground: false,
    };
  }

  renderTabs() {
    const { source, snippet, props } = this.props;

    const hasSnippet = !!snippet;

    // Don't duplicate in case this function is run multiple times
    if (hasSnippet && !source.find((tab) => tab.name === 'snippet')) {
      source.push({
        name: 'snippet',
        displayName: 'Snippet',
        code: this.props.snippet,
      });
    }

    const hasPropsTabAlready = source.find((tab) => tab.name === 'props');

    if (
      this.componentNames.length &&
      !hasPropsTabAlready // Don't duplicate in case this function is run multiple times
    ) {
      source.push({
        name: 'props',
        displayName: 'Props',
        props: props,
        isSelected: this.state.isPlayground,
      });
    } else if (hasPropsTabAlready) {
      hasPropsTabAlready.isSelected = this.state.isPlayground;
    }

    const tabs = [];

    if (source) {
      source.map((source) => {
        tabs.push({
          name:
            (source.displayName && slugify(source.displayName)) ||
            tabDisplayNameMap[source.type] ||
            'tab',
          displayName:
            source.displayName || tabDisplayNameMap[source.type] || 'Tab',
          disabled: this.state.isPlayground,
          ...source,
        });
      });
    }

    return (
      <GuideSectionExampleTabs
        tabs={tabs}
        rightSideControl={this.renderPlaygroundToggle()}
      />
    );
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
            this.setState((prevState) => ({
              isPlayground: !prevState.isPlayground,
            }));
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

    const description = (
      <GuideSectionPropsTable
        componentName={config.componentName}
        component={config.scope[config.componentName]}
        descriptionOnly
      />
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
    const { title, text, wrapText, id } = this.props;

    return (
      <div className="guideSection" id={id}>
        <GuideSectionExampleText
          title={title}
          text={text}
          wrapText={wrapText}
        />

        {this.state.isPlayground && this.renderPlayground()}
        {!this.state.isPlayground && this.props.demo && (
          <GuideSectionExample
            example={
              <EuiErrorBoundary>
                <div>{this.props.demo}</div>
              </EuiErrorBoundary>
            }
            tabs={this.renderTabs()}
            ghostBackground={this.props.ghostBackground}
          />
        )}
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
