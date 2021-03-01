import React, { FunctionComponent, useState, ReactNode } from 'react';
import classNames from 'classnames';
import {
  EuiTabs,
  EuiTab,
  EuiTabProps,
} from '../../../../../src/components/tabs';
import { EuiErrorBoundary } from '../../../../../src/components/error_boundary';
import { EuiHorizontalRule } from '../../../../../src/components/horizontal_rule';
import { GuideSectionSnippets } from './guide_section_snippets';
import { GuideSectionExampleCode } from './guide_section_code';
import { GuideSectionPropsTable } from './guide_section_props_table';
import { EuiFlexGroup, EuiFlexItem } from '../../../../../src/components/flex';
import { EuiPanel } from '../../../../../src/components/panel';

export const GuideSectionCodeTypesMap = {
  JS: 'javascript',
  HTML: 'html',
  SNIPPET: 'snippet',
};

type GuideSectionCodeType = keyof typeof GuideSectionCodeTypesMap;

export interface GuideSectionExampleTabType extends EuiTabProps {
  type?: GuideSectionCodeType | string;
  code?: {} | string | string[];
  displayName: string;
  name: string;
  props?: any;
}

export type GuideSectionExampleTabsProps = {
  tabs: GuideSectionExampleTabType[];
  /** Renders any content to the right of the tabs (playground toggle) */
  rightSideControl?: ReactNode;
  /** Forces display of a certain content (playground props table) */
  tabContent?: ReactNode;
};

export const GuideSectionExampleTabs: FunctionComponent<GuideSectionExampleTabsProps> = ({
  tabs,
  rightSideControl,
  tabContent,
}) => {
  const [selectedTabId, setSelectedTabId] = useState();

  const onSelectedTabChanged = (id) => {
    if (id === selectedTabId) {
      setSelectedTabId(undefined);
    } else {
      setSelectedTabId(id);
    }
  };

  const tabClasses = classNames('guideDemo__tabs', {
    'guideDemo__tabs--open': selectedTabId,
  });

  const renderTabs = () => {
    return (
      <EuiTabs size="s" display="condensed">
        {tabs.map((tab, index) => {
          const { displayName, code, type, name, ...rest } = tab;

          return (
            <EuiTab
              name={name}
              onClick={() => onSelectedTabChanged(name)}
              isSelected={name === selectedTabId}
              key={index}
              {...rest}>
              {tab.displayName}
            </EuiTab>
          );
        })}
      </EuiTabs>
    );
  };

  const renderContent = () => {
    if (!selectedTabId) return null;

    const selectedTab = tabs.find((tab) => tab.name === selectedTabId);

    // SNIPPET
    if (selectedTabId === 'snippet') {
      return (
        <EuiErrorBoundary>
          <EuiHorizontalRule margin="none" />
          <GuideSectionSnippets snippets={selectedTab.code} />
        </EuiErrorBoundary>
      );
      // SOURCE CODE BLOCK
    } else if (selectedTab.code) {
      return (
        <EuiErrorBoundary>
          <EuiHorizontalRule margin="none" />
          <GuideSectionExampleCode
            language={selectedTab.type}
            code={selectedTab.code}
            // codeSandbox={this.props.source[0].code.default}
          />
        </EuiErrorBoundary>
      );
      // PROPS TABLE
    } else if (selectedTab.props) {
      const components = Object.keys(selectedTab.props);

      return components
        .map((component) => (
          <GuideSectionPropsTable
            key={component}
            componentName={component}
            component={selectedTab.props[component]}
          />
        ))
        .reduce((a, b) => a.concat(b), []); // Flatten the resulting array;
    }
  };

  return (
    <>
      <EuiFlexGroup
        className={tabClasses}
        gutterSize="none"
        alignItems="center">
        <EuiFlexItem>{renderTabs()}</EuiFlexItem>
        <EuiFlexItem grow={false}>{rightSideControl}</EuiFlexItem>
      </EuiFlexGroup>
      {(selectedTabId || tabContent) && (
        <EuiPanel paddingSize="none" color="subdued">
          {renderContent() || tabContent}
        </EuiPanel>
      )}
    </>
  );
};
