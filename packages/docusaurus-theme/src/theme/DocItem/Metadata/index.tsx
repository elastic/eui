import React from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';

export default function DocItemMetadata(): JSX.Element {
  const {metadata, frontMatter, assets} = useDoc();
  return (
    <PageMetadata
      title={metadata.title}
      description={metadata.description}
      keywords={frontMatter.keywords}
      image={assets.image ?? frontMatter.image}
    />
  );
}
