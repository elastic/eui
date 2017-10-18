import React from 'react';

import {
  render,
  configure
} from 'enzyme';

import EnzymeAdapter from 'enzyme-adapter-react-16';

import html from 'html';

configure({ adapter: new EnzymeAdapter() });

export function renderToHtml(componentReference, props = {}) {
  // Create the React element, render it and get its HTML, then format it prettily.
  const element = React.createElement(componentReference, props);
  const htmlString = render(element).html();
  return html.prettyPrint(htmlString, {
    indent_size: 2,
    unformatted: [], // Expand all tags, including spans
  });
}
