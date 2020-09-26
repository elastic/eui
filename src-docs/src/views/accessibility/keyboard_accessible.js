import React from 'react';

import { EuiKeyboardAccessible, EuiText } from '../../../../src/components';

// For custom components, we just need to make sure they delegate props to their rendered root
// element, e.g. onClick, tabIndex, and role.
const CustomComponent = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

export default () => (
  <div>
    <EuiText>
      <EuiKeyboardAccessible>
        <div onClick={() => {}}>Click this div</div>
      </EuiKeyboardAccessible>

      <EuiKeyboardAccessible>
        <a className="euiLink" onClick={() => {}}>
          Click this anchor tag
        </a>
      </EuiKeyboardAccessible>

      <EuiKeyboardAccessible>
        <CustomComponent onClick={() => {}}>
          Click this custom component
        </CustomComponent>
      </EuiKeyboardAccessible>

      <EuiKeyboardAccessible>
        <div onClick={() => {}}>
          This EuiKeyboardAccessible contains another
          EuiKeyboardAccessible&nbsp;
          <EuiKeyboardAccessible>
            <a className="euiLink" onClick={() => {}}>
              Clicking this inner one should call both onClick handlers
            </a>
          </EuiKeyboardAccessible>
        </div>
      </EuiKeyboardAccessible>
    </EuiText>
  </div>
);
