/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  HTMLAttributes,
  createContext,
  ContextType,
} from 'react';
import classNames from 'classnames';

import {
  withEuiTheme,
  WithEuiThemeProps,
  keys,
  htmlIdGenerator,
} from '../../services';
import { CommonProps } from '../common';
import { EuiI18n } from '../i18n';
import { EuiScreenReaderOnly } from '../accessibility';

import { EuiTreeViewItem } from './tree_view_item';
import { euiTreeViewStyles } from './tree_view.styles';

const EuiTreeViewContext = createContext<string>('');

function getTreeId(
  propId: string | undefined,
  contextId: string = '',
  idGenerator: Function
) {
  return propId ?? (contextId === '' ? idGenerator() : contextId);
}

export interface Node {
  /** An array of EuiTreeViewNodes to render as children
   */
  children?: Node[];
  /** The readable label for the item
   */
  label: React.ReactNode;
  /** A unique ID
   */
  id: string;
  /** An icon to use on the left of the label
   */
  icon?: React.ReactElement;
  /** Display a different icon when the item is expanded.
  For instance, an open folder or a down arrow
  */
  iconWhenExpanded?: React.ReactElement;
  /** Use an empty icon to keep items without an icon
  lined up with their siblings
  */
  useEmptyIcon?: boolean;
  /** Whether or not the item is expanded.
   */
  isExpanded?: boolean;
  /** Optional class to throw on the node
   */
  className?: string;
  /** Optional styles
   */
  css?: CommonProps['css'];
  /** Function to call when the item is clicked.
   The open state of the item will always be toggled.
   */
  callback?(): string;
}

export type EuiTreeViewDisplayOptions = 'default' | 'compressed';

interface EuiTreeViewState {
  openItems: string[];
  activeItem: string;
  treeID: string;
  expandChildNodes: boolean;
}

export type CommonTreeProps = CommonProps &
  HTMLAttributes<HTMLUListElement> & {
    /**
     * Never accepts children directly, only through the `items` prop
     */
    children?: never;
    /**
     * An array of EuiTreeViewNodes
     */
    items: Node[];
    /**
     * Optionally use a variation with smaller text and icon sizes
     * @default default
     */
    display?: EuiTreeViewDisplayOptions;
    /**
     * Set all items to open on initial load
     */
    expandByDefault?: boolean;
    /**
     * Display expansion arrows next to all items
     * that contain children
     */
    showExpansionArrows?: boolean;
  };

export type EuiTreeViewProps = Omit<
  CommonTreeProps,
  'aria-label' | 'aria-labelledby'
> &
  ({ 'aria-label': string } | { 'aria-labelledby': string });

export class EuiTreeViewClass extends Component<
  EuiTreeViewProps & WithEuiThemeProps,
  EuiTreeViewState
> {
  treeIdGenerator = htmlIdGenerator('euiTreeView');

  static contextType = EuiTreeViewContext;
  declare context: ContextType<typeof EuiTreeViewContext>;

  isNested: boolean;

  constructor(
    props: EuiTreeViewProps & WithEuiThemeProps,
    // Without the optional ? typing, TS will throw errors on JSX component errors
    // @see https://github.com/facebook/react/issues/13944#issuecomment-1183693239
    context?: ContextType<typeof EuiTreeViewContext>
  ) {
    // TODO: context in constructor has been deprecated.
    // We should likely convert this to a function component
    super(props, context);

    this.isNested = !!this.context;
    this.state = {
      openItems: this.props.expandByDefault
        ? this.props.items
            .map<string>(({ id, children }) =>
              children ? id : (null as unknown as string)
            )
            .filter((x) => x != null)
        : this.props.items
            .map<string>(({ id, children, isExpanded }) =>
              children && isExpanded ? id : (null as unknown as string)
            )
            .filter((x) => x != null),
      activeItem: '',
      treeID: getTreeId(this.props.id, context, this.treeIdGenerator),
      expandChildNodes: this.props.expandByDefault || false,
    };
  }

  componentDidUpdate(prevProps: EuiTreeViewProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        treeID: getTreeId(this.props.id, this.context, this.treeIdGenerator),
      });
    }
  }

  buttonRef: Array<HTMLButtonElement | undefined> = [];

  setButtonRef = (
    ref: HTMLButtonElement | HTMLAnchorElement | null,
    index: number
  ) => {
    this.buttonRef[index] = ref as HTMLButtonElement;
  };

  handleNodeClick = (node: Node, ignoreCallback: boolean = false) => {
    const index = this.state.openItems.indexOf(node.id);

    this.setState({
      expandChildNodes: false,
    });

    node.isExpanded = !node.isExpanded;

    if (!ignoreCallback && node.callback !== undefined) {
      node.callback();
    }

    if (this.isNodeOpen(node)) {
      // if the node is part of openItems[] then remove it
      this.setState({
        openItems: this.state.openItems.filter((_, i) => i !== index),
      });
    } else {
      // if the node isn't part of openItems[] then add it
      this.setState((prevState) => ({
        openItems: [...prevState.openItems, node.id],
        activeItem: node.id,
      }));
    }
  };

  // check if the node is included in openItems[]
  isNodeOpen = (node: Node) => {
    return this.state.openItems.includes(node.id);
  };

  // Enable keyboard navigation
  onKeyDown = (event: React.KeyboardEvent, node: Node) => {
    switch (event.key) {
      case keys.ARROW_DOWN: {
        const nodeButtons = Array.from(
          document.querySelectorAll(
            `[data-test-subj="euiTreeViewButton-${this.state.treeID}"]`
          )
        );
        const currentIndex = nodeButtons.indexOf(event.currentTarget);
        if (currentIndex > -1) {
          const nextButton = nodeButtons[currentIndex + 1] as HTMLElement;
          if (nextButton) {
            event.preventDefault();
            event.stopPropagation();
            nextButton.focus();
          }
        }
        break;
      }
      case keys.ARROW_UP: {
        const nodeButtons = Array.from(
          document.querySelectorAll(
            `[data-test-subj="euiTreeViewButton-${this.state.treeID}"]`
          )
        );
        const currentIndex = nodeButtons.indexOf(event.currentTarget);
        if (currentIndex > -1) {
          const prevButton = nodeButtons[currentIndex + -1] as HTMLElement;
          if (prevButton) {
            event.preventDefault();
            event.stopPropagation();
            prevButton.focus();
          }
        }
        break;
      }
      case keys.ARROW_RIGHT: {
        if (!this.isNodeOpen(node)) {
          event.preventDefault();
          event.stopPropagation();
          this.handleNodeClick(node, true);
        }
        break;
      }
      case keys.ARROW_LEFT: {
        if (this.isNodeOpen(node)) {
          event.preventDefault();
          event.stopPropagation();
          this.handleNodeClick(node, true);
        }
      }
      default:
        break;
    }
  };

  onChildrenKeydown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === keys.ARROW_LEFT) {
      event.preventDefault();
      event.stopPropagation();
      this.buttonRef[index]!.focus();
    }
  };

  render() {
    const {
      children,
      className,
      items,
      display = 'default',
      expandByDefault,
      showExpansionArrows,
      theme,
      ...rest
    } = this.props;

    const styles = euiTreeViewStyles(theme);
    const cssStyles = [styles.euiTreeView, styles[display]];

    // Computed classNames
    const classes = classNames('euiTreeView', className);

    const instructionsId = `${this.state.treeID}--instruction`;

    return (
      <EuiTreeViewContext.Provider value={this.state.treeID}>
        {!this.isNested && (
          <EuiI18n
            token="euiTreeView.listNavigationInstructions"
            default="You can quickly navigate this list using arrow keys."
          >
            {(listNavigationInstructions: string) => (
              <EuiScreenReaderOnly>
                <p id={instructionsId}>{listNavigationInstructions}</p>
              </EuiScreenReaderOnly>
            )}
          </EuiI18n>
        )}
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <ul
          css={cssStyles}
          className={classes}
          id={!this.isNested ? this.state.treeID : undefined}
          aria-describedby={!this.isNested ? instructionsId : undefined}
          role="list" // VoiceOver doesn't parse lists with `list-style: none` as the correct role - @see https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
          {...rest}
        >
          {items.map((node, index) => {
            const buttonId = node.id;
            const wrappingId = this.treeIdGenerator(buttonId);
            const isNodeExpanded = node.children
              ? this.isNodeOpen(node)
              : undefined; // Determines the `aria-expanded` attribute

            let icon = node.icon;
            if (node.iconWhenExpanded && isNodeExpanded) {
              icon = node.iconWhenExpanded;
            } else if (!icon && node.useEmptyIcon) {
              icon = <></>; // Renders a placeholder
            }

            return (
              <EuiTreeViewItem
                key={buttonId + index}
                id={buttonId}
                className={node.className}
                css={node.css}
                buttonRef={(ref) => this.setButtonRef(ref, index)}
                aria-controls={node.children ? wrappingId : undefined}
                label={node.label}
                icon={icon}
                hasArrow={showExpansionArrows}
                isExpanded={isNodeExpanded}
                isActive={this.state.activeItem === node.id}
                display={display}
                data-test-subj={`euiTreeViewButton-${this.state.treeID}`}
                onKeyDown={(event: React.KeyboardEvent) =>
                  this.onKeyDown(event, node)
                }
                onClick={() => this.handleNodeClick(node)}
              >
                {node.children && (
                  <div
                    id={wrappingId}
                    onKeyDown={(event: React.KeyboardEvent) =>
                      this.onChildrenKeydown(event, index)
                    }
                  >
                    {isNodeExpanded && (
                      <EuiTreeView
                        items={node.children}
                        display={display}
                        showExpansionArrows={showExpansionArrows}
                        expandByDefault={this.state.expandChildNodes}
                      />
                    )}
                  </div>
                )}
              </EuiTreeViewItem>
            );
          })}
        </ul>
      </EuiTreeViewContext.Provider>
    );
  }
}

export const EuiTreeView = Object.assign(
  withEuiTheme<EuiTreeViewProps>(EuiTreeViewClass),
  { Item: EuiTreeViewItem }
);
