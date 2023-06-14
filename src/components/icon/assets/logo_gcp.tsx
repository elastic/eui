/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js

import * as React from 'react';
import type { SVGProps } from 'react';
import { htmlIdGenerator } from '../../../services';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const EuiIconLogoGcp = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => {
  const generateId = htmlIdGenerator('logo_gcp');
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <defs>
        <path id={generateId('a')} d="M.085.1h4.549v6.291H.085z" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#DB4437"
          fillRule="nonzero"
          d="M22.57 29.982h-5.749c.527 0 .987-.282 1.233-.7L25.857 16 20.93 7.61l5.748.001c.492 0 .97.251 1.232.7l3.698 6.291c.49.837.526 1.9 0 2.797l-6.572 11.185a2.853 2.853 0 0 1-2.464 1.398Zm-.71-2.796c0 .386.318.7.71.7a.705.705 0 0 0 .712-.7c0-.386-.318-.7-.711-.7a.705.705 0 0 0-.712.7Zm6.927-10.58c.34.193.775.078.971-.256a.692.692 0 0 0-.26-.955.718.718 0 0 0-.972.256.692.692 0 0 0 .26.955Z"
        />
        <path
          fill="#4285F4"
          fillRule="nonzero"
          d="m25.036 3.416 2.873 4.894a1.427 1.427 0 0 0-1.232-.699H11.071l-4.928 8.388-2.874-4.892a1.377 1.377 0 0 1 0-1.399l3.696-6.292a2.853 2.853 0 0 1 2.464-1.398h13.143c.982 0 1.937.502 2.464 1.398ZM10.14 4.814c0-.386-.318-.7-.71-.7a.705.705 0 0 0-.712.7c0 .386.318.7.711.7a.705.705 0 0 0 .711-.7Zm12.787.606a.692.692 0 0 0 .26-.955.718.718 0 0 0-.971-.256.692.692 0 0 0-.26.955.718.718 0 0 0 .971.256Z"
        />
        <path
          fill="#F4B400"
          fillRule="nonzero"
          d="m.394 14.601 2.875-4.893c-.263.449-.245.98 0 1.399L11.07 24.39h9.857l-2.874 4.892c-.246.418-.706.7-1.233.7H9.428a2.854 2.854 0 0 1-2.464-1.398L.394 17.398a2.754 2.754 0 0 1 0-2.797Zm2.82.793a.718.718 0 0 0-.972.256.693.693 0 0 0 .26.955c.34.193.775.078.971-.256a.692.692 0 0 0-.26-.955ZM9.072 26.58a.692.692 0 0 0-.26.955.718.718 0 0 0 .971.256.692.692 0 0 0 .26-.955.718.718 0 0 0-.971-.256Z"
        />
        <path
          fill="#000"
          d="m18.054 29.282 2.875-4.892H17.96l-1.138 5.591c.526 0 .986-.28 1.232-.699M26.678 7.611h-5.749l1.484 2.527L27.91 8.31a1.427 1.427 0 0 0-1.232-.7"
          opacity={0.1}
        />
        <g opacity={0.1} transform="translate(2.994 9.609)">
          <mask id={generateId('b')} fill="#fff">
            <use xlinkHref={`#${generateId('a')}`} />
          </mask>
          <path
            fill="#000"
            d="M.275 1.498 3.15 6.391l1.485-2.527L.275.1c-.263.448-.245.98 0 1.398"
            mask={`url(#${generateId('b')})`}
          />
        </g>
        <path
          fill="#CCC"
          fillRule="nonzero"
          d="M11.071 24.39 6.143 16l4.928-8.39h9.858L25.857 16l-4.928 8.39H11.07ZM20.268 16c0-2.317-1.91-4.194-4.268-4.194-2.357 0-4.268 1.877-4.268 4.194 0 2.316 1.91 4.194 4.268 4.194 2.357 0 4.268-1.878 4.268-4.194Z"
        />
      </g>
    </svg>
  );
};
export const icon = EuiIconLogoGcp;
