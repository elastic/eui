import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiMarkdownEditor } from './markdown_editor';

describe('EuiMarkdownEditor', () => {
  test('is rendered', () => {
    const component = render(
      <EuiMarkdownEditor editorId="editorId" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
