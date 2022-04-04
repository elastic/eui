import React from 'react';

import { EuiPageTemplate } from '../../../../../src';

import ComposedDefault from './page_default';
import ComposedCenteredBody from './page_centered_body';
import ComposedCenteredContent from './page_centered_content';
import ComposedCustom from './page_custom_content';

export default ({ content, sideNav, template, pageHeader }) => {
  switch (template) {
    case 'default':
      return (
        <ComposedDefault
          pageHeader={pageHeader}
          content={content}
          sideNav={sideNav}
        />
      );
      break;
    case 'centeredBody':
      return (
        <ComposedCenteredBody
          pageHeader={pageHeader}
          content={content}
          sideNav={sideNav}
        />
      );
      break;
    case 'centeredContent':
      return (
        <ComposedCenteredContent
          pageHeader={pageHeader}
          content={content}
          sideNav={sideNav}
        />
      );
      break;
    case 'empty':
      return (
        <ComposedCustom
          pageHeader={pageHeader}
          content={content}
          sideNav={sideNav}
        />
      );
      break;

    default:
      return (
        <EuiPageTemplate
          template={template}
          pageSideBar={sideNav}
          pageHeader={pageHeader}
        >
          {content}
        </EuiPageTemplate>
      );
      break;
  }
};
