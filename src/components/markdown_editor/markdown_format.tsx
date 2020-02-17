import React from 'react';
import remark from 'remark';
import remarkParse from 'remark-parse';
// @ts-ignore
import remarkToReact from 'remark-react';
// @ts-ignore
import remarkSlug from 'remark-slug';

export const EuiMarkdownFormat = (props: any) => {
  const { children } = props;

  return (
    <div className="euiMarkdownFormat">
      {
        remark()
          .use(remarkParse)
          .use(remarkSlug)
          .use(remarkToReact)
          .processSync(children).contents
      }
    </div>
  );
};
