import React from 'react';

const EuiIconBeaker = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5.277 10.088c.02.014.04.03.057.047.582.55 1.134.812 1.666.812.586 0 1.84-.293 3.713-.88L9 6.212V2H7v4.212l-1.723 3.876zm-.438.987L3.539 14h8.922l-1.32-2.969C9.096 11.677 7.733 12 7 12c-.74 0-1.463-.315-2.161-.925zM6 2H5V1h6v1h-1v4l3.375 7.594A1 1 0 0112.461 15H3.54a1 1 0 01-.914-1.406L6 6V2z" />
  </svg>
);

export const icon = EuiIconBeaker;
