import React from 'react';
import singleSvg from '../../images/single.svg';
import contentCenterSvg from '../../images/content_center.svg';

import { EuiPageTemplate, EuiPageSection, EuiImage } from '../../../../src';

export default () => {
  return (
    <EuiPageTemplate
      bottomBorder="extended"
      minHeight="0"
      offset={0}
      style={{ height: 400 }}
    >
      {/* Sidebar content can now be instantiated anywhere and it will always be placed in the correct spot */}
      <EuiPageTemplate.Sidebar>
        <EuiImage size={'original'} alt="Fake side nav list" url={singleSvg} />
      </EuiPageTemplate.Sidebar>
      {/* This non-namespaced section will not be tied to the template ensuring it's display is always custom */}
      <EuiPageSection color="subdued">
        Some content before the page header
      </EuiPageSection>
      {/* Display a page header anywhere in the stack of contents */}
      <EuiPageTemplate.Header pageTitle="Page title" />
      {/* This template section overrides some default template props */}
      <EuiPageTemplate.Section grow={false} bottomBorder="extended">
        Some content after the page header
      </EuiPageTemplate.Section>
      {/* Empty prompts can be placed anywhere in the stack and not replace the entire page contents */}
      <EuiPageTemplate.EmptyPrompt>
        <EuiImage size={'l'} alt="Fake paragraph" url={contentCenterSvg} />
      </EuiPageTemplate.EmptyPrompt>
    </EuiPageTemplate>
  );
};
