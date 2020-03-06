import React, { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import {
  EuiHeaderSectionItem,
  EuiHeaderSectionItemProps,
  EuiHeaderSection,
} from './header_section';
import { EuiHeaderBreadcrumbs } from './header_breadcrumbs';
import { Breadcrumb, EuiBreadcrumbsProps } from '../breadcrumbs';

type EuiHeaderSectionItemType = EuiHeaderSectionItemProps['children'];
type EuiHeaderSectionBorderType = EuiHeaderSectionItemProps['border'];

export interface EuiHeaderSections {
  /**
   * An arry of items that will be wrapped in a #EuiHeaderSectionItem
   */
  items?: EuiHeaderSectionItemType[];
  /**
   * Apply the passed border side to each #EuiHeaderSectionItem
   */
  borders?: EuiHeaderSectionBorderType;
  /**
   * Breadcrumbs in the header cannot be wrapped in a #EuiHeaderSection in order for truncation to work.
   * Simply pass the array of Breadcrumb objects
   */
  breadcrumbs?: Breadcrumb[];
  /**
   * Other props to pass to #EuiHeaderBreadcrumbs
   */
  breadcrumbProps?: Omit<EuiBreadcrumbsProps, 'breadcrumbs'>;
}

function createHeaderSection(
  sections: EuiHeaderSectionItemType[],
  border?: EuiHeaderSectionBorderType
) {
  return sections.map((section, index) => {
    return (
      <EuiHeaderSectionItem key={index} border={border}>
        {section}
      </EuiHeaderSectionItem>
    );
  });
}

export type EuiHeaderProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An array of objects to wrap in a #EuiHeaderSection.
     * Each section is spaced using `space-between`.
     * See #EuiHeaderSectionsProp for object details.
     * This prop disregards the prop `children` if both are passed.
     */
    sections?: EuiHeaderSections[];
    /**
     * Helper that positions the header against the window body and
     * adds the correct amount of top padding to the window when in `fixed` mode
     */
    position?: 'static' | 'fixed';
  };

export const EuiHeader: FunctionComponent<EuiHeaderProps> = ({
  children,
  className,
  sections,
  position = 'static',
  ...rest
}) => {
  const classes = classNames('euiHeader', `euiHeader--${position}`, className);

  useEffect(() => {
    if (position === 'fixed') {
      document.body.classList.add('euiBody--headerIsFixed');
    }
    return () => {
      document.body.classList.remove('euiBody--headerIsFixed');
    };
  }, [position]);

  let contents;
  if (sections) {
    if (children) {
      // In case both children and sections are passed, warn in the console that the children will be disregarded
      console.warn(
        'EuiHeader cannot accept both `children` and `sections`. It will disregard the `children`.'
      );
    }

    contents = sections.map((section, index) => {
      const content = [];
      if (section.items) {
        // Items get wrapped in EuiHeaderSection and each item in a EuiHeaderSectionItem
        content.push(
          <EuiHeaderSection key={`items-${index}`}>
            {createHeaderSection(section.items, section.borders)}
          </EuiHeaderSection>
        );
      }
      if (section.breadcrumbs) {
        content.push(
          // Breadcrumbs are separate and cannot be contained in a EuiHeaderSection
          // in order for truncation to work
          <EuiHeaderBreadcrumbs
            key={`breadcrumbs-${index}`}
            breadcrumbs={section.breadcrumbs}
            {...section.breadcrumbProps}
          />
        );
      }
      return content;
    });
  } else {
    contents = children;
  }

  return (
    <div className={classes} {...rest}>
      {contents}
    </div>
  );
};
