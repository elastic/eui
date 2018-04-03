import React from 'react';

import {
  EuiCode,
  EuiLink
} from '../../../../src/components';

export function unquote(string) {
  if (typeof string !== "string") {
    return;
  }
  const count = string.length - 1;
  const pair = string.charAt(0) + string.charAt(count);
  return (pair === '""' || pair === "''") ? string.slice(1, count) : string;
}

export function markup(text) {
  const regex = /(#[a-zA-Z]+)|(`[^`]+`)/g;
  return text.split(regex).map((token, index) => {
    if (!token) {
      return '';
    }
    if (token.startsWith('#')) {
      const id = token.substring(1);
      const onClick = () => {
        document.getElementById(id).scrollIntoView();
      };
      return <EuiLink key={`markup-${index}`} onClick={onClick}>{id}</EuiLink>;
    }
    if (token.startsWith('`')) {
      const code = token.substring(1, token.length - 1);
      return <EuiCode key={`markup-${index}`}>{code}</EuiCode>;
    }
    return token;

  });
}

export function humanizeType(type) {
  if (!type) {
    return '';
  }

  let humanizedType;

  switch (type.name) {
    case 'enum':
      if (Array.isArray(type.value)) {
        humanizedType = type.value.map(({ value }) => value).join(', ');
        break;
      }
      humanizedType = type.value;
      break;

    case 'union':
      if (Array.isArray(type.value)) {
        const unionValues = type.value.map(({ name }) => name);
        unionValues[unionValues.length - 1] = `or ${unionValues[unionValues.length - 1]}`;

        if (unionValues.length > 2) {
          humanizedType = unionValues.join(', ');
        } else {
          humanizedType = unionValues.join(' ');
        }
        break;
      }
      humanizedType = type.value;
      break;

    default:
      humanizedType = type.name;
  }

  return humanizedType;
}
