import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiFilePicker } from './file_picker';

describe('EuiFilePicker', () => {
  test('is rendered', () => {
    const component = render(<EuiFilePicker {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
