import React, { FunctionComponent } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import {
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody,
} from '../../../../src/components/page';

export type GuideGuidelinesProps = {
  examples: any;
  guidelines: any;
  title: string;
  match: any;
  history: any;
  location: any;
};

const GuideGuidelinesComponent: FunctionComponent<GuideGuidelinesProps> = ({
  title,
  guidelines,
  location,
  match,
  history,
  examples,
}) => {
  const tabs: any[] = [];

  tabs.push(
    {
      id: 'guidelines',
      name: 'Guidelines',
      handleClick: () => {
        history.push(`${match.path}`);
      },
    },
    {
      id: 'examples',
      name: 'Examples',
      handleClick: () => {
        history.push(`${match.path}/examples`);
      },
    }
  );

  const isExamplesView = location.pathname.includes('examples');

  const renderTabs = () => {
    if (tabs.length < 2) {
      return undefined;
    }

    return tabs.map(({ id, handleClick, name }, index) => {
      let isSelected = false;

      if (id === 'examples') {
        isSelected = isExamplesView;
      } else if (id === 'guidelines') {
        isSelected = !isExamplesView;
      }

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
        pageTitle={<>{title}</>}
        tabs={renderTabs()}
      />

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
            {examples && (
              <Route path={`${match.path}/examples`}>{examples}</Route>
            )}
            <Route path="">{guidelines}</Route>
          </Switch>
        </EuiPageContentBody>
      </EuiPageContent>
    </>
  );
};

export const GuideGuidelines = withRouter(GuideGuidelinesComponent);
