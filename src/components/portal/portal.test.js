import React from 'react';
import { render } from 'enzyme';
import ReactDOM from 'react-dom';
import { EuiPortal } from './portal';

// TODO: Temporary hack which we can remove once react-test-renderer supports portals.
// More info at https://github.com/facebook/react/issues/11565.
ReactDOM.createPortal = node => node;

describe('EuiPortal', () => {
  test('is rendered', () => {
    const component = render(
      <div>
        <EuiPortal>
          Content
        </EuiPortal>
      </div>
    );

    expect(component)
      .toMatchSnapshot();
  });
});
