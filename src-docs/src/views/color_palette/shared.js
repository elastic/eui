import React from 'react';
import classNames from 'classnames';

import {
  EuiFlexItem,
  EuiCopy,
  EuiCode,
  EuiLink,
} from '../../../../src/components';

export const ColorPaletteFlexItem = ({ hexCode, className, ...rest }) => {
  return (
    <EuiFlexItem
      key={hexCode}
      grow={false}
      className={classNames('guideColorPalette__swatch', className)}
      {...rest}
    >
      <span title={hexCode} style={{ backgroundColor: hexCode }} />
    </EuiFlexItem>
  );
};

export const ColorPaletteCopyCode = ({ textToCopy, code }) => {
  return (
    <span>
      <EuiCopy
        beforeMessage="Click to copy palette config"
        textToCopy={textToCopy || code}
      >
        {(copy) => (
          <EuiLink onClick={copy}>
            <EuiCode>{code}</EuiCode>
          </EuiLink>
        )}
      </EuiCopy>
    </span>
  );
};
