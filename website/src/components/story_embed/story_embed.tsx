import { HTMLAttributes, useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { stringifyArgsObject } from './stringify_args_object';
import styles from './story_embed.module.css';

export interface StoryEmbedProps<TArgs extends object = Record<string, any>>
  extends HTMLAttributes<HTMLDivElement> {
  storyId: string;
  view: 'story' | 'docs';
  args: TArgs;
  height?: number;
  expandedHeight?: number;
}

export const DEFAULT_HEIGHT = 250;
export const DEFAULT_EXPANDED_HEIGHT = DEFAULT_HEIGHT * 2;

export const StoryEmbed = <TArgs extends object = Record<string, any>>({
  storyId,
  args,
  view = 'story',
  height = DEFAULT_HEIGHT,
  expandedHeight = DEFAULT_EXPANDED_HEIGHT,
  ...rest
}: StoryEmbedProps<TArgs>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { siteConfig } = useDocusaurusContext();
  const { storybookBaseUrl } = siteConfig.customFields;

  const fullUrl = useMemo(() => {
    const params = new URLSearchParams({
      full: '1',
      shortcuts: 'false',
      singleStory: 'true',
    });

    let path: string;
    if (view === 'docs') {
      path = 'index.html';
      params.set('path', `/docs/${storyId}`);
    } else {
      path = 'iframe.html';
      params.set('id', storyId);
    }

    const argsString = stringifyArgsObject(args);
    if (argsString) {
      params.set('args', argsString);
    }

    return `${storybookBaseUrl}/${path}?${params.toString()}`;
  }, [storyId, args, view]);

  return (
    <div>
      {/* TODO: Display custom skeleton when loading the iframe to hide storybook loading state */}
      <iframe
        className={styles['story-embed__iframe']}
        width="100%"
        height={isExpanded ? expandedHeight : height}
        allowFullScreen
        loading="lazy"
        {...rest}
        src={fullUrl}
      />
      {/* TODO: Update with production-quality implementation when designs are ready */}
      <button
        className={styles['story-embed__expand-button']}
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
    </div>
  );
};
