/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const EuiIconLogoRabbitmq = ({
  title,
  titleId,
  ...props
}: React.SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#F60"
      d="M30.083 13.197h-9.878c-.79-.088-1.391-.74-1.391-1.508V1.97c0-.83-.718-1.495-1.595-1.495h-3.456c-.885 0-1.595.672-1.595 1.495v9.82c-.043.74-.696 1.338-1.478 1.406H8.102c-.76-.088-1.348-.686-1.398-1.406V1.97c0-.83-.718-1.495-1.595-1.495H1.652C.768.476.058 1.148.058 1.97v28.358c0 .83.717 1.495 1.594 1.495h28.439c.884 0 1.594-.673 1.594-1.495V14.692c-.007-.829-.718-1.495-1.602-1.495zm-4.55 10.724c0 .829-.718 1.495-1.595 1.495H20.48c-.884 0-1.595-.673-1.595-1.495v-3.058c0-.83.718-1.495 1.595-1.495h3.457c.884 0 1.594.672 1.594 1.495v3.058z"
    />
  </svg>
);

export const icon = EuiIconLogoRabbitmq;
