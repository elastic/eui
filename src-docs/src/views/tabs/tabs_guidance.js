import React from 'react';
import { Link } from 'react-router-dom';

import {
  EuiCode,
  EuiText,
  EuiLink,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <>
    <EuiText grow={false}>
      <h2>Follow best practices for tabbed interfaces</h2>
      <p>
        Use tabs to organize in-page content. Each tab should contain a segment
        of information relevant to the current subject. For more best practices
        see{' '}
        <EuiLink href="https://www.nngroup.com/articles/tabs-used-right/">
          NNG&apos;s article &quot;Tabs, Used Right&quot;
        </EuiLink>
        .
      </p>
      <EuiSpacer size="xs" />
      <h3>Use props to tailor the user experience</h3>
      <p>
        Tab props allow consumers to set the selected tab on first render, and
        add custom behavior on tab click. For instance, you could use the{' '}
        <EuiCode>selectedTab</EuiCode> prop to show a second or third tab on
        page load. You could also use the <EuiCode>onTabClick</EuiCode> prop to
        add custom click behavior.
      </p>
      <EuiSpacer size="xs" />
      <h3>Manage the user experience if you change routes or URLs</h3>
      <p>
        Be sure the correct tab is selected if you use the{' '}
        <EuiCode>href</EuiCode> prop to append a hash to the current route. If
        your tab adds a <EuiCode>#tabbedHash</EuiCode> to the URL, the matching
        tab should be selected when users refresh the page. It can be confusing
        to users when hash routes do not match a selected tab.
      </p>
      <EuiSpacer size="xs" />
      <h3>Tabs must not update higher-level navigation</h3>
      <p>
        Do not update navigation such as{' '}
        <Link to="/navigation/breadcrumbs">
          <strong>breadcrumbs</strong>
        </Link>{' '}
        or{' '}
        <Link to="/navigation/collapsible-nav">
          <strong>navigation menus</strong>
        </Link>{' '}
        when users click on tabs. Tabs show localized information and it is not
        always clear what changed if tabs are below the fold or navigation does
        not match the route.
      </p>
    </EuiText>
  </>
);
