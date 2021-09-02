import PropTypes from 'prop-types';
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  EuiBetaBadge,
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody,
} from '../../../../src/components';

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

  return (
    <>
      <EuiPageHeader
        restrictWidth
        pageTitle={
          <>
            {title} {betaBadge}
          </>
        }
        tabs={renderTabs()}
      >
        {intro}
      </EuiPageHeader>

      <EuiPageContent
        role="main"
        hasShadow={false}
        paddingSize="none"
        color="transparent"
        hasBorder={false}
        borderRadius="none"
      >
        <EuiPageContentBody restrictWidth>
          <Switch>
            {playground && (
              <Route path={`${match.path}/playground`}>{playground}</Route>
            )}
            {guidelines && (
              <Route path={`${match.path}/guidelines`}>{guidelines}</Route>
            )}
            <Route path="">{children}</Route>
          </Switch>
        </EuiPageContentBody>
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
};

export const GuidePage = withRouter(GuidePageComponent);
