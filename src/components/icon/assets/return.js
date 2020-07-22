import React from 'react';

const EuiIconReturn = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M12.994 2c1.059 0 1.924.818 2 1.856l.006.15v4.988a2.005 2.005 0 01-1.856 2L13 11H2.484l1.91 1.82a.52.52 0 010 .77.616.616 0 01-.829 0l-2.05-1.95a1.551 1.551 0 010-2.31l2.05-1.95a.617.617 0 01.83 0 .52.52 0 010 .77L2.45 10H13c.514-.003.935-.39.993-.888L14 8.994V4.006c0-.516-.388-.941-.888-1L12.994 3H10.5a.5.5 0 01-.09-.992L10.5 2h2.494z" />
  </svg>
);

export const icon = EuiIconReturn;
