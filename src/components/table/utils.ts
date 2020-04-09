import { CSSProperties } from 'react';

export const WARNING_MESSAGE =
  'Two `width` properties were provided. Provide only one of `style.width` or `width` to avoid conflicts.';

export const resolveWidthAsStyle = (
  style: CSSProperties = {},
  width?: string | number
) => {
  const { width: styleWidth, ...styleRest } = style;
  let attrWidth = width;
  if (
    attrWidth != null &&
    (typeof attrWidth === 'number' || !isNaN(Number(attrWidth))) // transform {number} or unitless 'number' to px string
  ) {
    attrWidth = `${attrWidth}px`;
  }
  if (styleWidth && attrWidth) {
    console.warn(WARNING_MESSAGE);
  }
  return { ...styleRest, width: attrWidth || styleWidth };
};
