/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { RenderWithEuiStylesMemoizer } from '../../../services';
import { CommonProps } from '../../common';
import { EuiIconProps, EuiIcon } from '../../icon';
import { EuiAvatarProps, EuiAvatar } from '../../avatar';
import { EuiHighlight } from '../../highlight';

import { EuiSelectableOption } from '../selectable_option';
import { euiSelectableTemplateSitewideStyles } from './selectable_template_sitewide.styles';

export interface EuiSelectableTemplateSitewideMetaData extends CommonProps {
  /**
   * Required to display the metadata
   */
  text: string;
  /**
   * Styles the metadata according to Elastic's schema.
   * Can be one of 'application', 'deployment', 'article', 'case', 'platform',
   * or a custom string to associate with your own schema.
   * Appends the string to the class name as `euiSelectableTemplateSitewide__optionMeta--[type]`
   */
  type?:
    | 'application'
    | 'deployment'
    | 'article'
    | 'case'
    | 'platform'
    | string;
  /**
   * Will wrap the meta tag in EuiHighlight to mark the portions that match the search text
   */
  highlightSearchString?: boolean;
}

/**
 * The generic extension allows consumers to keep their data objects
 * intact without needing to do key lookups when using `renderOption`
 */
export type EuiSelectableTemplateSitewideOption<T = { [key: string]: any }> = {
  /**
   * Displayed on the left (`prepend`).
   * Object of `EuiIconProps` for display of the solution/application's logo
   */
  icon?: EuiIconProps;
  /**
   * Displayed on the right (`append`).
   * Object of `EuiAvatarProps` for display of the space (default) or user
   */
  avatar?: EuiAvatarProps;
  /**
   * An array of inline {@link EuiSelectableTemplateSitewideMetaData} displayed beneath the label and separated by bullets.
   */
  meta?: EuiSelectableTemplateSitewideMetaData[];
} & EuiSelectableOption<T>;

export const euiSelectableTemplateSitewideFormatOptions = (
  options: EuiSelectableTemplateSitewideOption[],
  styles: ReturnType<typeof euiSelectableTemplateSitewideStyles>
): EuiSelectableTemplateSitewideOption[] => {
  return options.map((item: EuiSelectableTemplateSitewideOption) => {
    let title = item.label;
    if (item.meta && item.meta.length) {
      title += ` •${renderOptionMeta({
        meta: item.meta,
        stringsOnly: true,
        styles,
      })}`;
    }

    return {
      key: item.label,
      title,
      ...item,
      css: [styles.euiSelectableTemplateSitewide__listItem, item.css],
      className: classNames(
        'euiSelectableTemplateSitewide__listItem',
        item.className
      ),
      prepend: item.icon ? (
        <EuiIcon color="subdued" size="l" {...item.icon} />
      ) : (
        item.prepend
      ),
      append: item.avatar ? (
        <EuiAvatar type="space" size="s" {...item.avatar} />
      ) : (
        item.append
      ),
    };
  });
};

export const euiSelectableTemplateSitewideRenderOptions = (
  option: EuiSelectableTemplateSitewideOption,
  searchValue: string
) => {
  return (
    <>
      <EuiHighlight
        className="euiSelectableTemplateSitewide__listItemTitle"
        search={searchValue}
      >
        {option.label}
      </EuiHighlight>
      <RenderWithEuiStylesMemoizer>
        {(stylesMemoizer) => {
          const styles = stylesMemoizer(euiSelectableTemplateSitewideStyles);
          return renderOptionMeta({
            meta: option.meta,
            styles,
            searchValue,
          }) as React.ReactElement;
        }}
      </RenderWithEuiStylesMemoizer>
    </>
  );
};

const renderOptionMeta = ({
  meta,
  styles,
  searchValue = '',
  stringsOnly = false,
}: {
  meta?: EuiSelectableTemplateSitewideMetaData[];
  styles: ReturnType<typeof euiSelectableTemplateSitewideStyles>;
  searchValue?: string;
  stringsOnly?: boolean;
}) => {
  if (!meta || meta.length < 1) return;
  const metas: ReactNode = meta.map(
    (meta: EuiSelectableTemplateSitewideMetaData) => {
      const { text, highlightSearchString, className, ...rest } = meta;
      if (stringsOnly) {
        return ` ${text}`;
      }

      // Start with the base and custom classes
      let metaClasses = classNames(
        'euiSelectableTemplateSitewide__optionMeta',
        className
      );

      // If they provided a type, create the class and append
      if (meta.type) {
        metaClasses = classNames(
          [`euiSelectableTemplateSitewide__optionMeta--${meta.type}`],
          metaClasses
        );
      }

      const hasMetaTypeStyles = (
        metaType: string
      ): metaType is keyof typeof styles.metaTypes =>
        metaType in styles.metaTypes;

      const cssStyles = [
        styles.euiSelectableTemplateSitewide__optionMeta,
        ...(meta.type && hasMetaTypeStyles(meta.type)
          ? [styles.metaTypes.fontWeight, styles.metaTypes[meta.type]]
          : []),
      ];

      return (
        <EuiHighlight
          search={highlightSearchString ? searchValue : ''}
          css={cssStyles}
          className={metaClasses}
          key={text}
          {...rest}
        >
          {text}
        </EuiHighlight>
      );
    }
  );

  return stringsOnly ? (
    metas
  ) : (
    <span
      css={styles.euiSelectableTemplateSitewide__optionMetasList}
      className="euiSelectableTemplateSitewide__optionMetasList"
    >
      {metas}
    </span>
  );
};
