import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

const htmlCode = `<!--I'm an example of HTML -->
<div>
  <h1>My First Heading</h1>
  <p>My first paragraph.</p>
</div>`;

const jsCode = `import React from 'react';

const MyComponent = () => (
  <div className="myComponent">
    <h1>Hello world!</h1>
  </div>
);
`;

const sqlCode = `CREATE TABLE "topic" (
  "id" serial NOT NULL PRIMARY KEY,
  "forum_id" integer NOT NULL,
  "subject" varchar(255) NOT NULL
);
ALTER TABLE "topic"
ADD CONSTRAINT forum_id FOREIGN KEY ("forum_id")
REFERENCES "forum" ("id");

-- Initials
insert into "topic" ("forum_id", "subject")
values (2, 'D''artagnian');`;

export default () => (
  <div>
    <EuiCodeBlock language="html">{htmlCode}</EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock
      language="jsx"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable>
      {jsCode}
    </EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock
      language="sql"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable>
      {sqlCode}
    </EuiCodeBlock>
  </div>
);
