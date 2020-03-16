import React from 'react';
import { shallow } from 'enzyme';
import { EuiCopy } from './copy';

describe('EuiCopy', () => {
  test('is rendered', () => {
    const component = shallow(
      <EuiCopy textToCopy="some text">
        {copy => <button onClick={copy}>Click to copy input text</button>}
      </EuiCopy>
    );
    expect(component).toMatchSnapshot();
  });

  test('beforeMessage', () => {
    const component = shallow(
      <EuiCopy textToCopy="some text" beforeMessage="copy this">
        {copy => <button onClick={copy}>Click to copy input text</button>}
      </EuiCopy>
    );
    expect(component.state('tooltipText')).toBe('copy this');
  });
});
