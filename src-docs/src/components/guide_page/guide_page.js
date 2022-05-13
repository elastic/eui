import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  EuiBetaBadge,
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody,
  EuiSpacer,
} from '../../../../src/components';

import { LanguageSelector } from '../with_theme';

const GuidePageComponent = ({
  children,
  title,
  intro,
  isBeta,
  playground,
  guidelines,
  location,
  match,
  history,
  description,
  rightSideItems: _rightSideItems,
  tabs: _tabs,
  notice,
  showThemeLanguageToggle,
}) => {
  const betaBadge = isBeta ? (
    <EuiBetaBadge
      label="Beta"
      tooltipContent="This component is still under development and may contain breaking changes in the nearby future."
    />
  ) : undefined;

  const tabs = [
    {
      id: 'examples',
      name: 'Examples',
      handleClick: () => {
        history.push(`${match.path}`);
      },
    },
  ];

  if (guidelines)
    tabs.push({
      id: 'guidelines',
      name: 'Guidelines',
      handleClick: () => {
        history.push(`${match.path}/guidelines`);
      },
    });
  if (playground)
    tabs.push({
      id: 'playground',
      name: 'Playground',
      handleClick: () => {
        history.push(`${match.path}/playground`);
      },
    });

  const isGuideLineView = location.pathname.includes('guidelines');
  const isPlaygroundView = location.pathname.includes('playground');

  const renderTabs = () => {
    if (tabs.length < 2) {
      return undefined;
    }

    return tabs.map(({ id, handleClick, name }, index) => {
      let isSelected = false;
      if (id === 'playground') isSelected = isPlaygroundView;
      else if (id === 'guidelines') isSelected = isGuideLineView;
      else isSelected = !isGuideLineView && !isPlaygroundView;

      return {
        onClick: () => {
          if (handleClick) handleClick();
        },
        isSelected,
        key: index,
        label: name,
      };
    });
  };

  const renderNotice = () => {
    if (notice) {
      return (
        <>
          <EuiSpacer size="l" />
          <EuiPageContentBody role="region" aria-label="Notice" restrictWidth>
            {notice}
          </EuiPageContentBody>
          <EuiSpacer size="l" />
        </>
      );
    }
  };

  const rightSideItems = _rightSideItems || [];
  if (showThemeLanguageToggle) {
    rightSideItems.push(<LanguageSelector />);
  }

  return (
    <>
      {renderNotice()}
      <EuiPageContentBody style={{ paddingBlockEnd: 0 }} paddingSize="l">
        <EuiPageHeader
          restrictWidth
          pageTitle={
            <>
              {title} {betaBadge}
            </>
          }
          tabs={renderTabs() || _tabs}
          description={description}
          rightSideItems={rightSideItems}
          bottomBorder
        >
          {intro}
        </EuiPageHeader>
      </EuiPageContentBody>

      <EuiPageContent
        role="main"
        hasShadow={false}
        paddingSize="none"
        color="transparent"
        hasBorder={false}
        borderRadius="none"
      >
        <Switch>
          {playground && (
            <Route path={`${match.path}/playground`}>
              <EuiPageContentBody restrictWidth>
                <EuiSpacer size="xl" />
                {playground}
              </EuiPageContentBody>
            </Route>
          )}
          {guidelines && (
            <Route path={`${match.path}/guidelines`}>
              <EuiPageContentBody restrictWidth>
                <EuiSpacer size="xl" />
                {guidelines}
              </EuiPageContentBody>
            </Route>
          )}
          <Route path="">{children}</Route>
        </Switch>
      </EuiPageContent>
    </>
  );
};

GuidePageComponent.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  intro: PropTypes.node,
  componentLinkTo: PropTypes.string,
  isBeta: PropTypes.bool,
  playground: PropTypes.node,
  guidelines: PropTypes.node,
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  description: PropTypes.node,
  notice: PropTypes.node,
  tabs: PropTypes.arrayOf(PropTypes.object),
  rightSideItems: PropTypes.arrayOf(PropTypes.node),
  showThemeLanguageToggle: PropTypes.bool,
};

export const GuidePage = withRouter(GuidePageComponent);
