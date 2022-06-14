/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  useCallback,
  ImgHTMLAttributes,
  ComponentType,
  SVGAttributes,
  useState,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import { icon as empty } from './assets/empty';
import { enqueueStateChange } from '../../services/react';

import { htmlIdGenerator } from '../../services';
import { typeToPathMap } from './icons_map';
import { colorToClassMap, isNamedColor, NamedColor } from './named_colors';

const getIsAppIcon = (iconType: IconType) => {
  if (typeof iconType !== 'string') return false;
  if (iconType === 'dataVisualizer') return true; // Special case
  if (iconType.indexOf('data:') === 0) return false; // Inline data URIs should be short-circuited for performance
  return iconType.endsWith('App') || iconType.endsWith('Job');
};

export const TYPES = keysOf(typeToPathMap);

export type EuiIconType = keyof typeof typeToPathMap;

export type IconType = EuiIconType | string | ComponentType;

export const COLORS: NamedColor[] = keysOf(colorToClassMap);

// We accept arbitrary color strings, which are impossible to type.
export type IconColor = string | NamedColor;

const sizeToClassNameMap = {
  original: null,
  s: 'euiIcon--small',
  m: 'euiIcon--medium',
  l: 'euiIcon--large',
  xl: 'euiIcon--xLarge',
  xxl: 'euiIcon--xxLarge',
};

export const SIZES = ['s', 'm', 'l', 'xl', 'xl'] as const;
export type IconSize = typeof SIZES[number];

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

function isEuiIconType(x: EuiIconProps['type']): x is EuiIconType {
  return typeof x === 'string' && typeToPathMap.hasOwnProperty(x);
}

const getInitialIcon = (icon: EuiIconProps['type']) => {
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
};

const generateId = htmlIdGenerator();

let iconComponentCache: { [iconType: string]: ComponentType } = {};

export const clearIconComponentCache = (iconType?: EuiIconType) => {
  if (iconType != null) {
    delete iconComponentCache[iconType];
  } else {
    iconComponentCache = {};
  }
};

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const appendIconComponentCache = (iconTypeToIconComponentMap: {
  [iconType: string]: ComponentType;
}) => {
  for (const iconType in iconTypeToIconComponentMap) {
    if (iconTypeToIconComponentMap.hasOwnProperty(iconType)) {
      iconComponentCache[iconType] = iconTypeToIconComponentMap[iconType];
    }
  }
};

export function useIsMounted() {
  const isMountedRef = useRef(true);
  const isMounted = useCallback(() => isMountedRef.current, []);

  useEffect(() => {
    return () => void (isMountedRef.current = false);
  }, []);

  return isMounted;
}

export const EuiIcon: FunctionComponent<EuiIconProps> = ({
  type,
  size = 'm',
  color,
  className,
  tabIndex,
  title,
  onIconLoad,
  ...rest
}) => {
  const initialIcon = getInitialIcon(type);
  const [icon, setIsIcon] = useState<any>(initialIcon);
  const [iconTitle, setIsIconTitle] = useState<undefined | string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [neededLoading, setNeededLoading] = useState(false);
  const previousType = usePrevious(type);

  const isMounted = useIsMounted();

  const loadIconComponent = useCallback(
    (iconType: EuiIconType) => {
      if (iconComponentCache.hasOwnProperty(iconType)) {
        // exists in cache
        setIsLoading(false);
        setNeededLoading(false);
        setIsIcon(iconComponentCache[iconType]);
        onIconLoad?.();
        return;
      }

      import(
        /* webpackChunkName: "icon.[request]" */
        // It's important that we don't use a template string here, it
        // stops webpack from building a dynamic require context.
        // eslint-disable-next-line prefer-template
        './assets/' + typeToPathMap[iconType]
      ).then(({ icon }) => {
        if (isMounted() && type === iconType) {
          enqueueStateChange(() => {
            setIsIcon(icon);
            setIsIconTitle(iconType);
            setIsLoading(false);
            onIconLoad?.();
          });
        }
      });
    },
    [onIconLoad, isMounted, type]
  );

  useEffect(() => {
    if (isEuiIconType(type) && icon == null) {
      setNeededLoading(true);
      setIsLoading(true);
      loadIconComponent(type);
    } else {
      onIconLoad?.();
    }

    if (type !== previousType) {
      if (isEuiIconType(type)) {
        setNeededLoading(true);
        setIsLoading(true);
        loadIconComponent(type);
      } else {
        setIsIcon(type);
        setNeededLoading(true);
        setIsLoading(true);
      }
    }
  }, [
    icon,
    onIconLoad,
    type,
    previousType,
    isMounted,
    isLoading,
    neededLoading,
    loadIconComponent,
  ]);

  let optionalColorClass = null;
  let optionalCustomStyles: any = null;

  if (color) {
    if (isNamedColor(color)) {
      optionalColorClass = colorToClassMap[color];
    } else {
      optionalCustomStyles = { color: color };
      optionalColorClass = 'euiIcon--customColor';
    }
  }

  // These icons are a little special and get some extra CSS flexibility
  const isAppIcon = getIsAppIcon(type);

  const appIconHasColor = color && color !== 'default';

  // parent is not one of
  const classes = classNames(
    'euiIcon',
    sizeToClassNameMap[size],
    optionalColorClass,
    {
      // The app icon only gets the .euiIcon--app class if no color is passed or if color="default" is passed
      'euiIcon--app': isAppIcon && !appIconHasColor,
      'euiIcon-isLoading': isLoading,
      'euiIcon-isLoaded': !isLoading && neededLoading,
    },
    className
  );

  const currentIcon = icon || empty;

  // This is a fix for IE and Edge, which ignores tabindex="-1" on an SVG, but respects
  // focusable="false".
  //   - If there's no tabindex specified, we'll default the icon to not be focusable,
  //     which is how SVGs behave in Chrome, Safari, and FF.
  //   - If tabindex is -1, then the consumer wants the icon to be focusable by JavaScript only.
  //   - If the tabindex is 0, the consumer wants the icon to be keyboard focusable.
  const focusable = tabIndex == null || tabIndex === -1 ? 'false' : 'true';

  if (typeof currentIcon === 'string') {
    return (
      <img
        alt={title ? title : ''}
        src={currentIcon}
        className={classes}
        tabIndex={tabIndex}
        {...(rest as ImgHTMLAttributes<HTMLImageElement>)}
      />
    );
  } else {
    const Svg = currentIcon;

    // If it's an empty icon, or if there is no aria-label, aria-labelledby, or title it gets aria-hidden true
    const isAriaHidden =
      currentIcon === empty ||
      !(rest['aria-label'] || rest['aria-labelledby'] || title);
    const hideIconEmpty = isAriaHidden && { 'aria-hidden': true };

    let titleId: any;

    // If no aria-label or aria-labelledby is provided but there's a title, a titleId is generated
    //  The svg aria-labelledby attribute gets this titleId
    //  The svg title element gets this titleId as an id
    if (!rest['aria-label'] && !rest['aria-labelledby'] && title) {
      titleId = { titleId: generateId() };
    }

    return (
      <Svg
        className={classes}
        style={optionalCustomStyles}
        tabIndex={tabIndex}
        focusable={focusable}
        role="img"
        title={title}
        data-icon-type={iconTitle}
        {...titleId}
        {...rest}
        {...hideIconEmpty}
      />
    );
  }
};
