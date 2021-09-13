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
import { ExclusiveUnion } from '../../../../../src/components/common';

export type GuideSectionExampleTabCodeType = GuideSectionExampleCode;
export type GuideSectionExampleTabSnippetType = GuideSectionSnippets;
export type GuideSectionExampleTabPropsTableType = {
  props: any;
};

export type GuideSectionExampleTabType = EuiTabProps &
  ExclusiveUnion<
    GuideSectionExampleTabCodeType,
    ExclusiveUnion<
      GuideSectionExampleTabSnippetType,
      GuideSectionExampleTabPropsTableType
    >
  > & {
    displayName: string;
    name: string;
  };

export type GuideSectionExampleTabsProps = {
  tabs: GuideSectionExampleTabType[];
  /** Renders any content to the right of the tabs (playground toggle) */
  rightSideControl?: ReactNode;
};

export const GuideSectionExampleTabs: FunctionComponent<GuideSectionExampleTabsProps> = ({
  tabs,
  rightSideControl,
}) => {
  const [selectedTabId, setSelectedTabId] = useState('');

  const onSelectedTabChanged = (id: string) => {
    if (id === selectedTabId) {
      setSelectedTabId('');
    } else {
      setSelectedTabId(id);
    }
  };

  const tabClasses = classNames('guideSectionTabs', {
    'guideSectionTabs--open': selectedTabId,
  });

  const renderTabs = () => {
    return (
      <EuiTabs size="s" display="condensed">
        {tabs.map((tab, index) => {
          const {
            displayName,
            code,
            type,
            name,
            props,
            snippets,
            ...rest
          } = tab;

          return (
            <EuiTab
              {...rest}
              className="guideSectionTabs__tab"
              name={name}
              onClick={() => onSelectedTabChanged(name)}
              isSelected={name === selectedTabId}
              key={index}
            >
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
    if (selectedTab && selectedTab.snippets) {
      return (
        <EuiErrorBoundary>
          <EuiHorizontalRule margin="none" />
          <GuideSectionSnippets snippets={selectedTab.snippets} />
        </EuiErrorBoundary>
      );
      // SOURCE CODE BLOCK
    } else if (selectedTab && selectedTab.code) {
      return (
        <EuiErrorBoundary>
          <EuiHorizontalRule margin="none" />
          <GuideSectionExampleCode
            code={selectedTab.code}
            type={selectedTab.type}
          />
        </EuiErrorBoundary>
      );
      // PROPS TABLE
    } else if (selectedTab && selectedTab.props) {
      const components = Object.keys(selectedTab.props);

      return components.map((component) => (
        <EuiErrorBoundary key={component}>
          <EuiHorizontalRule margin="none" />
          <GuideSectionPropsTable
            key={component}
            componentName={component}
            component={selectedTab.props[component]}
          />
        </EuiErrorBoundary>
      ));
    }
  };

  return (
    <>
      <EuiFlexGroup
        className={tabClasses}
        responsive={false}
        wrap
        gutterSize="none"
        alignItems="center"
      >
        <EuiFlexItem>{renderTabs()}</EuiFlexItem>
        <EuiFlexItem grow={false}>{rightSideControl}</EuiFlexItem>
      </EuiFlexGroup>
      {selectedTabId && renderContent()}
    </>
  );
};
