import React, { FunctionComponent } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { slugify } from '../../../../src/services/string/slugify';
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
    const id = slugify(page.title);
    return {
      id: id,
      name: page.title,
      handleClick: () => {
        history.push(`${match.path}/${id}`);
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
    const id = slugify(page.title);
    const firstTabId = slugify(pages[0].title);

    // first nav level redirects to first tab
    if (match.path === pathname) {
      return (
        <Redirect from={`${match.path}`} to={`${match.path}/${firstTabId}`} />
      );
    } else {
      return <Route path={`${match.path}/${id}`}>{page.page}</Route>;
    }
  });

  return (
    <>
      <EuiPageHeader restrictWidth pageTitle={title} tabs={renderTabs()} />

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
