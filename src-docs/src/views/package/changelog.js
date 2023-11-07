import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  EuiSkeletonLoading,
  EuiSkeletonTitle,
  EuiSkeletonText,
  EuiMarkdownFormat,
  EuiSpacer,
} from '../../../../src';
import { GuideSection } from '../../components';
import { GuideTabbedPage } from '../../components/guide_tabbed_page';

const thisYear = new Date().getUTCFullYear();
const startingYear = 2017;
const years = thisYear - startingYear + 1;
const yearsAsArray = Array.from({ length: years }, (_, i) => thisYear - i);

const ChangelogPageByYear = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [changelogSource, setChangelogSource] = useState('');

  const { pathname } = useLocation();
  useEffect(() => {
    const pathArray = pathname.split('/');
    const year = pathArray[pathArray.length - 1];

    setChangelogSource(
      require(`!!raw-loader!../../../../changelogs/CHANGELOG_${year}.md`)
        .default
    );
    setIsLoading(false);
  }, [pathname]);

  return (
    <GuideSection>
      <EuiSkeletonLoading
        isLoading={isLoading}
        contentAriaLabel="Changelog"
        loadingContent={
          <>
            <EuiSkeletonTitle size="l" />
            <EuiSpacer size="s" />
            <EuiSkeletonText lines={10} />
          </>
        }
        loadedContent={<EuiMarkdownFormat>{changelogSource}</EuiMarkdownFormat>}
      />
    </GuideSection>
  );
};

export const Changelog = {
  name: 'Changelog',
  component: () => (
    <GuideTabbedPage
      title="Changelog"
      // Renders the tabbed content
      pages={yearsAsArray.map((year) => ({
        title: year.toString(),
        page: ChangelogPageByYear,
      }))}
    />
  ),
  // Renders sidenav links
  sections: yearsAsArray.map((year) => ({
    id: year,
    title: year.toString(),
    sections: [], // Triggers non-# URLs
  })),
};
