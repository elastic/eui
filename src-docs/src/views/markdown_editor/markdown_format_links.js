import React from 'react';

import { EuiMarkdownFormat } from '../../../../src';

// eslint-disable-next-line no-restricted-globals
const locationPathname = location.pathname;

export const markdownContent = `**Links starting with http:, https:, and / are valid:**

* https://elastic.com
* http://elastic.com
* https link to [elastic.co](https://elastic.co)
* http link to [elastic.co](http://elastic.co)
* relative link to [eui doc's homepage](${locationPathname})

**Other link protocols are kept as their markdown source:**
* ftp://elastic.co
* An [ftp link](ftp://elastic.co)

**mailto: renders with only the link copy**
* Send a note to [someone](mailto:someone@elastic.co)
* Also applies to inline email addresses like someone@elastic.co
`;

export default () => {
  return <EuiMarkdownFormat>{markdownContent}</EuiMarkdownFormat>;
};
