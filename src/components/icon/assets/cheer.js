import React from 'react';

const EuiIconCheer = ({ title, titleId, ...props }) => (
  <svg
    width={74}
    height={73}
    viewBox="0 0 74 73"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M21.855 13.116a2 2 0 01.777.504l35.783 37.514a3 3 0 01-1.313 4.945L3.858 71.971a3 3 0 01-3.684-3.88L19.3 14.33a2 2 0 012.554-1.215zm.099 5.449L4.502 67.342 55 52.624 21.954 18.565z" />
    <path d="M22.015 37.26a2 2 0 012.828 0l19.092 19.093-2.829 2.828L22.015 40.09a2 2 0 010-2.828zM15.015 51.261a2 2 0 012.828 0l9.9 9.9-2.829 2.828-9.9-9.9a2 2 0 010-2.828zM51 5h4v4h-4zM66 3h4v4h-4zM66 22h4v4h-4zM58.584 14.558l2.728 2.926-13.896 12.958-2.728-2.926zM42.37.889l3.759 1.368-6.499 17.854-3.759-1.368zM72.936 30.66l.968 3.881-18.436 4.597-.968-3.881z" />
  </svg>
);

export const icon = EuiIconCheer;
