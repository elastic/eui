/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
import { EuiButtonIcon } from '../button';
import { EuiPanel, EuiPanelProps } from '../panel';
import { panelPaddingValues } from '../panel/panel';
import { useEuiI18n } from '../i18n';
import {
  EuiResizablePanelController,
  ActionToggleOptions,
  PanelModeType,
  PanelPosition,
} from './types';

interface ToggleOptions {
  'data-test-subj'?: string;
  className?: string;
}

type ModeOptions = PanelModeType | [PanelModeType, Partial<ToggleOptions>];

export const getModeType = (mode?: ModeOptions) =>
  typeof mode === 'object' ? mode[0] : mode;
export const getToggleOptions = (mode?: ModeOptions) =>
  typeof mode === 'object' ? mode[1] : null;

export interface EuiResizablePanelControls {
  isHorizontal: boolean;
  registration: {
    register: (panel: EuiResizablePanelController) => void;
    deregister: (panelId: EuiResizablePanelController['id']) => void;
  };
  onToggleCollapsed: (
    panelId: EuiResizablePanelController['id'],
    options: ActionToggleOptions
  ) => void;
}

export interface EuiResizablePanelProps
  extends HTMLAttributes<HTMLDivElement>,
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

  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;

  /**
   * Custom CSS properties
   */
  style?: CSSProperties;
  /*
   * For use with collapsible panels.
   * Specify either `'collapsible'` or `'main'`.
   * `'collapsible'` also accepts an array where
   * the second item is attributes for the toggle button:
   * `['collapsible', {'data-test-subj'?: string, className?: string;}]
   */
  mode?: ModeOptions;
  /**
   * Update the panel using EuiPanel options like `paddingSize` and `color`
   */
  panelProps?: EuiPanelProps;
  collapsedContent?: ReactNode;
}

const COLLAPSED_ICON = 'menuRight';
const NOT_COLLAPSED_ICON = 'menuLeft';

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
  panelProps,
  collapsedContent,
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
    if (position === 'middle' && isCollapsible) {
      const ids = Object.keys(panels);
      const index = ids.indexOf(panelId.current);
      const prevPanelMode = panels[ids[index - 1]]
        ? getModeType(panels[ids[index - 1]].mode)
        : null;
      const nextPanelMode = panels[ids[index + 1]]
        ? getModeType(panels[ids[index + 1]].mode)
        : null;
      // Intentional, preferential order
      if (prevPanelMode === 'main') {
        direction = 'right';
      } else if (nextPanelMode === 'main') {
        direction = 'left';
      } else if (prevPanelMode && prevPanelMode !== 'collapsible') {
        direction = 'right';
      } else if (nextPanelMode && nextPanelMode !== 'collapsible') {
        direction = 'left';
      }
    }
    return direction;
  }, [isCollapsible, position, panels]);

  const padding = useMemo(() => {
    const paddingSize = panelProps?.paddingSize ? panelProps.paddingSize : 'm'; // default from EuiPanel is `'m'`
    return `${panelPaddingValues[paddingSize] * 2}px`;
  }, [panelProps]);

  const classes = classNames(
    {
      euiResizablePanel: scrollable,
    },
    {
      'euiResizablePanel--collapsible': isCollapsible,
      'euiResizablePanel--collapsed': isCollapsed,
    },
    `euiResizablePanel--${position}`,
    className
  );

  const panelClasses = classNames(
    'euiResizablePanel__content',
    panelProps && panelProps.className
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
    onToggleCollapsed && onToggleCollapsed(panelId.current, options);
  };

  const collapseLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickCollapse({ direction: 'left' });
    if (e.detail) e.currentTarget.blur();
  };

  const collapseRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickCollapse({ direction: 'right' });
    e.currentTarget.blur();
    if (e.detail) e.currentTarget.blur();
  };

  const toggleButtonClasses = classNames(
    'euiResizablePanel__toggleButton',
    toggleOpts && toggleOpts.className
  );

  const toggleButtonAriaLabel = useEuiI18n(
    'euiResizablePanel.toggleButtonAriaLabel',
    'Press to toggle this panel'
  );

  const hasLeftToggle =
    isCollapsible &&
    (position === 'last' || (position === 'middle' && direction === 'right'));

  const hasRightToggle =
    isCollapsible &&
    (position === 'first' || (position === 'middle' && direction === 'left'));

  return (
    <div
      className={classes}
      id={panelId.current}
      ref={divRef}
      style={styles}
      {...rest}>
      {hasLeftToggle ? (
        <EuiButtonIcon
          {...toggleOpts}
          color="text"
          className={classNames(
            toggleButtonClasses,
            'euiResizablePanel__toggleButton--left',
            {
              'euiResizablePanel__toggleButton--visible':
                resizers[resizerIds.current[0]].isFocused ||
                resizers[resizerIds.current[0]].isDisabled,
              'euiResizablePanel__toggleButton--disabled':
                resizers[resizerIds.current[0]].isDisabled,
            }
          )}
          aria-label={toggleButtonAriaLabel}
          iconType={isCollapsed ? NOT_COLLAPSED_ICON : COLLAPSED_ICON}
          onClick={collapseRight}
        />
      ) : null}
      <EuiPanel
        hasShadow={false}
        borderRadius="none"
        color="transparent"
        {...panelProps}
        className={panelClasses}>
        {children}
      </EuiPanel>
      {isCollapsed && (
        <EuiPanel
          hasShadow={false}
          borderRadius="none"
          color="transparent"
          className="euiResizablePanel__collapsedContent"
          paddingSize={panelProps?.paddingSize}>
          {collapsedContent}
        </EuiPanel>
      )}
      {hasRightToggle ? (
        <EuiButtonIcon
          {...toggleOpts}
          color="text"
          className={classNames(
            toggleButtonClasses,
            'euiResizablePanel__toggleButton--right',
            {
              'euiResizablePanel__toggleButton--visible':
                resizers[resizerIds.current[1]].isFocused ||
                resizers[resizerIds.current[1]].isDisabled,
              'euiResizablePanel__toggleButton--disabled':
                resizers[resizerIds.current[1]].isDisabled,
            }
          )}
          aria-label={toggleButtonAriaLabel}
          iconType={isCollapsed ? COLLAPSED_ICON : NOT_COLLAPSED_ICON}
          onClick={collapseLeft}
        />
      ) : null}
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
