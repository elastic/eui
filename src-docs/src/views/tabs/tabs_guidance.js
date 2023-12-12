import React from 'react';

import {
  EuiCode,
  EuiText,
  EuiLink,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <>
    <EuiText grow={false}>
      <h2>Do</h2>
      <p>
        Follow best practices. Use tabs to organize in-page content. Each tab
        should contain a segment of information relevant to the current subject.
        For more UX tips see{' '}
        <EuiLink href="https://www.nngroup.com/articles/tabs-used-right/">
          NNG&apos;s article &quot;Tabs, Used Right&quot;
        </EuiLink>
        .
      </p>
      <h2>Do</h2>
      <p>
        For tabs showing primary page content, use the <EuiCode>href</EuiCode>{' '}
        prop to change the current URL hash. Ensure the tab selection is
        persisted in the user's navigation history and works with the browser's
        back button.
      </p>
      <EuiSpacer size="xs" />
      <h2>Do</h2>
      <p>
        Ensure when a page is loaded with a URL hash representing a selected tab
        (as applied by the <EuiCode>href</EuiCode> prop), that the corresponding
        tab is shown using the <EuiCode>selectedTab</EuiCode> prop.
      </p>
      <EuiSpacer size="xs" />
      <h2>Don't</h2>
      <p>
        Apply the <EuiCode>href</EuiCode> prop to change the current page URL
        hash on more than one set of tabs per page, or non-primary content.
      </p>
      <EuiSpacer size="xs" />
      <h2>Don't</h2>
      <p>
        Keep users on the same page visually, but change the higher-level
        navigation logically. Tabs should keep users at the same place within an
        application. Breadcrumbs and main navigation should not change. The URL
        hash is the only thing that should change.
      </p>
    </EuiText>
  </>
);
