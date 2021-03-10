import React, { FunctionComponent, ReactNode, useState } from 'react';

import { EuiErrorBoundary } from '../../../../src/components/error_boundary';
import { EuiText } from '../../../../src/components/text';
import { EuiSwitch } from '../../../../src/components/form';

import { slugify } from '../../../../src/services/string/slugify';

// @ts-ignore Not TS yet
import playgroundService from '../../services/playground/playground';

import { GuideSectionExample } from './guide_section_parts/guide_section_example';
import { GuideSectionExampleText } from './guide_section_parts/guide_section_text';
import {
  GuideSectionExampleTabs,
  GuideSectionExampleTabsProps,
} from './guide_section_parts/guide_section_tabs';
import { GuideSectionPropsDescription } from './guide_section_parts/guide_section_props_description';

export interface GuideSection {
  id?: string;
  title?: string;
  text?: ReactNode;
  source?: any[];
  demo?: ReactNode;
  demoPanelProps?: GuideSectionExample['demoPanelProps'];
  // routes?: object.isRequired;
  props?: object;
  playground?: any;
  ghostBackground?: boolean;
  wrapText?: boolean;
  snippet?: string | string[];
}

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

export const GuideSection: FunctionComponent<GuideSection> = ({
  id,
  title,
  text,
  demo,
  source = [],
  props = {},
  playground,
  ghostBackground,
  wrapText = true,
  demoPanelProps,
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

    const tabs: GuideSectionExampleTabsProps['tabs'] = [];

    if (source) {
      source.map((source) => {
        // Forever skipping the HTML tab
        if (source.type === 'HTML') return;
        tabs.push({
          // @ts-ignore Complicated
          ...GuideSectionCodeTypesMap[source.type],
          // Make sure the `name` is unique in case there are multiple source languages
          name: source.displayName
            ? slugify(source.displayName)
            : // @ts-ignore Complicated
              GuideSectionCodeTypesMap[source.type].name,
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
      // @ts-ignore doesn't exist?
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
            <EuiText size="xs">
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
      <GuideSectionPropsDescription
        componentName={config.componentName}
        component={config.scope[config.componentName]}
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
      <GuideSectionExampleText title={title} wrapText={wrapText}>
        {text}
      </GuideSectionExampleText>

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
          demoPanelProps={demoPanelProps}
        />
      )}
    </div>
  );
};
