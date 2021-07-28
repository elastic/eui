import React from 'react';
import { EuiLink, EuiText } from '../../../../src/components';

const urls = [
  'https://elastic.co',
  '//elastic.co',
  'relative/url/somewhere',
  'http://username:password@example.com/',
  // eslint-disable-next-line no-script-url
  'javascript:alert()',
];

export const LinkValidation = () => {
  return (
    <EuiText>
      {urls.map((url) => (
        <p key={url}>
          <EuiLink color="success" href={url}>
            {url}
          </EuiLink>
        </p>
      ))}
    </EuiText>
  );
};
