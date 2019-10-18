import { CSSProperties } from 'react';
export const resolveWidthAsStyle = (
  style: CSSProperties = {},
  width?: string
) => {
  const { width: styleWidth, ...styleRest } = style;
  // Use the more intentional `style.width` if it exists
  return { ...styleRest, width: styleWidth || width };
};
