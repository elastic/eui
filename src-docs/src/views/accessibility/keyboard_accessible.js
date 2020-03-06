import React from 'react';

import { EuiKeyboardAccessible } from '../../../../src/components';
import { EuiText } from '../../../../src/components/text';

// For custom components, we just need to make sure they delegate props to their rendered root
// element, e.g. onClick, tabIndex, and role.
const CustomComponent = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

export default () => (
  <div>
    <EuiText>
      <EuiKeyboardAccessible>
        <div onClick={() => window.alert('Div clicked')}>Click this div</div>
      </EuiKeyboardAccessible>

      <EuiKeyboardAccessible>
        <a
          className="euiLink"
          onClick={() => window.alert('Anchor tag clicked')}>
          Click this anchor tag
        </a>
      </EuiKeyboardAccessible>

      <EuiKeyboardAccessible>
        <CustomComponent
          onClick={() => window.alert('Custom component clicked')}>
          Click this custom component
        </CustomComponent>
      </EuiKeyboardAccessible>

      <EuiKeyboardAccessible>
        <div
          onClick={() => window.alert('Outer EuiKeyboardAccessible clicked')}>
          This EuiKeyboardAccessible contains another
          EuiKeyboardAccessible&nbsp;
          <EuiKeyboardAccessible>
            <a
              className="euiLink"
              onClick={() =>
                window.alert('Inner EuiKeyboardAccessible clicked')
              }>
              Clicking this inner one should call both onClick handlers
            </a>
          </EuiKeyboardAccessible>
        </div>
      </EuiKeyboardAccessible>
    </EuiText>
  </div>
);
