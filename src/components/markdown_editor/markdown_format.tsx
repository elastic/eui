import React, { createElement, FunctionComponent } from 'react';
// @ts-ignore
import emoji from 'remark-emoji';
import unified from 'unified';
import markdown from 'remark-parse';
// @ts-ignore
import remark2rehype from 'remark-rehype';
// @ts-ignore
import highlight from 'remark-highlight.js';
// @ts-ignore
import rehype2react from 'rehype-react';

import { EuiCodeBlock } from '../code/code_block';
import { EuiLink } from '../link/link';

const processor = unified()
  .use(markdown)
  .use(highlight)
  .use(emoji, { emoticon: true })
  .use(remark2rehype, { allowDangerousHTML: true })
  // .use(row)
  .use(rehype2react, {
    createElement: createElement,
    components: {
      a: EuiLink,
      code: (props: any) =>
        // if has classNames is a codeBlock using highlight js
        props.className ? (
          <EuiCodeBlock {...props} />
        ) : (
          <code className="euiMarkdownFormat__code" {...props} />
        ),
    },
  });

interface EuiMarkdownFormatProps {
  children: string;
}

export const EuiMarkdownFormat: FunctionComponent<EuiMarkdownFormatProps> = ({
  children,
}) => (
  <div className="euiMarkdownFormat">
    {processor.processSync(children).contents}
  </div>
);
