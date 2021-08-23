/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  FunctionComponent,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { useEuiResizableContainerContext } from './context';
import { htmlIdGenerator } from '../../services';
import { EuiPanel } from '../panel';
import {
  PanelPaddingSize,
  panelPaddingValues,
  _EuiPanelProps,
} from '../panel/panel';
import { useEuiI18n } from '../i18n';
import {
  EuiResizablePanelController,
  ActionToggleOptions,
  PanelModeType,
  PanelPosition,
} from './types';
import { EuiResizableCollapseButton } from './resizable_collapse_button';

export interface ToggleOptions {
  'data-test-subj'?: string;
  className?: string;
  /**
   * Position of the toggle button.
   * Enums based on the `direction` of the EuiResizableContainer
   */
  position?: 'top' | 'middle' | 'bottom' | 'left' | 'right';
}

export type ModeOptions =
  | PanelModeType
  | [PanelModeType, Partial<ToggleOptions>];

export type ToggleCollapseCallback = (
  panelId: EuiResizablePanelController['id'],
  options: ActionToggleOptions
) => void;

const defaultToggleOptions = {
  className: null,
  'data-test-subj': undefined,
  position: 'middle',
};

export const getModeType = (mode?: ModeOptions) =>
  typeof mode === 'object' ? mode[0] : mode;
export const getToggleOptions = (mode?: ModeOptions) =>
  typeof mode === 'object'
    ? { ...defaultToggleOptions, ...mode[1] }
    : defaultToggleOptions;

export interface EuiResizablePanelControls {
  isHorizontal: boolean;
  registration: {
    register: (panel: EuiResizablePanelController) => void;
    deregister: (panelId: EuiResizablePanelController['id']) => void;
  };
  /**
   * #ToggleCollapseCallback
   */
  onToggleCollapsed?: ToggleCollapseCallback;
  onToggleCollapsedInternal: ToggleCollapseCallback;
}

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiResizablePanel--paddingSmall',
  m: 'euiResizablePanel--paddingMedium',
  l: 'euiResizablePanel--paddingLarge',
};
export interface EuiResizablePanelProps
  extends _EuiPanelProps,
    CommonProps,
    Partial<EuiResizablePanelControls> {
  /**
   * Specify a desired minimum panel size in pixels or percents,
   * for example "300px" or "30%"
   * The actual minimum size will be calculated,
   * using the larger of this prop and the panelProps.paddingSize
   */
  minSize?: string;
  /**
   * Specify id of panel if you want to track panel size in "onPanelWidthChange" callback
   */
  id?: string;
  /**
   * Initial size of the panel in percents
   * Specify this prop if you don't need to handle the panel size from outside
   */
  initialSize?: number;
  /**
   * Size of the panel in percents.
   * Specify this prop if you want to control the size from outside, the panel will ignore the "initialSize"
   */
  size?: number;
  /**
   * Add Eui scroll and overflow for the panel
   */
  scrollable?: boolean;
  /*
   * For use with collapsible panels.
   * Specify either `'collapsible'`, `'main'`, or `'custom'`.
   * `'collapsible'` also accepts an array where
   * the second item is attributes for the toggle button:
   * `['collapsible', {'data-test-subj'?: string, className?: string;}]
   */
  mode?: ModeOptions;

  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * Custom CSS properties applied to the wrapping `.euiResizablePanel` div
   */
  style?: CSSProperties;
  /**
   * Props to add to the wrapping `.euiResizablePanel` div
   */
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * Padding to add directly to the wrapping `.euiResizablePanel` div
   * Gives space around the actual panel.
   */
  wrapperPadding?: PanelPaddingSize;
}

const getPosition = (ref: HTMLDivElement) => {
  let position: PanelPosition = 'middle';
  if (ref.matches(':first-of-type')) {
    position = 'first';
  } else if (ref.matches(':last-of-type')) {
    position = 'last';
  }
  return position;
};

const generatePanelId = htmlIdGenerator('resizable-panel');

export const EuiResizablePanel: FunctionComponent<EuiResizablePanelProps> = ({
  children,
  className,
  id,
  isHorizontal,
  size,
  initialSize,
  minSize = '0px', // Actual minSize is calculated in `./helpers.ts`
  scrollable = true,
  style = {},
  mode,
  registration,
  onToggleCollapsed,
  onToggleCollapsedInternal,
  wrapperProps,
  hasShadow = false,
  borderRadius = 'none',
  color = 'transparent',
  paddingSize = 'm',
  wrapperPadding = 'none',
  ...rest
}) => {
  const {
    registry: { panels, resizers } = {
      panels: {},
      resizers: {},
    },
  } = useEuiResizableContainerContext();
  const divRef = useRef<HTMLDivElement>(null);
  const panelId = useRef(id || generatePanelId());
  const resizerIds = useRef<string[]>([]);
  const modeType = useMemo(() => getModeType(mode), [mode]);
  const toggleOpts = useMemo(() => getToggleOptions(mode), [mode]);
  const innerSize = useMemo(
    () =>
      (panels[panelId.current] && panels[panelId.current].size) ??
      (initialSize || 0),
    [panels, initialSize]
  );
  const isCollapsed = useMemo(
    () =>
      (panels[panelId.current] && panels[panelId.current].isCollapsed) || false,
    [panels]
  );
  const position = useMemo(
    () =>
      (panels[panelId.current] && panels[panelId.current].position) || 'middle',
    [panels]
  );
  const isCollapsible = useMemo(() => modeType === 'collapsible', [modeType]);
  const direction = useMemo(() => {
    let direction = null;
    if (position === 'middle' && (isCollapsible || isCollapsed)) {
      const ids = Object.keys(panels);
      const index = ids.indexOf(panelId.current);
      const prevPanel = panels[ids[index - 1]];
      const nextPanel = panels[ids[index + 1]];
      const prevPanelMode = prevPanel ? getModeType(prevPanel.mode) : null;
      const nextPanelMode = nextPanel ? getModeType(nextPanel.mode) : null;
      // Intentional, preferential order
      if (prevPanelMode === 'main') {
        direction = 'right';
      } else if (nextPanelMode === 'main') {
        direction = 'left';
      } else if (prevPanelMode && prevPanelMode !== 'collapsible') {
        direction = 'right';
      } else if (nextPanelMode && nextPanelMode !== 'collapsible') {
        direction = 'left';
      } else if (prevPanel && nextPanel) {
        direction = prevPanel.size > nextPanel.size ? 'right' : 'left';
      } else if (prevPanel) {
        direction = 'right';
      } else if (nextPanel) {
        direction = 'left';
      }
    }
    return direction;
  }, [isCollapsed, isCollapsible, position, panels]);

  const padding = useMemo(() => {
    return `${panelPaddingValues[paddingSize] * 2}px`;
  }, [paddingSize]);

  const classes = classNames(
    'euiResizablePanel',
    paddingSizeToClassNameMap[wrapperPadding],
    {
      'euiResizablePanel--collapsible': isCollapsible,
      'euiResizablePanel-isCollapsed': isCollapsed,
    },
    `euiResizablePanel--${position}`,
    wrapperProps && wrapperProps.className
  );

  const panelClasses = classNames(
    'euiResizablePanel__content',
    {
      'euiResizablePanel__content--scrollable': scrollable,
    },
    className
  );

  let dimensions;

  if (size) {
    dimensions = {
      width: isHorizontal ? `${size}%` : '100%',
      height: isHorizontal ? 'auto' : `${size}%`,
    };
  } else {
    dimensions = {
      width: isHorizontal ? `${innerSize}%` : '100%',
      height: isHorizontal ? 'auto' : `${innerSize}%`,
    };
  }

  const styles = {
    ...style,
    ...dimensions,
  };

  useEffect(() => {
    if (!registration) return;
    const id = panelId.current;
    const initSize = size ?? (initialSize || 0);
    resizerIds.current = [
      divRef.current!.previousElementSibling
        ? divRef.current!.previousElementSibling.id
        : '',
      divRef.current!.nextElementSibling
        ? divRef.current!.nextElementSibling!.id
        : '',
    ];
    registration.register({
      id,
      size: initSize,
      prevSize: initSize,
      getSizePx() {
        return isHorizontal
          ? divRef.current!.getBoundingClientRect().width
          : divRef.current!.getBoundingClientRect().height;
      },
      minSize: [minSize, padding],
      mode: modeType,
      isCollapsed: false,
      position: getPosition(divRef.current!),
    });
    return () => {
      registration.deregister(id);
    };
  }, [
    initialSize,
    isHorizontal,
    minSize,
    size,
    registration,
    modeType,
    padding,
  ]);

  const onClickCollapse = (options: ActionToggleOptions) => {
    onToggleCollapsedInternal &&
      onToggleCollapsedInternal(panelId.current, options);
    onToggleCollapsed && onToggleCollapsed(panelId.current, options);
  };

  const collapseRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickCollapse({ direction: 'right' });
    if (e.detail) e.currentTarget.blur();
  };

  const collapseLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickCollapse({ direction: 'left' });
    if (e.detail) e.currentTarget.blur();
  };

  const toggleButtonAriaLabel = useEuiI18n(
    'euiResizablePanel.toggleButtonAriaLabel',
    'Press to toggle this panel'
  );

  const hasLeftToggle =
    (isCollapsible || isCollapsed) &&
    (position === 'last' || (position === 'middle' && direction === 'right'));

  const hasRightToggle =
    (isCollapsible || isCollapsed) &&
    (position === 'first' || (position === 'middle' && direction === 'left'));

  const hasVisibleToggle =
    (modeType === 'custom' && isCollapsed) || isCollapsible;

  let theToggle;
  let theResizer;
  if ((isCollapsible || modeType === 'custom') && hasLeftToggle) {
    theResizer = resizers[resizerIds.current[0]];
    theToggle = (
      <EuiResizableCollapseButton
        externalPosition="before"
        direction={isHorizontal ? 'horizontal' : 'vertical'}
        isVisible={
          theResizer && (theResizer.isFocused || theResizer.isDisabled)
        }
        isCollapsed={theResizer && theResizer.isDisabled}
        internalPosition={toggleOpts.position as ToggleOptions['position']}
        data-test-subj={toggleOpts['data-test-subj']}
        aria-label={toggleButtonAriaLabel}
        onClick={collapseRight}
      />
    );
  } else if ((isCollapsible || modeType === 'custom') && hasRightToggle) {
    theResizer = resizers[resizerIds.current[1]];
    theToggle = (
      <EuiResizableCollapseButton
        externalPosition="after"
        direction={isHorizontal ? 'horizontal' : 'vertical'}
        isVisible={
          theResizer && (theResizer.isFocused || theResizer.isDisabled)
        }
        isCollapsed={theResizer && theResizer.isDisabled}
        internalPosition={toggleOpts.position as ToggleOptions['position']}
        data-test-subj={toggleOpts['data-test-subj']}
        aria-label={toggleButtonAriaLabel}
        onClick={collapseLeft}
      />
    );
  }

  return (
    <div
      {...wrapperProps}
      id={panelId.current}
      ref={divRef}
      style={styles}
      className={classes}
    >
      {/* The toggle is displayed on either side for tab order */}
      {hasVisibleToggle && hasLeftToggle && theToggle}
      <EuiPanel
        className={panelClasses}
        hasShadow={hasShadow}
        borderRadius={borderRadius}
        color={color}
        paddingSize={isCollapsed ? 'none' : paddingSize}
        {...rest}
      >
        {children}
      </EuiPanel>
      {/* The toggle is displayed on either side for tab order */}
      {hasVisibleToggle && hasRightToggle && theToggle}
    </div>
  );
};

export function euiResizablePanelWithControls(
  controls: EuiResizablePanelControls
) {
  return (props: EuiResizablePanelProps) => (
    <EuiResizablePanel {...controls} {...props} />
  );
}
