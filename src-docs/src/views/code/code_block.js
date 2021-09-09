import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

const htmlCode = "<!--I'm an example of HTML -->";

const jsCode = "import React from 'react'";

const sqlCode = `CREATE TABLE "topic" (
  "id" serial NOT NULL PRIMARY KEY,
  "forum_id" integer NOT NULL,
  "subject" varchar(255) NOT NULL
);
ALTER TABLE "topic"
ADD CONSTRAINT forum_id FOREIGN KEY ("forum_id_f71c3a6d-a16f-4214-b8f6-b2d1ae10bd19-785f32d5-06fb-4c79-9133-ea8c71944ef7-f71c3a6d-a16f-4214-b8f6-b2d1ae10bd19-785f32d5-06fb-4c79-9133-ea8c71944ef7")
REFERENCES "forum" ("id");

-- Initials
insert into "topic" ("forum_id_f71c3a6d-a16f-4214-b8f6-b2d1ae10bd19-785f32d5-06fb-4c79-9133-ea8c71944ef7-f71c3a6d-a16f-4214-b8f6-b2d1ae10bd19-785f32d5-06fb-4c79-9133-ea8c71944ef7", "subject")
values (2, 'D''artagnian');

insert into "something" ("forum_id_f71c3a6d-a16f-4214-b8f6-b2d1ae10bd19-785f32d5-06fb-4c79-9133-ea8c71944ef7-f71c3a6d-a16f-4214-b8f6-b2d1ae10bd19-785f32d5-06fb-4c79-9133-ea8c71944ef7", "subject")
values (2, 'D''artagnian');
`;

export default () => (
  <div>
    <EuiCodeBlock language="html" isCopyable paddingSize="s">
      {htmlCode}
    </EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock
      language="jsx"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable
      lineNumbers
    >
      {jsCode}
    </EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock
      language="sql"
      fontSize="m"
      paddingSize="m"
      overflowHeight={300}
      isCopyable
      lineNumbers
    >
      {sqlCode}
    </EuiCodeBlock>
  </div>
);
