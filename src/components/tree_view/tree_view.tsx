import React, { Component, HTMLAttributes, createContext } from 'react';
import classNames from 'classnames';
import { CommonProps, Omit } from '../common';
import { EuiI18n } from '../i18n';
import { EuiIcon } from '../icon';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiText } from '../text';
import { keyCodes, htmlIdGenerator } from '../../services';

const EuiTreeViewContext = createContext<string>('');
const treeIdGenerator = htmlIdGenerator('euiTreeView');

function hasAriaLabel(
  x: HTMLAttributes<HTMLUListElement>
): x is { 'aria-label': string } {
  return x.hasOwnProperty('aria-label');
}

export interface Node {
  /** An array of EuiTreeViewNodes to render as children
   */
  children?: Node[];
  /** The readable label for the item
   */
  label: string;
  /** A unique ID
   */
  id: string;
  /** An icon to use on the left of the label
   */
  icon?: React.ReactElement;
  /** Display a differnt icon when the item is expanded.
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
  /** Function to call when the item is clicked.
   The open state of the item will always be toggled.
   */
  callback?(): string;
}

interface EuiTreeViewState {
  openItems: string[];
  activeItem: string;
  treeID: string;
  expandChildNodes: boolean;
}

export type CommonTreeProps = CommonProps &
  HTMLAttributes<HTMLUListElement> & {
    /** An array of EuiTreeViewNodes
     */
    items: Node[];
    /** Optionally use a variation with smaller text and icon sizes
     */
    isCondensed?: boolean;
    /** Set all items to open on initial load
     */
    expandByDefault?: boolean;
    /** Display expansion arrows next to all itmes
     * that contain children
     */
    showExpansionArrows?: boolean;
  };

export type EuiTreeViewProps = Omit<
  CommonTreeProps,
  'aria-label' | 'aria-labelledby'
> &
  ({ 'aria-label': string } | { 'aria-labelledby': string });

export class EuiTreeView extends Component<EuiTreeViewProps, EuiTreeViewState> {
  static contextType = EuiTreeViewContext;
  isNested: boolean = !!this.context;
  state: EuiTreeViewState = {
    openItems: this.props.expandByDefault
      ? this.props.items
          .map<string>(({ id, children }) =>
            children ? id : ((null as unknown) as string)
          )
          .filter(x => x != null)
      : [],
    activeItem: '',
    treeID: this.context || treeIdGenerator(),
    expandChildNodes: this.props.expandByDefault || false,
  };

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
      this.setState(prevState => ({
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
  onKeyDown = (e: React.KeyboardEvent, node: Node) => {
    switch (e.keyCode) {
      case keyCodes.DOWN: {
        const nodeButtons = Array.from(
          document.querySelectorAll(
            `[data-test-subj="euiTreeViewButton-${this.state.treeID}"]`
          )
        );
        const currentIndex = nodeButtons.indexOf(e.currentTarget);
        if (currentIndex > -1) {
          const nextButton = nodeButtons[currentIndex + 1] as HTMLElement;
          if (nextButton) {
            e.preventDefault();
            e.stopPropagation();
            nextButton.focus();
          }
        }
        break;
      }
      case keyCodes.UP: {
        const nodeButtons = Array.from(
          document.querySelectorAll(
            `[data-test-subj="euiTreeViewButton-${this.state.treeID}"]`
          )
        );
        const currentIndex = nodeButtons.indexOf(e.currentTarget);
        if (currentIndex > -1) {
          const prevButton = nodeButtons[currentIndex + -1] as HTMLElement;
          if (prevButton) {
            e.preventDefault();
            e.stopPropagation();
            prevButton.focus();
          }
        }
        break;
      }
      case keyCodes.RIGHT: {
        if (!this.isNodeOpen(node)) {
          e.preventDefault();
          e.stopPropagation();
          this.handleNodeClick(node, true);
        }
        break;
      }
      case keyCodes.LEFT: {
        if (this.isNodeOpen(node)) {
          e.preventDefault();
          e.stopPropagation();
          this.handleNodeClick(node, true);
        }
      }
      default:
        break;
    }
  };

  onChildrenKeydown = (e: React.KeyboardEvent, index: number) => {
    if (e.keyCode === keyCodes.LEFT) {
      e.preventDefault();
      e.stopPropagation();
      this.buttonRef[index]!.focus();
    }
  };

  render() {
    const {
      children,
      className,
      items,
      isCondensed,
      expandByDefault,
      showExpansionArrows,
      ...rest
    } = this.props;

    // Computed classNames
    const classes = classNames(
      'euiTreeView',
      { 'euiTreeView--condensed': isCondensed },
      { 'euiTreeView--withArrows': showExpansionArrows },
      className
    );

    const instructionsId = `${this.state.treeID}--instruction`;

    return (
      <EuiTreeViewContext.Provider value={this.state.treeID}>
        <EuiText
          size={isCondensed ? 's' : 'm'}
          className="euiTreeView__wrapper">
          {!this.isNested && (
            <EuiScreenReaderOnly>
              <EuiI18n
                token="euiTreeView.listNavigationInstructions"
                default="You can quickly navigate this list using arrow keys.">
                {(listNavigationInstructions: string) => (
                  <p id={instructionsId}>{listNavigationInstructions}</p>
                )}
              </EuiI18n>
            </EuiScreenReaderOnly>
          )}
          <ul
            className={classes}
            id={this.state.treeID}
            aria-describedby={!this.isNested ? instructionsId : undefined}
            {...rest}>
            {items.map((node, index) => {
              const buttonId = `${this.state.treeID}--${index}--node`;

              return (
                <EuiI18n
                  key={node.label + index}
                  token="euiTreeView.ariaLabel"
                  default="{nodeLabel} child of {ariaLabel}"
                  values={{
                    nodeLabel: node.label,
                    ariaLabel: hasAriaLabel(rest) ? rest['aria-label'] : '',
                  }}>
                  {(ariaLabel: string) => {
                    const label = hasAriaLabel(rest)
                      ? {
                          'aria-label': ariaLabel,
                        }
                      : {
                          'aria-labelledby': `${buttonId} ${
                            rest['aria-labelledby']
                          }`,
                        };

                    return (
                      <React.Fragment>
                        <li
                          className={classNames(
                            'euiTreeView__node',
                            this.isNodeOpen(node)
                              ? 'euiTreeView__node--expanded'
                              : null
                          )}>
                          <button
                            id={buttonId}
                            aria-controls={`euiNestedTreeView-${
                              this.state.treeID
                            }`}
                            aria-expanded={this.isNodeOpen(node)}
                            ref={ref => this.setButtonRef(ref, index)}
                            data-test-subj={`euiTreeViewButton-${
                              this.state.treeID
                            }`}
                            onKeyDown={(event: React.KeyboardEvent) =>
                              this.onKeyDown(event, node)
                            }
                            onClick={() => this.handleNodeClick(node)}
                            className={classNames(
                              'euiTreeView__nodeInner',
                              showExpansionArrows && node.children
                                ? 'euiTreeView__nodeInner--withArrows'
                                : null,
                              this.state.activeItem === node.id
                                ? 'euiTreeView__node--active'
                                : null
                            )}>
                            {showExpansionArrows && node.children ? (
                              <EuiIcon
                                className="euiTreeView__expansionArrow"
                                size={isCondensed ? 's' : 'm'}
                                type={
                                  this.isNodeOpen(node)
                                    ? 'arrowDown'
                                    : 'arrowRight'
                                }
                              />
                            ) : null}
                            {node.icon && !node.useEmptyIcon ? (
                              <span className="euiTreeView__iconWrapper">
                                {this.isNodeOpen(node) && node.iconWhenExpanded
                                  ? node.iconWhenExpanded
                                  : node.icon}
                              </span>
                            ) : null}
                            {node.useEmptyIcon && !node.icon ? (
                              <span className="euiTreeView__iconPlaceholder" />
                            ) : null}
                            <span className="euiTreeView__nodeLabel">
                              {node.label}
                            </span>
                          </button>
                          <div
                            id={`euiNestedTreeView-${this.state.treeID}`}
                            onKeyDown={(event: React.KeyboardEvent) =>
                              this.onChildrenKeydown(event, index)
                            }>
                            {node.children && this.isNodeOpen(node) ? (
                              <EuiTreeView
                                items={node.children}
                                isCondensed={isCondensed}
                                showExpansionArrows={showExpansionArrows}
                                expandByDefault={this.state.expandChildNodes}
                                {...label}
                              />
                            ) : null}
                          </div>
                        </li>
                      </React.Fragment>
                    );
                  }}
                </EuiI18n>
              );
            })}
          </ul>
        </EuiText>
      </EuiTreeViewContext.Provider>
    );
  }
}
