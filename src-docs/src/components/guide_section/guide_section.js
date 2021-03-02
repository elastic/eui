import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  EuiErrorBoundary,
  EuiText,
  EuiSwitch,
} from '../../../../src/components';
import { slugify } from '../../../../src/services';

import { GuideSectionExample } from './guide_section_parts/guide_section_example';
import { GuideSectionExampleText } from './guide_section_parts/guide_section_text';
import playgroundService from '../../services/playground/playground';
import { GuideSectionExampleTabs } from './guide_section_parts/guide_section_tabs';
import { GuideSectionPropsTable } from './guide_section_parts/guide_section_props_table';

export const GuideSectionCodeTypesMap = {
  JS: {
    name: 'demoJS',
    language: 'javascript',
    displayName: 'Demo JS',
  },
  HTML: {
    name: 'demoHtml',
    language: 'html',
    displayName: 'Demo HTML',
  },
  SNIPPET: {
    name: 'snippet',
    displayName: 'Snippet',
  },
  PROPS: {
    name: 'props',
    displayName: 'Props',
  },
};

export const GuideSection = ({
  id,
  title,
  text,
  demo,
  source,
  props,
  playground,
  ghostBackground,
  wrapText,
  snippet,
}) => {
  const [renderingPlayground, setRenderingPlayground] = useState(false);

  const renderTabs = () => {
    const hasSnippet = !!snippet;

    // Don't duplicate in case this function is run multiple times
    if (hasSnippet && !source.find((tab) => tab.name === 'snippet')) {
      source.push({
        ...GuideSectionCodeTypesMap.SNIPPET,
        snippets: snippet,
      });
    }

    const hasPropsTabAlready = source.find((tab) => tab.name === 'props');

    if (
      Object.keys(props).length &&
      !hasPropsTabAlready // Don't duplicate in case this function is run multiple times
    ) {
      source.push({
        ...GuideSectionCodeTypesMap.PROPS,
        props: props,
      });
    }

    const tabs = [];

    if (source) {
      source.map((source) => {
        tabs.push({
          ...GuideSectionCodeTypesMap[source.type],
          // Make sure the `name` is unique in case there are multiple source languages
          name: source.displayName
            ? slugify(source.displayName)
            : GuideSectionCodeTypesMap[source.type].name,
          disabled: renderingPlayground,
          ...source,
        });
      });
    }

    return (
      <GuideSectionExampleTabs
        tabs={tabs}
        rightSideControl={renderPlaygroundToggle()}
      />
    );
  };

  const renderPlaygroundToggle = () => {
    const isPlaygroundUnsupported =
      typeof window !== 'undefined' &&
      typeof document !== 'undefined' &&
      !!window.MSInputMethodContext &&
      !!document.documentMode;

    if (!isPlaygroundUnsupported && !!playground) {
      return (
        <EuiSwitch
          onChange={() => {
            setRenderingPlayground((rendering) => !rendering);
          }}
          checked={renderingPlayground}
          compressed
          label={
            <EuiText component="span" size="xs">
              <strong>Playground</strong>
            </EuiText>
          }
        />
      );
    }
  };

  const renderPlayground = () => {
    const { config, setGhostBackground, playgroundClassName } = playground();

    const description = (
      <GuideSectionPropsTable
        componentName={config.componentName}
        component={config.scope[config.componentName]}
        descriptionOnly
      />
    );

    return playgroundService({
      config,
      setGhostBackground,
      playgroundClassName,
      playgroundToggle: renderPlaygroundToggle(),
      tabs: renderTabs(),
      description,
    });
  };

  return (
    <div className="guideSection" id={id}>
      <GuideSectionExampleText title={title} text={text} wrapText={wrapText} />

      {renderingPlayground && renderPlayground()}
      {!renderingPlayground && demo && (
        <GuideSectionExample
          example={
            <EuiErrorBoundary>
              <div>{demo}</div>
            </EuiErrorBoundary>
          }
          tabs={renderTabs()}
          ghostBackground={ghostBackground}
        />
      )}
    </div>
  );
};

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
