import * as React from 'react';

const EuiIconLogoMemcached = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <defs>
      <radialGradient
        id="logo_memcached-c"
        cx="41.406%"
        cy="42.708%"
        r="0%"
        fx="41.406%"
        fy="42.708%">
        <stop offset="0%" stopColor="#DB7C7C" />
        <stop offset="100%" stopColor="#C83737" />
      </radialGradient>
      <radialGradient
        id="logo_memcached-d"
        cx="44.271%"
        cy="42.708%"
        r="0%"
        fx="44.271%"
        fy="42.708%">
        <stop offset="0%" stopColor="#DB7C7C" />
        <stop offset="100%" stopColor="#C83737" />
      </radialGradient>
      <linearGradient id="logo_memcached-a" x1="50%" x2="50%" y1="100%" y2="0%">
        <stop offset="0%" stopColor="#574C4A" />
        <stop offset="100%" stopColor="#80716D" />
      </linearGradient>
      <linearGradient
        id="logo_memcached-b"
        x1="88.778%"
        x2="30.149%"
        y1="98.342%"
        y2="-8.68%">
        <stop offset="0%" stopColor="#268D83" />
        <stop offset="100%" stopColor="#2EA19E" />
      </linearGradient>
    </defs>
    <g fill="none">
      <path
        fill="url(#logo_memcached-a)"
        d="M0 21.567V10.352C0 1.294 1.293 0 10.342 0h11.236c9.049 0 10.341 1.294 10.341 10.352v11.215c0 9.059-1.292 10.352-10.341 10.352H10.342C1.292 31.92 0 30.626 0 21.567z"
      />
      <path
        fill="url(#logo_memcached-b)"
        d="M6.889 6.016C5.32 15.96 6.14 25.27 6.14 25.27h4.904c-.466-2.483-2.14-13.824-.748-13.861.746.118 4.156 9.621 4.156 9.621s.751-.093 1.507-.093c.755 0 1.506.093 1.506.093s3.41-9.503 4.157-9.621c1.392.037-.282 11.378-.748 13.86h4.904s.82-9.31-.748-19.253h-4.54c-.865.01-4.153 5.777-4.531 5.777-.378 0-3.666-5.767-4.53-5.777H6.889z"
      />
      <path
        fill="url(#logo_memcached-c)"
        d="M14.993 24.109a1.16 1.16 0 11-2.322 0 1.16 1.16 0 012.322 0z"
      />
      <path
        fill="url(#logo_memcached-d)"
        d="M19.249 24.109a1.16 1.16 0 11-2.322 0 1.16 1.16 0 012.322 0z"
      />
      <path
        fill="#000"
        d="M24.8 6.345c.707 4.79.873 9.388.86 12.813-.013 3.503-.214 5.78-.214 5.78h-4.128l-.443.332h4.904s.82-9.31-.748-19.254l-.232.329zm-12.996-.121c1.288 1.433 3.516 5.237 3.823 5.237-.817-1.045-2.823-4.378-3.823-5.237zm-1.84 4.852c-1.392.038.282 11.379.749 13.861H6.43l-.29.333h4.904c-.464-2.47-2.123-13.71-.769-13.861-.126-.19-.235-.32-.311-.333zm11.326 0c-.746.119-4.156 9.622-4.156 9.622s-.751-.094-1.507-.094c-.447 0-.832.028-1.092.052l-.082.374s.751-.093 1.507-.093c.755 0 1.506.093 1.506.093s3.385-9.44 4.146-9.621c-.082-.208-.183-.33-.322-.333z"
        opacity={0.1}
      />
      <path
        fill="#FFF"
        d="M6.889 6.016C5.32 15.96 6.14 25.27 6.14 25.27l.289-.325c-.148-2.197-.543-10.14.791-18.597h4.541c.096.002.225.08.374.208-.297-.33-.544-.538-.706-.54H6.889zm13.601 0c-.864.01-4.152 5.777-4.53 5.777.154.197.279.333.332.333.378 0 3.666-5.767 4.53-5.777h4.008l.2-.333h-4.54zm-9.881 5.725c1.103 1.657 3.844 9.29 3.844 9.29l.08-.373c-.676-1.856-3.256-8.814-3.903-8.917h-.021zm11.346 0c.74 1.887-.66 11.295-1.08 13.529l.444-.348c.568-3.331 1.936-13.146.636-13.18z"
        opacity={0.3}
      />
    </g>
  </svg>
);

export const icon = EuiIconLogoMemcached;
