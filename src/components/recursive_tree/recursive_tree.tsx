import React, { Component, HTMLAttributes, createContext } from 'react';
import classNames from 'classnames';
import { CommonProps, Omit } from '../common';
import { EuiI18n } from '../i18n';
import { EuiIcon } from '../icon';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiText } from '../text';
import { keyCodes, htmlIdGenerator } from '../../services';

const EuiRecursiveTreeContext = createContext<string>('');
const treeIdGenerator = htmlIdGenerator('euiRecursiveTree');

function hasAriaLabel(
  x: HTMLAttributes<HTMLUListElement>
): x is { 'aria-label': string } {
  return x.hasOwnProperty('aria-label');
}

export interface Node {
  /** An array of EuiRecursiveTreeNodes to render as children
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

interface EuiRecursiveTreeState {
  openItems: string[];
  activeItem: string;
  treeID: string;
  expandChildNodes: boolean;
}

export type CommonTreeProps = CommonProps &
  HTMLAttributes<HTMLUListElement> & {
    /** An array of EuiRecursiveTreeNodes
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

export type EuiRecursiveTreeProps = Omit<
  CommonTreeProps,
  'aria-label' | 'aria-labelledby'
> &
  ({ 'aria-label': string } | { 'aria-labelledby': string });

export class EuiRecursiveTree extends Component<
  EuiRecursiveTreeProps,
  EuiRecursiveTreeState
> {
  static contextType = EuiRecursiveTreeContext;
  isNested: boolean = !!this.context;
  state: EuiRecursiveTreeState = {
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
            `[data-test-subj="euiRecursiveTreeButton-${this.state.treeID}"]`
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
            `[data-test-subj="euiRecursiveTreeButton-${this.state.treeID}"]`
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
      'euiRecursiveTree',
      { 'euiRecursiveTree--condensed': isCondensed },
      { 'euiRecursiveTree--withArrows': showExpansionArrows },
      className
    );

    const instructionsId = `${this.state.treeID}--instruction`;

    return (
      <EuiRecursiveTreeContext.Provider value={this.state.treeID}>
        <EuiText
          size={isCondensed ? 's' : 'm'}
          className="euiRecursiveTree__wrapper">
          {!this.isNested && (
            <EuiScreenReaderOnly>
              <EuiI18n
                token="euiRecursiveTree.listNavigationInstructions"
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
              const label = hasAriaLabel(rest)
                ? {
                    'aria-label': `${node.label} child of ${
                      rest['aria-label']
                    }`,
                  }
                : {
                    'aria-labelledby': `${buttonId} ${rest['aria-labelledby']}`,
                  };

              return (
                <React.Fragment key={node.label + index}>
                  <li
                    className={classNames(
                      'euiRecursiveTree__node',
                      this.isNodeOpen(node)
                        ? 'euiRecursiveTree__node--expanded'
                        : null
                    )}>
                    <button
                      id={buttonId}
                      aria-controls={`euiRecursiveNestedTree-${
                        this.state.treeID
                      }`}
                      aria-expanded={this.isNodeOpen(node)}
                      ref={ref => this.setButtonRef(ref, index)}
                      data-test-subj={`euiRecursiveTreeButton-${
                        this.state.treeID
                      }`}
                      onKeyDown={(event: React.KeyboardEvent) =>
                        this.onKeyDown(event, node)
                      }
                      onClick={() => this.handleNodeClick(node)}
                      className={classNames(
                        'euiRecursiveTree__nodeInner',
                        showExpansionArrows && node.children
                          ? 'euiRecursiveTree__nodeInner--withArrows'
                          : null,
                        this.state.activeItem === node.id
                          ? 'euiRecursiveTree__node--active'
                          : null
                      )}>
                      {showExpansionArrows && node.children ? (
                        <EuiIcon
                          className="euiRecursiveTree__expansionArrow"
                          size={isCondensed ? 's' : 'm'}
                          type={
                            this.isNodeOpen(node) ? 'arrowDown' : 'arrowRight'
                          }
                        />
                      ) : null}
                      {node.icon && !node.useEmptyIcon ? (
                        <span className="euiRecursiveTree__iconWrapper">
                          {this.isNodeOpen(node) && node.iconWhenExpanded
                            ? node.iconWhenExpanded
                            : node.icon}
                        </span>
                      ) : null}
                      {node.useEmptyIcon && !node.icon ? (
                        <span className="euiRecursiveTree__iconPlaceholder" />
                      ) : null}
                      <span className="euiRecurisveTree__nodeLabel">
                        {node.label}
                      </span>
                    </button>
                    <div
                      id={`euiRecursiveNestedTree-${this.state.treeID}`}
                      onKeyDown={(event: React.KeyboardEvent) =>
                        this.onChildrenKeydown(event, index)
                      }>
                      {node.children && this.isNodeOpen(node) ? (
                        <EuiRecursiveTree
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
            })}
          </ul>
        </EuiText>
      </EuiRecursiveTreeContext.Provider>
    );
  }
}
