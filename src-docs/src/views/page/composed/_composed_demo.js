import React from 'react';

import { EuiPageTemplate } from '../../../../../src';

import ComposedDefault from './page_default';

export default ({ button = <></>, content, sideNav, template }) => {
  switch (template) {
    case 'default':
      return (
        <ComposedDefault button={button} content={content} sideNav={sideNav} />
      );
      break;

    default:
      return (
        <EuiPageTemplate
          template={template}
          pageSideBar={sideNav}
          pageHeader={{
            iconType: 'logoElastic',
            pageTitle: 'Page title',
            rightSideItems: [button],
            tabs: [
              { label: 'Tab 1', isSelected: true },
              {
                label: 'Tab 2',
              },
            ],
          }}
        >
          {content}
        </EuiPageTemplate>
      );
      break;
  }
};
