import React from 'react';
import ReactDOM from 'react-dom';

import html from 'html';

const renderTarget = document.createElement('div');
export function renderToHtml(ComponentReference, props = {}) {
  // If there's a failure, just return an empty string. The actual component itself should
  // trip an error boundary in the UI when it fails.
  try {
    // Create the React element, render it and get its HTML, then format it prettily.
    // the .html() call below renders the contents of the first node, so wrap everything in a div
    const element = <ComponentReference {...props} />;

    return {
      render() {
        ReactDOM.render(element, renderTarget);
        const htmlString = renderTarget.innerHTML;
        const result = htmlString;
        ReactDOM.unmountComponentAtNode(renderTarget);

        return html.prettyPrint(result, {
          indent_size: 2,
          unformatted: [], // Expand all tags, including spans
        });
      },
    };
  } catch (e) {
    return '';
  }
}
