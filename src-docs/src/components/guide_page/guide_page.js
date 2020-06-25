import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  EuiTitle,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiBetaBadge,
  EuiTab,
  EuiTabs,
  EuiHorizontalRule,
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
  ) : (
    undefined
  );

  console.log('rest', { history, match, location });

  const tabs = [
    {
      id: 'examples',
      name: 'Examples',
      handleClick: () => {
        history.push(`${match.path}`);
      },
    },
  ];
  if (playground)
    tabs.push({
      id: 'playground',
      name: 'Playground',
      handleClick: () => {
        history.push(`${match.path}/playground`);
      },
    });
  if (guidelines)
    tabs.push({
      id: 'guidelines',
      name: 'Guidelines',
      handleClick: () => {
        history.push(`${match.path}/guidelines`);
      },
    });

  const isGuideLineView =
    location.pathname.endsWith('guidelines') ||
    location.pathname.endsWith('guidelines/');
  const isPlaygroundView =
    location.pathname.endsWith('playground') ||
    location.pathname.endsWith('playground/');

  const renderTabs = () => {
    return tabs.map(({ id, handleClick, name }, index) => {
      let isSelected = false;
      if (id === 'playground') isSelected = isPlaygroundView;
      else if (id === 'guidelines') isSelected = isGuideLineView;
      else isSelected = !isGuideLineView && !isPlaygroundView;

      return (
        <EuiTab
          onClick={() => {
            if (handleClick) handleClick();
          }}
          isSelected={isSelected}
          key={index}>
          {name}
        </EuiTab>
      );
    });
  };

  const showIntro = !isGuideLineView && !isPlaygroundView;

  return (
    <Fragment>
      <div className="guideSection__text">
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiTitle size="l">
              <h1>
                {title} {betaBadge}
              </h1>
            </EuiTitle>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiTabs display="condensed">
              {tabs.length > 1 && renderTabs()}
            </EuiTabs>
          </EuiFlexItem>
        </EuiFlexGroup>

        {tabs.length > 1 && <EuiHorizontalRule />}

        <EuiSpacer size="m" />

        {/* {showIntro && intro} */}
      </div>
      <Switch>
        {playground && (
          <Route path={`${match.path}/playground`} exact>
            {playground}
          </Route>
        )}
        {guidelines && (
          <Route path={`${match.path}/guidelines`} exact>
            {guidelines}
          </Route>
        )}
        <Route path="">
          <div className="guideSection__text">{intro}</div>
          <>{children}</>
        </Route>
      </Switch>

      {/* Give some space between the bottom of long content and the bottom of the screen */}
      <EuiSpacer size="xl" />
    </Fragment>
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
