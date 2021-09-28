import React, { FunctionComponent } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import {
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody,
} from '../../../../src/components/page';

export type GuideTabbedPageProps = {
  examples: any;
  guidelines: any;
  pages: any;
  title: string;
  match: any;
  history: any;
  location: any;
};

const GuideTabbedPageComponent: FunctionComponent<GuideTabbedPageProps> = ({
  title,
  location,
  match,
  history,
  pages,
}) => {
  const tabs: any[] = pages.map((page: any) => {
    return {
      id: page.id,
      name: page.title,
      handleClick: () => {
        history.push(`${match.path}/${page.id}`);
      },
    };
  });

  const renderTabs = () => {
    if (tabs.length < 2) {
      return undefined;
    }

    return tabs.map(({ id, handleClick, name }, index) => {
      const pathname = location.pathname;

      const isSelected = pathname === `${match.path}/${id}`;

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

  const pagesRoutes: any[] = pages.map((page: any) => {
    const pathname = location.pathname;

    // first nav level redirects to first tab
    if (match.path === pathname) {
      return (
        <Redirect from={`${match.path}`} to={`${match.path}/${pages[0].id}`} />
      );
    } else {
      return <Route path={`${match.path}/${page.id}`}>{page.page}</Route>;
    }
  });

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
          <Switch>{pagesRoutes}</Switch>
        </EuiPageContentBody>
      </EuiPageContent>
    </>
  );
};

export const GuideTabbedPage = withRouter(GuideTabbedPageComponent);
