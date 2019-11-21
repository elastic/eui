import React from 'react';

const EuiIconCrossInACircleFilled = ({ title, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <title>{title}</title>
    <path d="M8.746 8l3.1-3.1a.527.527 0 10-.746-.746L8 7.254l-3.1-3.1a.527.527 0 10-.746.746l3.1 3.1-3.1 3.1a.527.527 0 10.746.746l3.1-3.1 3.1 3.1a.527.527 0 10.746-.746L8.746 8zM8 16A8 8 0 118 0a8 8 0 010 16z" />
  </svg>
);

export const icon = EuiIconCrossInACircleFilled;
