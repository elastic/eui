import React, { FunctionComponent, ReactNode, useContext } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { slugify } from '../../../../src/services/string/slugify';
import {
  EuiPageHeader,
  EuiPageContent,
  EuiPageContentBody,
  EuiSpacer,
  EuiBetaBadge,
} from '../../../../src/components';

import { LanguageSelector, ThemeContext } from '../with_theme';

export type GuideTabbedPageProps = {
  title: string;
  location: any;
  match: any;
  history: any;
  pages: any;
  isBeta?: boolean;
  notice?: ReactNode;
  showThemeLanguageToggle?: boolean;
  description?: ReactNode;
  rightSideItems?: ReactNode[];
};

const GuideTabbedPageComponent: FunctionComponent<GuideTabbedPageProps> = ({
  title,
  location,
  match,
  history,
  pages,
  isBeta,
  showThemeLanguageToggle,
  notice,
  description,
  rightSideItems: _rightSideItems,
}) => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const betaBadge = isBeta && (
    <EuiBetaBadge
      label="Beta"
      tooltipContent="This component is still under development and may contain breaking changes in the nearby future."
    />
  );

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

      const isSelected = pathname.includes(`${match.path}/${id}`);

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
    if (!showSass && notice) {
      return (
        <>
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

  const pagesRoutes: any[] = pages.map((page: any) => {
    const pathname = location.pathname;
    const id = slugify(page.title);
    const firstTabId = slugify(pages[0].title);

    // first nav level redirects to first tab
    if (match.path === pathname) {
      return (
        <Redirect
          key={pathname}
          from={`${match.path}`}
          to={`${match.path}/${firstTabId}`}
        />
      );
    } else {
      const PageComponent = page.page;

      return (
        <Route key={pathname} path={`${match.path}/${id}`}>
          <PageComponent showSass={showSass} />
        </Route>
      );
    }
  });

  return (
    <>
      {renderNotice()}
      <EuiPageHeader
        restrictWidth
        pageTitle={
          <>
            {title} {betaBadge}
          </>
        }
        tabs={renderTabs()}
        description={description}
        rightSideItems={rightSideItems}
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
