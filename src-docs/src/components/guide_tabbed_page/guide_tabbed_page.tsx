import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useContext,
} from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { slugify } from '../../../../src/services/string/slugify';
import {
  EuiPageHeader,
  EuiBetaBadge,
  CommonProps,
} from '../../../../src/components';

import { LanguageSelector, ThemeContext } from '../with_theme';
import { GuideSection } from '../guide_section/guide_section';

export type GuideTabbedPageProps = PropsWithChildren &
  CommonProps & {
    description?: ReactNode;
    guidelines?: ReactNode;
    intro?: ReactNode;
    isBeta?: boolean;
    isNew?: boolean;
    notice?: ReactNode;
    pages?: any;
    rightSideItems?: ReactNode[];
    showThemeLanguageToggle?: boolean;
    tabs?: any;
    title: string;
  };

export const GuideTabbedPage: FunctionComponent<GuideTabbedPageProps> = ({
  description,
  guidelines,
  intro,
  isBeta,
  isNew,
  notice,
  pages,
  rightSideItems: _rightSideItems,
  showThemeLanguageToggle,
  tabs: _tabs,
  title,
  children,
}) => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const headerBadge =
    isBeta || (showThemeLanguageToggle && !showSass) ? (
      <EuiBetaBadge
        label="Beta"
        color="accent"
        tooltipContent="This component is still under development and may contain breaking changes in the nearby future."
      />
    ) : isNew ? (
      <EuiBetaBadge label="New" color="accent" />
    ) : undefined;

  let tabs:
    | Array<{
        id: string;
        handleClick: () => void;
        name: string;
      }>
    | undefined = undefined;

  if (pages) {
    tabs = pages.map((page: any) => {
      const id = slugify(page.title);
      return {
        id: id,
        name: page.title,
        handleClick: () => {
          history.push(`${match.path}/${id}`);
        },
      };
    });
  } else if (guidelines) {
    tabs = [
      {
        id: 'examples',
        name: 'Examples',
        handleClick: () => {
          history.push(`${match.path}`);
        },
      },
      {
        id: 'guidelines',
        name: 'Guidelines',
        handleClick: () => {
          history.push(`${match.path}/guidelines`);
        },
      },
    ];
  }

  let pagesRoutes: any[];

  if (pages) {
    pagesRoutes = pages.map((page: any) => {
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
  } else {
    pagesRoutes = [
      guidelines ? (
        <Route key={'guidelines'} path={`${match.path}/guidelines`}>
          <GuideSection>{guidelines}</GuideSection>
        </Route>
      ) : undefined,
      <Route key="default" path="">
        {children}
      </Route>,
    ];
  }

  const renderTabs = () => {
    if (_tabs) {
      return _tabs;
    } else if (!tabs) {
      return undefined;
    }

    return tabs.map(({ id, handleClick, name }, index) => {
      const pathname = location.pathname;

      let isSelected = false;
      if (id === 'guidelines')
        isSelected = pathname.includes(`${match.path}/guidelines`);
      else if (id === 'examples')
        isSelected =
          !pathname.includes(`${match.path}/`) || pathname.includes('examples');
      else isSelected = pathname.includes(`${match.path}/${id}`);

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
        <GuideSection>
          <div role="region" aria-label="Notice">
            {notice}
          </div>
        </GuideSection>
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
      <EuiPageHeader
        restrictWidth
        paddingSize="l"
        pageTitle={
          <>
            {title} {headerBadge}
          </>
        }
        tabs={renderTabs()}
        description={description}
        rightSideItems={rightSideItems}
        bottomBorder="extended"
      >
        {intro}
      </EuiPageHeader>

      <Switch>{pagesRoutes}</Switch>
    </>
  );
};
