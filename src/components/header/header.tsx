import React, { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { EuiHeaderSectionItem, EuiHeaderSection } from './header_section';
import { EuiHeaderSectionItemProps } from './header_section/header_section_item';

export interface EuiHeaderSectionsProp {
  left?: EuiHeaderSectionItemProps[];
  center?: EuiHeaderSectionItemProps[];
  right?: EuiHeaderSectionItemProps[];
}

function createHeaderSection(sections: EuiHeaderSectionItemProps[]) {
  return sections.map((section, index) => {
    return <EuiHeaderSectionItem key={index} {...section} />;
  });
}

export type EuiHeaderProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Takes an object with `left`, `right`, and `center` as arrays of #EuiHeaderSectionItem props.
     * Wraps the each key's contents in a #EuiHeaderSection and positions it according to the key's name.
     * This prop disregards the prop `children` if both are passed.
     */
    sections?: EuiHeaderSectionsProp;
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

    contents = [
      sections.left && (
        <EuiHeaderSection key="left" grow={sections.center ? false : undefined}>
          {createHeaderSection(sections.left)}
        </EuiHeaderSection>
      ),
      sections.center && (
        <EuiHeaderSection key="center" grow={false}>
          {createHeaderSection(sections.center)}
        </EuiHeaderSection>
      ),
      sections.right && (
        <EuiHeaderSection key="right" side="right">
          {createHeaderSection(sections.right)}
        </EuiHeaderSection>
      ),
    ];
  } else {
    contents = children;
  }

  return (
    <div className={classes} {...rest}>
      {contents}
    </div>
  );
};
