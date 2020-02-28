import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiFilePicker } from './file_picker';

// Mock the htmlIdGenerator to generate predictable ids for snapshot tests
jest.mock('../../../services/accessibility/html_id_generator', () => ({
  htmlIdGenerator: () => () => 'htmlId',
}));

describe('EuiFilePicker', () => {
  test('is rendered', () => {
    const component = render(<EuiFilePicker {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
