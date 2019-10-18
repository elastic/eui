import { CSSProperties } from 'react';

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
    console.warn(
      'Two `width` properties were provided. Provide only one of `style.width` or `width` to avoid conflicts.'
    );
  }
  return { ...styleRest, width: attrWidth || styleWidth };
};
