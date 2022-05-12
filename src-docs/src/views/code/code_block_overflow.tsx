import React from 'react';

import { EuiCodeBlock } from '../../../../src/components';

const sqlCode = `-- I'm an example of SQL
CREATE TABLE "topic" (
  "id" serial NOT NULL PRIMARY KEY,
  "forum_id" integer NOT NULL,
  "subject" varchar(255) NOT NULL
);
ALTER TABLE "topic"
ADD CONSTRAINT forum_id FOREIGN KEY ("forum_id")
REFERENCES "forum" ("id");

insert into "topic" ("forum_id", "subject")
values (2, 'D''artagnian');`;

export default () => (
  <EuiCodeBlock language="sql" overflowHeight={150}>
    {sqlCode}
  </EuiCodeBlock>
);
