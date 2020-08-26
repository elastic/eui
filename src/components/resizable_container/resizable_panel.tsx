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
  useRef,
  useState,
  FunctionComponent,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { useEuiResizablePanelContext } from './context';
import { htmlIdGenerator } from '../../services';
import { EuiButtonIcon } from '../button';
import { IconType } from '../icon';
import { EuiI18n } from '../i18n';

interface ToggleOptions {
  notCollapsedIcon: IconType;
  collapsedIcon: IconType;
  className?: string;
}

interface EuiResizablePanelControls {
  isHorizontal: boolean;
}

export interface EuiResizablePanelProps
  extends HTMLAttributes<HTMLDivElement>,
    CommonProps,
    Partial<EuiResizablePanelControls> {
  /**
   * Specify minimum panel size in pixels or percents,
   * for example "300px" or "30%"
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
   * Use this to add a toggle button to a `EuiResizablePanel`. If true, default button icons are used
   */
  toggle?: boolean | ToggleOptions;
  /*
   * Set a `EuiResizablePanel` to expand when an accompanying `EuiResizablePanel` has toggling set to true
   */
  willExpand?: boolean;
}

const generatePanelId = htmlIdGenerator('resizable-panel');

const toggleDefault: ToggleOptions = {
  collapsedIcon: 'menuRight',
  notCollapsedIcon: 'menuLeft',
};

export const EuiResizablePanel: FunctionComponent<EuiResizablePanelProps> = ({
  children,
  className,
  id,
  isHorizontal,
  size,
  initialSize,
  minSize = '0px',
  scrollable = true,
  style = {},
  toggle = false,
  willExpand = false,
  ...rest
}) => {
  const [innerSize, setInnerSize] = useState(
    initialSize && !size ? initialSize : 0
  );
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { registry } = useEuiResizablePanelContext();
  const divRef = useRef<HTMLDivElement>(null);
  const panelId = useRef(id || generatePanelId());

  const classes = classNames(
    {
      euiResizablePanel: scrollable,
    },
    {
      'euiResizablePanel--collapsible': isCollapsed,
    },
    {
      'euiResizablePanel--willExpand': willExpand,
    },
    className
  );

  let dimensions;

  if (size) {
    dimensions = {
      width: isHorizontal ? `${size}%` : '100%',
      height: isHorizontal ? '100%' : `${size}%`,
    };
  } else {
    dimensions = {
      width: isHorizontal ? `${innerSize}%` : '100%',
      height: isHorizontal ? '100%' : `${innerSize}%`,
    };
  }

  const styles = {
    ...style,
    ...dimensions,
    minWidth: isHorizontal ? minSize : 0,
    minHeight: isHorizontal ? 0 : minSize,
  };

  useEffect(() => {
    const id = panelId.current;
    registry &&
      registry.registerPanel({
        id,
        setSize(panelSize) {
          if (initialSize && !size) {
            setInnerSize(panelSize);
          }
        },
        getSizePx() {
          return isHorizontal
            ? divRef.current!.getBoundingClientRect().width
            : divRef.current!.getBoundingClientRect().height;
        },
        minSize,
      });
    return () => {
      registry && registry.deregisterPanel(id);
    };
  }, [initialSize, isHorizontal, minSize, registry, size]);

  const onClickCollapse = () => {
    setIsCollapsed(value => !value);
  };

  // Use the default object if they simply passed `true` for toggling
  const toggeObject =
    typeof toggle === 'object'
      ? { ...toggleDefault, ...toggle }
      : toggleDefault;

  return (
    <div
      className={classes}
      id={panelId.current}
      ref={divRef}
      style={styles}
      {...rest}>
      {isHorizontal && toggle ? (
        <EuiI18n
          token="euiResizablePanel.toggleButtonAriaLabel"
          default="Press to toggle this panel">
          {(toggleButtonAriaLabel: string) => (
            <EuiButtonIcon
              color="text"
              className={toggeObject.className}
              aria-label={toggleButtonAriaLabel}
              iconType={
                isCollapsed
                  ? toggeObject.collapsedIcon
                  : toggeObject.notCollapsedIcon
              }
              onClick={onClickCollapse}
            />
          )}
        </EuiI18n>
      ) : null}
      {children}
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
