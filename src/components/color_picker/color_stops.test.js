import React from 'react';
import { shallow } from 'enzyme';

import { EuiColorStops } from './color_stops';

const onChange = () => {};

test('renders color stop form rows', () => {
  const component = shallow(
    <EuiColorStops
      onChange={onChange}
      colorStops={[
        { stop: 0, color: '#FF0000' },
        { stop: 25, color: '#00FF00' },
      ]}
    />
  );
  expect(component).toMatchSnapshot();
});

test('does not render delete button when only a single row remains', () => {
  const component = shallow(
    <EuiColorStops
      onChange={onChange}
      colorStops={[{ stop: 0, color: '#FF0000' }]}
    />
  );
  expect(component).toMatchSnapshot();
});

test('renders error messages when rows contain invalid content', () => {
  const component = shallow(
    <EuiColorStops
      onChange={onChange}
      colorStops={[{ stop: 10, color: '' }, { stop: 0, color: '#00FF00' }]}
    />
  );
  expect(component).toMatchSnapshot();
});
