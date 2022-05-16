import React, { FunctionComponent, ReactNode, useState } from 'react';
import { useRouteMatch } from 'react-router';

import {
  EuiSpacer,
  EuiErrorBoundary,
  EuiButton,
  EuiButtonEmpty,
  EuiFlyout,
  EuiPanelProps,
  EuiPageSection,
  CommonProps,
  useIsWithinBreakpoints,
} from '../../../../src';

import { slugify } from '../../../../src/services/string/slugify';

// @ts-ignore Not TS yet
import playgroundService from '../../services/playground/playground';

import { GuideSectionExample } from './guide_section_parts/guide_section_example';
import { GuideSectionExampleText } from './guide_section_parts/guide_section_text';
import {
  GuideSectionExampleTabs,
  GuideSectionExampleTabsProps,
} from './guide_section_parts/guide_section_tabs';
import classNames from 'classnames';

export interface GuideSectionProps
  extends Pick<
    GuideSectionExample,
    'exampleToggles' | 'demoPanelProps' | 'ghostBackground'
  > {
  id?: string;
  title?: string;
  text?: ReactNode;
  source?: any[];
  demo?: ReactNode;
  fullScreen?: {
    slug: string;
    demo: ReactNode;
    showButton?: boolean;
  };
  props?: object;
  playground?: any;
  wrapText?: boolean;
  snippet?: string | string[];
  color?: EuiPanelProps['color'];
  children?: ReactNode;
  nested?: boolean;
}

export const GuideSectionCodeTypesMap = {
  JS: {
    name: 'demoJS',
    displayName: 'Demo JS',
  },
  TSX: {
    name: 'demoTSX',
    displayName: 'Demo TS',
  },
  STRING_JS: {
    name: 'demoJS',
    displayName: 'Demo JS',
  },
  SNIPPET: {
    name: 'snippet',
    displayName: 'Snippet',
  },
  SASS: {
    name: 'sass',
    displayName: 'Sass',
  },
  PROPS: {
    name: 'props',
    displayName: 'Props',
  },
};

export const GuideSection: FunctionComponent<GuideSectionProps> = ({
  id,
  title,
  text,
  demo,
  fullScreen,
  source = [],
  props = {},
  playground,
  ghostBackground,
  wrapText = true,
  demoPanelProps,
  exampleToggles,
  snippet,
  color,
  children,
  nested,
  className,
}) => {
  const { path } = useRouteMatch();
  const isLargeBreakpoint = useIsWithinBreakpoints(['m', 'l', 'xl']);
  const [renderingPlayground, setRenderingPlayground] = useState(false);

  const renderTabs = () => {
    const hasSnippet = !!snippet;

    // Don't duplicate in case this function is run multiple times
    if (hasSnippet && !source.find((tab) => tab.name === 'snippet')) {
      source.push({
        ...GuideSectionCodeTypesMap.SNIPPET,
        snippets: snippet,
        displayName: `${GuideSectionCodeTypesMap.SNIPPET.displayName}${
          Array.isArray(snippet) ? 's' : ''
        }`,
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
        tabs.push({
          // @ts-ignore Complicated
          ...GuideSectionCodeTypesMap[source.type],
          // Make sure the `name` is unique in case there are multiple source languages
          name: source.displayName
            ? slugify(source.displayName)
            : // @ts-ignore Complicated
              GuideSectionCodeTypesMap[source.type].name,
          ...source,
        });
      });
    }

    return tabs.length ? (
      <GuideSectionExampleTabs
        tabs={tabs}
        rightSideControl={renderPlaygroundToggle()}
      />
    ) : undefined;
  };

  const renderPlaygroundToggle = () => {
    const isPlaygroundUnsupported =
      typeof window !== 'undefined' &&
      typeof document !== 'undefined' &&
      !!(window as any).MSInputMethodContext &&
      // @ts-ignore doesn't exist?
      !!document.documentMode;

    if (!isPlaygroundUnsupported && !!playground) {
      return (
        <EuiButtonEmpty
          size="xs"
          iconType="controlsHorizontal"
          onClick={() => {
            setRenderingPlayground((rendering) => !rendering);
          }}
        >
          Playground
        </EuiButtonEmpty>
      );
    }
  };

  const renderPlayground = () => {
    const {
      config,
      setGhostBackground,
      playgroundClassName,
      playgroundPanelProps,
    } = playground();

    return playgroundService({
      config,
      setGhostBackground,
      playgroundClassName,
      playgroundPanelProps,
      playgroundToggle: renderPlaygroundToggle(),
      tabs: renderTabs(),
    });
  };

  return (
    <EuiPageSection
      id={id}
      className={classNames('guideSection', className)}
      color={!isLargeBreakpoint ? 'transparent' : color || 'transparent'}
      paddingSize={nested ? 'none' : 'l'}
      restrictWidth
    >
      <EuiSpacer size={(color || title) && isLargeBreakpoint ? 'xxl' : 'xs'} />
      <GuideSectionExampleText title={title} wrapText={wrapText}>
        {text}
      </GuideSectionExampleText>

      {renderingPlayground && (
        <EuiFlyout
          onClose={() => setRenderingPlayground(false)}
          size="l"
          paddingSize="none"
          closeButtonPosition="outside"
        >
          {renderPlayground()}
        </EuiFlyout>
      )}
      {(demo || (fullScreen && fullScreen.showButton !== false)) && (
        <>
          {(nested || text) && <EuiSpacer />}
          <GuideSectionExample
            example={
              <EuiErrorBoundary>
                {/* eslint-disable-next-line no-nested-ternary */}
                {fullScreen == null ? (
                  <div>{demo}</div>
                ) : demo == null ? (
                  <EuiButton
                    fill
                    iconType="fullScreen"
                    href={`#${path}/${fullScreen.slug}`}
                  >
                    Fullscreen demo
                  </EuiButton>
                ) : (
                  demo
                )}
              </EuiErrorBoundary>
            }
            tabs={renderTabs()}
            ghostBackground={ghostBackground}
            demoPanelProps={demoPanelProps}
            exampleToggles={exampleToggles}
          />
        </>
      )}

      {children}
      <EuiSpacer size={color && isLargeBreakpoint ? 'xxl' : 'xs'} />
    </EuiPageSection>
  );
};
