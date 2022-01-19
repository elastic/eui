import React, { useContext, ReactNode } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiLoadingLogo,
  EuiImage,
  EuiTitle,
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  IconType,
} from '../../../../src/components';
import { ThemeContext } from '../../components/with_theme';
import pageNotFoundLight from '../../images/empty-prompt/404_rainy_cloud_light.png';
import pageNotFoundDark from '../../images/empty-prompt/404_rainy_cloud_dark.png';
import noResultsLight from '../../images/empty-prompt/no-results--light.svg';
import noResultsDark from '../../images/empty-prompt/no-results--dark.svg';

const PageNotFoundImg = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const pageNotFoundImg = isDarkTheme ? pageNotFoundDark : pageNotFoundLight;

  return <EuiImage size="fullWidth" src={pageNotFoundImg} alt="" />;
};

const NoResultsImg = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const noResultsImg = isDarkTheme ? noResultsDark : noResultsLight;

  return <EuiImage size="fullWidth" src={noResultsImg} alt="" />;
};

export const typesOfUseCases: {
  [key: string]: {
    id: string;
    label: string;
    info: {
      description: ReactNode;
      goal: ReactNode;
      action?: ReactNode;
    };
    example: {
      icon?: ReactNode;
      iconType?: IconType;
      title: ReactNode;
      body?: ReactNode;
      actions?: ReactNode[];
      layout?: 'horizontal' | 'vertical';
      footer?: ReactNode;
    };
    footer?: ReactNode;
  };
} = {
  firstUse: {
    id: 'firstUse',
    label: 'First time use',
    info: {
      description: <p>First time use.</p>,
      goal: (
        <p>
          Help users understand how they can start using the product. For no
          data use cases consider using another component.
        </p>
      ),
      action: (
        <p>
          Actions specific to first use. For example: “Add cases”, “Create job”,
          “Add workpad”
        </p>
      ),
    },
    example: {
      iconType: 'logoSecurity',
      title: <h2>Start adding cases</h2>,
      body: (
        <p>
          There are no cases to display. Add a new case or change your filter
          settings.
        </p>
      ),
      actions: [
        <EuiButton color="primary" fill>
          Add a case
        </EuiButton>,
      ],
    },
    footer: (
      <EuiFlexGroup className="eui-textLeft">
        <EuiFlexItem grow={false}>
          <EuiTitle size="xxs">
            <h3>Want to learn more?</h3>
          </EuiTitle>
          <span>
            <EuiButtonEmpty
              href="#"
              iconType="popout"
              iconSide="right"
              iconSize="s"
              flush="both"
              size="s"
            >
              Read documentation
            </EuiButtonEmpty>
          </span>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiTitle size="xxs">
            <h3>Pretty sure you have data?</h3>
          </EuiTitle>
          <span>
            <EuiButtonEmpty
              onClick={() => {}}
              iconType="refresh"
              iconSide="right"
              iconSize="s"
              flush="both"
              size="s"
            >
              Check for new data
            </EuiButtonEmpty>
          </span>
        </EuiFlexItem>
      </EuiFlexGroup>
    ),
  },
  noPrivileges: {
    id: 'noPrivileges',
    label: 'No privileges',
    info: {
      description: <p>No privileges to access a feature.</p>,
      goal: (
        <p>
          Help users understand why they don&apos;t have privileges to a feature
          and what actions to take to get access.
        </p>
      ),
      action: <p>Request permission</p>,
    },

    example: {
      iconType: 'lock',
      title: <h2>Contact your administrator for access</h2>,
      body: <p>To view cases in this space, you need additional privileges.</p>,
    },
  },
  noResults: {
    id: 'noResults',
    label: 'No results',
    info: {
      description: <p>No results matched the search.</p>,
      goal: (
        <p>
          Help users understand why the search didn&apos;t match any results and
          what they can do to get better results.
        </p>
      ),
      action: (
        <p>
          Refresh, try again, reformat the data, or try another action specific
          to the error.
        </p>
      ),
    },
    example: {
      icon: <NoResultsImg />,
      title: <h2>No results match your search criteria</h2>,
      layout: 'horizontal',
      body: (
        <EuiDescriptionList compressed>
          <EuiDescriptionListTitle>
            Expand your time range
          </EuiDescriptionListTitle>
          <EuiDescriptionListDescription>
            Try searching over a longer period of time.
          </EuiDescriptionListDescription>

          <EuiDescriptionListTitle>Adjust your query</EuiDescriptionListTitle>
          <EuiDescriptionListDescription>
            Try searching for a different combination of terms.
          </EuiDescriptionListDescription>
        </EuiDescriptionList>
      ),
    },
  },
  error: {
    id: 'error',
    label: 'Error loading data',
    info: {
      description: <p>An error happened when loading the data.</p>,
      goal: (
        <p>
          Help users understand why they&apos;re facing an error and what they
          can do to solve it.
        </p>
      ),
    },
    example: {
      iconType: 'alert',
      title: <h2>Error loading Dashboards</h2>,
      body: (
        <p>
          There was an error loading the Dashboard application. Contact your
          administrator for help.
        </p>
      ),
    },
  },
  errorPages: {
    id: 'errorPages',
    label: 'Error pages (4xx and 5xx)',
    info: {
      description: (
        <p>
          The error pages come from client and server errors — the 4xx and 5xx
          status code classes.
        </p>
      ),
      goal: <p>Help users understand there is a client or server error.</p>,
      action: <p>Go home or go back</p>,
    },
    example: {
      title: <h2>Page not found</h2>,
      icon: <PageNotFoundImg />,
      body: (
        <p>
          Sorry, we can&apos;t seem to find the page you&apos;re looking for. It
          might have been removed or renamed, or maybe it never existed at all.
        </p>
      ),
      actions: [
        <EuiButton color="primary" fill>
          Go home
        </EuiButton>,
        <EuiButtonEmpty iconType="arrowLeft" flush="both">
          Go back
        </EuiButtonEmpty>,
      ],
    },
  },
  licenseUpgrade: {
    id: 'licenseUpgrade',
    label: 'License upgrade',
    info: {
      description: <p>No license to use a feature.</p>,
      goal: (
        <p>
          Help users understand that they don&apos;t have the required license
          to access a feature and what actions they need to perform to upgrade
          the license.
        </p>
      ),
      action: <p>Start a trial or upgrade the license</p>,
    },
    example: {
      iconType: 'logoKibana',
      title: <h2>Do more with Kibana!</h2>,
      body: (
        <p>
          Start a free trial or upgrade your license to use anomaly detection.
        </p>
      ),
      actions: [
        <EuiButton color="primary" fill>
          Upgrade
        </EuiButton>,
        <EuiButtonEmpty>Start a free trial</EuiButtonEmpty>,
      ],
      footer: (
        <>
          <EuiTitle size="xxs">
            <h3>Want to learn more?</h3>
          </EuiTitle>
          <EuiLink href="#" target="_blank">
            Read documentation
          </EuiLink>
        </>
      ),
    },
  },
  loading: {
    id: 'loading',
    label: 'Loading',
    info: {
      description: <p>The page or content is loading.</p>,
      goal: <p>Help users understand that the data is loading.</p>,
    },
    example: {
      icon: <EuiLoadingLogo logo="logoKibana" size="xl" />,
      title: <h2>Loading Dashboards</h2>,
    },
  },
};
