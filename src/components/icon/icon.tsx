/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  PureComponent,
  ImgHTMLAttributes,
  ComponentType,
  SVGAttributes,
  CSSProperties,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import { typeToPathMap } from './icon_map';
import { icon as empty } from './assets/empty';
import { enqueueStateChange } from '../../services/react';

import {
  htmlIdGenerator,
  withEuiTheme,
  WithEuiThemeProps,
} from '../../services';
export { COLORS } from './named_colors';
import { isNamedColor, NamedColor } from './named_colors';
import { euiIconStyles } from './icon.styles';

const getIsAppIcon = (iconType: IconType) => {
  if (typeof iconType !== 'string') return false;
  if (iconType === 'dataVisualizer') return true; // Special case
  if (iconType.indexOf('data:') === 0) return false; // Inline data URIs should be short-circuited for performance
  return iconType.endsWith('App') || iconType.endsWith('Job');
};

export const TYPES = keysOf(typeToPathMap);

export type EuiIconType = keyof typeof typeToPathMap;

export type IconType = EuiIconType | string | ComponentType;

// We accept arbitrary color strings, which are impossible to type.
export type IconColor = string | NamedColor;

export const SIZES = ['original', 's', 'm', 'l', 'xl', 'xxl'] as const;
export type IconSize = (typeof SIZES)[number];

export type EuiIconProps = CommonProps &
  Omit<SVGAttributes<SVGElement>, 'type' | 'color' | 'size'> & {
    /**
     * `Enum` is any of the named icons listed in the docs, `string` is usually a URL to an SVG file, and `elementType` is any React SVG component
     */
    type: IconType;
    /**
     * One of EUI's color palette or a valid CSS color value https://developer.mozilla.org/en-US/docs/Web/CSS/color_value.
     * Note that coloring only works if your SVG is removed of fill attributes.
     */
    color?: IconColor;
    /**
     * Note that every size other than `original` assumes the provided SVG sits on a square viewbox.
     */
    size?: IconSize;
    /**
     * Descriptive title for naming the icon based on its use
     */
    title?: string;
    /**
     * A unique identifier for the title element
     */
    titleId?: string;
    /**
     * Its value should be one or more element IDs
     */
    'aria-labelledby'?: string;
    /**
     * Callback when the icon has been loaded & rendered
     */
    onIconLoad?: () => void;
  };

interface State {
  icon: undefined | ComponentType | string;
  iconTitle: undefined | string;
  isLoading: boolean;
  neededLoading: boolean; // controls the fade-in animation, cached icons are immediately rendered
}

function isEuiIconType(x: EuiIconProps['type']): x is EuiIconType {
  return typeof x === 'string' && typeToPathMap.hasOwnProperty(x);
}

function getInitialIcon(icon: EuiIconProps['type']) {
  if (icon == null) {
    return undefined;
  }
  if (isEuiIconType(icon)) {
    if (iconComponentCache.hasOwnProperty(icon)) {
      return iconComponentCache[icon];
    }
    return undefined;
  }

  return icon;
}

const generateId = htmlIdGenerator();

let iconComponentCache: { [iconType: string]: ComponentType } = {};

export const clearIconComponentCache = (iconType?: EuiIconType) => {
  if (iconType != null) {
    delete iconComponentCache[iconType];
  } else {
    iconComponentCache = {};
  }
};

export const appendIconComponentCache = (iconTypeToIconComponentMap: {
  [iconType: string]: ComponentType;
}) => {
  for (const iconType in iconTypeToIconComponentMap) {
    if (iconTypeToIconComponentMap.hasOwnProperty(iconType)) {
      iconComponentCache[iconType] = iconTypeToIconComponentMap[iconType];
    }
  }
};

export class EuiIconClass extends PureComponent<
  EuiIconProps & WithEuiThemeProps,
  State
> {
  isMounted = false;
  constructor(props: EuiIconProps & WithEuiThemeProps) {
    super(props);

    const { type } = props;
    const initialIcon = getInitialIcon(type);

    this.state = {
      icon: initialIcon,
      iconTitle: undefined,
      isLoading: false,
      neededLoading: false,
    };
  }

  componentDidMount() {
    this.isMounted = true;
    const { type } = this.props;

    if (isEuiIconType(type) && this.state.icon == null) {
      this.setState({
        neededLoading: true,
        isLoading: true,
      });

      this.loadIconComponent(type);
    } else {
      this.onIconLoad();
    }
  }

  componentDidUpdate(prevProps: EuiIconProps) {
    const { type } = this.props;
    if (type !== prevProps.type) {
      if (isEuiIconType(type)) {
        this.setState({
          neededLoading: iconComponentCache.hasOwnProperty(type),
          isLoading: true,
        });
        this.loadIconComponent(type);
      } else {
        this.setState({
          icon: type,
          neededLoading: true,
          isLoading: false,
        });
      }
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  loadIconComponent = (iconType: EuiIconType) => {
    if (iconComponentCache.hasOwnProperty(iconType)) {
      // exists in cache
      this.setState({
        isLoading: false,
        neededLoading: false,
        icon: iconComponentCache[iconType],
      });
      this.onIconLoad();
      return;
    }

    import(
      /* webpackChunkName: "icon.[request]" */
      // It's important that we don't use a template string here, it
      // stops webpack from building a dynamic require context.
      // eslint-disable-next-line prefer-template
      './assets/' + typeToPathMap[iconType]
    ).then(({ icon }) => {
      iconComponentCache[iconType] = icon;
      enqueueStateChange(() => {
        if (this.isMounted && this.props.type === iconType) {
          this.setState(
            {
              icon,
              iconTitle: iconType,
              isLoading: false,
            },
            this.onIconLoad
          );
        }
      });
    });
  };

  onIconLoad = () => {
    const { onIconLoad } = this.props;
    if (onIconLoad) {
      onIconLoad();
    }
  };

  render() {
    const {
      type,
      size = 'm',
      color,
      className,
      tabIndex,
      title,
      onIconLoad,
      theme,
      style,
      ...rest
    } = this.props;

    const { isLoading, neededLoading, iconTitle } = this.state;
    const isLoaded = !isLoading && neededLoading;

    const isCustomColor = color && !isNamedColor(color);

    const optionalCustomStyles: CSSProperties | undefined = isCustomColor
      ? {
          color: color,
          ...style,
        }
      : style;

    // These icons are a little special and get some extra CSS flexibility
    const isAppIcon = getIsAppIcon(type);
    // App color styles are only applied if no color is passed or if color="default" is passed
    const appIconHasColor = color && color !== 'default';

    // The Elastic logo should be an outline in text and ghost mode
    const isElasticLogoOutline =
      type === 'logoElastic' && (color === 'ghost' || color === 'text');

    const classes = classNames('euiIcon', className);

    // Emotion styles
    const styles = euiIconStyles(theme);
    const cssStyles = [
      styles.euiIcon,
      styles[size],
      color && isNamedColor(color) && styles[color as NamedColor],
      isCustomColor && styles.customColor,
      isElasticLogoOutline && styles.logoElasticOutline,
      isAppIcon && !appIconHasColor && styles.app,
      isLoading && styles.isLoading,
      !isLoading && neededLoading && styles.isLoaded,
    ];

    const icon = this.state.icon || empty;

    if (typeof icon === 'string') {
      return (
        <img
          alt={title ? title : ''}
          src={icon}
          className={classes}
          css={cssStyles}
          style={style}
          tabIndex={tabIndex}
          {...(rest as ImgHTMLAttributes<HTMLImageElement>)}
        />
      );
    } else {
      const Svg = icon;

      // If it's an empty icon, or if there is no aria-label, aria-labelledby, or title it gets aria-hidden true
      const isAriaHidden =
        icon === empty ||
        !(
          this.props['aria-label'] ||
          this.props['aria-labelledby'] ||
          this.props.title
        );
      const hideIconEmpty = isAriaHidden && { 'aria-hidden': true };

      let titleId: any;

      // If no aria-label or aria-labelledby is provided but there's a title, a titleId is generated
      //  The svg aria-labelledby attribute gets this titleId
      //  The svg title element gets this titleId as an id
      if (
        !this.props['aria-label'] &&
        !this.props['aria-labelledby'] &&
        title
      ) {
        titleId = { titleId: generateId() };
      }

      return (
        <Svg
          className={classes}
          style={optionalCustomStyles}
          css={cssStyles}
          tabIndex={tabIndex}
          role="img"
          title={title}
          data-icon-type={iconTitle}
          data-is-loaded={isLoaded || undefined}
          data-is-loading={isLoading || undefined}
          {...titleId}
          {...rest}
          {...hideIconEmpty}
        />
      );
    }
  }
}

export const EuiIcon = withEuiTheme<EuiIconProps>(EuiIconClass);
