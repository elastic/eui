import React from 'react';

const EuiIconBolt = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M7.04 13.274a.5.5 0 10.892.453l3.014-5.931a.5.5 0 00-.445-.727H5.316L8.03 1.727a.5.5 0 10-.892-.453L4.055 7.343a.5.5 0 00.446.726h5.185L7.04 13.274z" />
  </svg>
);

export const icon = EuiIconBolt;
