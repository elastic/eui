import * as React from 'react';

const EuiIconBug = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.651 5.126l.922-.455.884-2.343a.5.5 0 01.939.344L12.374 5.39l-1.45.717A5.3 5.3 0 0111 7h1.043l2.3 2.198a.5.5 0 01-.692.723L11.642 8h-.737c-.09.466-.24.899-.441 1.283l.892.49 1.278 3.554a.5.5 0 01-.94.342l-1.15-3.2-.655-.36C9.373 10.665 8.716 11 8 11s-1.374-.335-1.89-.893l-.658.361-1.15 3.201a.5.5 0 11-.94-.342l1.279-3.554.895-.491A4.7 4.7 0 015.095 8h-.74l-2.01 1.92a.5.5 0 01-.69-.722L3.952 7H5a5.3 5.3 0 01.075-.892L3.623 5.39 2.6 2.672a.5.5 0 11.939-.344l.884 2.343.924.457c.17-.428.397-.81.668-1.128h.57a1.5 1.5 0 112.83 0h.568c.27.318.497.699.667 1.126zM8 4a.5.5 0 100-1 .5.5 0 000 1zm1.751 1.571A3.326 3.326 0 009.476 5H6.524c-.107.175-.2.367-.276.573-.11.295-.186.618-.223.957a4.354 4.354 0 00.09 1.465c.071.294.172.565.295.806.168.328.38.601.616.803.295.253.631.396.974.396.342 0 .678-.142.973-.394.237-.203.448-.476.616-.803a3.62 3.62 0 00.296-.807 4.263 4.263 0 00.09-1.466 3.988 3.988 0 00-.224-.959z" />
  </svg>
);

export const icon = EuiIconBug;
