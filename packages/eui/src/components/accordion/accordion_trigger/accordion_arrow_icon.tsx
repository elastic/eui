/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { SVGProps } from 'react';

/**
 * 5×6 triangle from the motion study. Points right, so a 90° turn aims it down.
 * POC: these pixel sizes are the study glyph, not theme size tokens.
 */
export const EuiAccordionArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={5}
    height={6}
    viewBox="0 0 5 6"
    {...props}
  >
    <path d="M0.790274 5.9233C0.439968 6.13988 0 5.87205 0 5.44212V0.557893C0 0.127959 0.439968 -0.139906 0.790274 0.0767213L4.7393 2.51882C5.08695 2.73378 5.08695 3.26621 4.7393 3.48116L0.790274 5.9233Z" />
  </svg>
);
