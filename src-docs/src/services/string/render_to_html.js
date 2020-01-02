import React from 'react';

import { render, configure } from 'enzyme';

import EnzymeAdapter from 'enzyme-adapter-react-16';

import html from 'html';

configure({ adapter: new EnzymeAdapter() });

export function renderToHtml(ComponentReference, props = {}) {
  // If there's a failure, just return an empty string. The actual component itself should
  // trip an error boundary in the UI when it fails.
  try {
    // Create the React element, render it and get its HTML, then format it prettily.
    // the .html() call below renders the contents of the first node, so wrap everything in a div
    const element = (
      <div>
        <ComponentReference {...props} />
      </div>
    );
    const renderedNodes = render(element);

    const htmlString = renderedNodes.html();
    return html.prettyPrint(htmlString, {
      indent_size: 2,
      unformatted: [], // Expand all tags, including spans
    });
  } catch (e) {
    return '';
  }
}
