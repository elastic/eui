import React, { ReactNode } from 'react';
import { EuiLink } from '../../../../src/components';
import { examples, examplesType } from './_examples';

export const typesOfUseCases: {
  [key: string]: {
    id: string;
    label: string;
    info: {
      description: ReactNode;
      goal: ReactNode;
      action?: ReactNode;
    };
    example: examplesType;
    footer?: ReactNode;
  };
} = {
  firstUse: {
    id: 'firstUse',
    label: 'First time use',
    info: {
      description: <p>First time use.</p>,
      goal: (
        <>
          <p>Help users understand how they can start using the product.</p>
          <p>
            For no data use cases, consider using a{' '}
            <EuiLink href="#/display/card">EuiCard</EuiLink>. In Kibana, you
            just need to pass a no data configuration into your{' '}
            <EuiLink
              href="https://github.com/elastic/kibana/blob/main/dev_docs/tutorials/kibana_page_template.mdx"
              target="_blank"
            >
              KibanaPageTemplate
            </EuiLink>{' '}
            to display a specific UI that guides users to add data.
          </p>
        </>
      ),
      action: (
        <p>
          Actions specific to first use. For example: “Add cases”, “Create job”,
          “Add workpad”.
        </p>
      ),
    },
    example: {
      ...examples.startAddingCases,
    },
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
      action: <p>Request permission.</p>,
    },

    example: {
      ...examples.noPrivileges,
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
      ...examples.noResults,
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
      ...examples.unableToLoadDashboards,
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
      action: <p>Go home or go back.</p>,
    },
    example: {
      ...examples.pageNotFound,
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
      action: <p>Start a trial or upgrade the license.</p>,
    },
    example: {
      ...examples.licenseUpgrade,
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
      ...examples.loading,
    },
  },
};
