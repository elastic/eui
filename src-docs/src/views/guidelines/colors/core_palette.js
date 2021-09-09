import React from 'react';
import { useSassVars } from '../_get_sass_vars';

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiCopy,
  EuiScreenReaderOnly,
  EuiPanel,
} from '../../../../../src/components';
import { rgbToHex } from '../../../../../src/services';

export function scrollToSelector(selector, attempts = 5) {
  const element = document.querySelector(selector);

  if (element) {
    window.scrollTo({ top: element.offsetTop - 168, behavior: 'smooth' }); // Offset affords for the sticky contrast slider
  } else if (attempts > 0) {
    setTimeout(scrollToSelector.bind(null, selector, attempts - 1), 250);
  }
}

export const CorePalette = ({ colors }) => {
  const palette = useSassVars();

  function renderPaletteColor(palette, color, index) {
    const hex = palette[color];
    const iconClass =
      color === 'euiColorLightestShade' || color === 'euiColorEmptyShade'
        ? 'colorGuidelines_colorPreviewTooLight'
        : undefined;

    return (
      <EuiFlexItem key={index} grow={false}>
        <EuiCopy
          title={`$${color}:
          ${rgbToHex(hex.rgba).toUpperCase()}`}
          beforeMessage={
            <small>
              <kbd>Click</kbd> to copy color name
              <br />
              <kbd>Shift + Click</kbd> to scroll to section
            </small>
          }
          afterMessage={<small>Color name copied!</small>}
          textToCopy={color}
        >
          {(copy) => (
            <button
              className="eui-isFocusable"
              onClick={(e) => {
                e.shiftKey ? scrollToSelector(`#${color}`) : copy();
              }}
            >
              <EuiIcon
                className={iconClass}
                size="xxl"
                type="stopFilled"
                color={rgbToHex(hex.rgba)}
              />
              <EuiScreenReaderOnly>
                <span>{color}</span>
              </EuiScreenReaderOnly>
            </button>
          )}
        </EuiCopy>
      </EuiFlexItem>
    );
  }

  return (
    <EuiPanel paddingSize="l" color="subdued">
      <EuiFlexGroup gutterSize="s" wrap responsive={false}>
        {colors.map(function (color, index) {
          return renderPaletteColor(palette, color, index);
        })}
      </EuiFlexGroup>
    </EuiPanel>
  );
};
