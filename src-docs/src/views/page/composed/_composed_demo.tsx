import React, { ReactElement } from 'react';

import {
  EuiPageHeaderProps,
  EuiPageTemplate,
  EuiPageTemplateProps,
} from '../../../../../src';

import ComposedDefault from './page_default';
const ComposedDefaultSource = require('!!raw-loader!./page_default');
import ComposedCenteredBody from './page_centered_body';
const ComposedCenteredBodSource = require('!!raw-loader!./page_centered_body');
import ComposedCenteredContent from './page_centered_content';
const ComposedCenteredContentSource = require('!!raw-loader!./page_centered_content');
import ComposedCustom from './page_empty';
const ComposedCustomSource = require('!!raw-loader!./page_empty');

export const composedSources = {
  default: ComposedDefaultSource,
  centeredBody: ComposedCenteredBodSource,
  centeredContent: ComposedCenteredContentSource,
  empty: ComposedCustomSource,
};

export default ({
  template,
  content = <></>,
  sideNav,
  pageHeader,
}: {
  template: EuiPageTemplateProps['template'];
  content: ReactElement;
  sideNav?: ReactElement;
  pageHeader?: EuiPageHeaderProps;
}) => {
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
