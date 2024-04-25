import React from 'react';

import { EuiMarkdownFormat } from '../../../../src';

// eslint-disable-next-line no-restricted-globals
const locationPathname = location.pathname;

export const markdownContent = `**Links starting with http:, https:, mailto:, and / are valid:**

* https://elastic.com
* http://elastic.com
* https link to [elastic.co](https://elastic.co)
* http link to [elastic.co](http://elastic.co)
* relative link to [eui doc's homepage](${locationPathname})
* someone@elastic.co
* [email me!](mailto:someone@elastic.co)

**Other link protocols are kept as their markdown source:**
* ftp://elastic.co
* An [ftp link](ftp://elastic.co)
`;

export default () => {
  return <EuiMarkdownFormat>{markdownContent}</EuiMarkdownFormat>;
};
