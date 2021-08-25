import * as React from 'react';

const EuiIconDocumentation = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M9 3.5a.5.5 0 11-1 0 .5.5 0 011 0zM9 5v3h1v1H8V6H7V5h2z" />
    <path d="M13.855 14.147a1.34 1.34 0 01-.158-.246A1.998 1.998 0 0113.5 13c0-.414.103-.713.197-.901a1.34 1.34 0 01.158-.246l.003-.005A.5.5 0 0014 11.5V.5a.5.5 0 00-.5-.5H3.461l-.083.005a2.957 2.957 0 00-1.102.298 2.257 2.257 0 00-.88.763C1.148 1.44 1 1.913 1 2.5V13c0 .463.117.843.318 1.145.2.298.462.491.708.615a2.344 2.344 0 00.94.24H3v-1c-.005 0-.015 0-.029-.002a1.344 1.344 0 01-.498-.133.817.817 0 01-.323-.275C2.07 13.47 2 13.287 2 13s.07-.47.15-.59a.817.817 0 01.324-.275A1.344 1.344 0 013 12h9.658c-.091.27-.158.605-.158 1s.067.73.158 1H8v1h5.5a.5.5 0 00.359-.848l-.004-.005zm-.001 0l.002.002-.002-.002zM2.724 1.197c.092-.046.186-.082.276-.11C3 2.918 3.001 11 2.999 11h-.033a1.977 1.977 0 00-.283.03 2.344 2.344 0 00-.657.21L2 11.254V2.5c0-.413.102-.689.229-.879.128-.193.304-.328.495-.424zM4 11V1h9v10H4z" />
    <path d="M7 13H4v2.5a.5.5 0 00.854.354l.646-.647.646.647A.5.5 0 007 15.5V13z" />
  </svg>
);

export const icon = EuiIconDocumentation;
