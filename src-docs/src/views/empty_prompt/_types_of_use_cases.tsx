import React, { useContext } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiLoadingLogo,
  EuiImage,
  EuiTitle,
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';
import { ThemeContext } from '../../components/with_theme';
import genericIllustration from '../../images/empty-prompt/illustration.svg';

const forbiddenLight = '../../images/empty-prompt/403_rainy_cloud_light.png';
const forbiddenDark = '../../images/empty-prompt/403_rainy_cloud_dark.png';
const pageNotFoundLight = '../../images/empty-prompt/404_rainy_cloud_light.png';
const pageNotFoundDark = '../../images/empty-prompt/404_rainy_cloud_dark.png';

const ForbiddenImg = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const pageNotFoundImg = isDarkTheme ? forbiddenDark : forbiddenLight;

  return <EuiImage size="fullWidth" src={pageNotFoundImg} alt="" />;
};

const PageNotFoundImg = () => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const pageNotFoundImg = isDarkTheme ? pageNotFoundDark : pageNotFoundLight;

  return <EuiImage size="fullWidth" src={pageNotFoundImg} alt="" />;
};

const GenericIllustration = () => (
  <EuiImage size="fullWidth" src={genericIllustration} alt="" />
);

export const typesOfUseCases: any = {
  noData: {
    id: 'noData',
    label: 'No data',
    info: {
      description: (
        <p>
          No data is available, or the data doesn&apos;t match the filter. First
          time use.
        </p>
      ),
      goal: (
        <p>
          Help users understand why no data is displayed and what actions they
          can perform to make it available.
        </p>
      ),
      action: <p>Add data</p>,
    },
    example: {
      icon: <GenericIllustration />,
      title: <h2>Get started by adding your data</h2>,
      layout: 'horizontal',
      body: (
        <>
          <p>
            To start working with your data, use one of our many ingest options.
            Collect data from an app or service, or upload a file.
          </p>
          <p>
            If you&apos;re not ready to use your own data, add a sample data
            set.
          </p>
        </>
      ),
      actions: [
        <EuiButton color="primary" fill>
          Add your data
        </EuiButton>,
        <EuiButtonEmpty>Try sample data</EuiButtonEmpty>,
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
  noPermission: {
    id: 'noPermission',
    label: 'No permission',
    info: {
      description: <p>No permission to access the content.</p>,
      goal: (
        <p>
          Help users understand why they don&apos;t have permission to access
          the content and what actions to take to get access.
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
  },
  error: {
    id: 'error',
    label: 'Error',
    info: {
      description: <p>An error happened.</p>,
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
  pageNotFound: {
    id: 'pageNotFound',
    label: '404 Not Found',
    info: {
      description: <p>The page was not found.</p>,
      goal: (
        <p>
          Help users understand why the page was not found. That could be either
          because the page never existed, the page was removed (deleted), or the
          page&apos;s URL was changed to a different URL.
        </p>
      ),
      action: <p>Go home or go back</p>,
    },
    example: {
      title: <h2>Page not found</h2>,
      icon: <PageNotFoundImg />,
      layout: 'horizontal',
      body: (
        <>
          <p>
            “Reality is frequently inaccurate.” The Restaurant at the End of the
            Universe
          </p>
          <p>
            Sorry, we can&apos;t seem to find the page you&apos;re looking for.
            It might have been removed or renamed, or maybe it never existed at
            all.
          </p>
        </>
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
  forbidden: {
    id: 'forbidden',
    label: '403 Forbidden',
    info: {
      description: <p>The page was not found.</p>,
      goal: (
        <p>
          Help users understand why the page was not found. That could be either
          because the page never existed, the page was removed (deleted), or the
          page&apos;s URL was changed to a different URL.
        </p>
      ),
      action: <p>Go home or go back</p>,
    },
    example: {
      title: <h2>Access denied</h2>,
      icon: <ForbiddenImg />,
      layout: 'horizontal',
      body: (
        <>
          <p>
            “For a moment, nothing happened. Then, after a second or so, nothing
            continued to happen.” The Hitchhiker&apos;s Guide to the Galaxy
          </p>
          <p>
            Unfortunately, you don’t have permission to access this page.
            Contact your administrator for help or reach out to us at{' '}
            <a href="#">support.elastic.co</a>.
          </p>
        </>
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
