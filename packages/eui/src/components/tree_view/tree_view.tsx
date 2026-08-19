/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { keys, htmlIdGenerator, useEuiTheme } from '../../services';
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

const EuiTreeViewComponent = forwardRef<HTMLUListElement, CommonTreeProps>(
  (
    {
      children,
      className,
      items,
      display = 'default',
      expandByDefault,
      showExpansionArrows,
      id,
      ...rest
    },
    ref
  ) => {
    const contextId = useContext(EuiTreeViewContext);
    const isNested = useRef(!!contextId).current;
    const theme = useEuiTheme();

    const treeIdGeneratorRef = useRef<
      ReturnType<typeof htmlIdGenerator> | undefined
    >(undefined);
    if (treeIdGeneratorRef.current === undefined) {
      treeIdGeneratorRef.current = htmlIdGenerator('euiTreeView');
    }
    const treeIdGenerator = treeIdGeneratorRef.current;

    const [openItems, setOpenItems] = useState<string[]>(() =>
      expandByDefault
        ? items
            .map<string>(({ id, children }) =>
              children ? id : (null as unknown as string)
            )
            .filter((x) => x != null)
        : items
            .map<string>(({ id, children, isExpanded }) =>
              children && isExpanded ? id : (null as unknown as string)
            )
            .filter((x) => x != null)
    );
    const [activeItem, setActiveItem] = useState('');
    const [treeID, setTreeID] = useState(() =>
      getTreeId(id, contextId, treeIdGenerator)
    );
    const [expandChildNodes, setExpandChildNodes] = useState(
      expandByDefault || false
    );
    const previousId = useRef(id);

    useEffect(() => {
      if (id !== previousId.current) {
        previousId.current = id;
        setTreeID(getTreeId(id, contextId, treeIdGenerator));
      }
    }, [contextId, id, treeIdGenerator]);

    const buttonRef = useRef<Array<HTMLButtonElement | undefined>>([]);

    const setButtonRef = (
      ref: HTMLButtonElement | HTMLAnchorElement | null,
      index: number
    ) => {
      buttonRef.current[index] = ref as HTMLButtonElement;
    };

    const isNodeOpen = (node: Node) => openItems.includes(node.id);

    const handleNodeClick = (node: Node, ignoreCallback: boolean = false) => {
      const index = openItems.indexOf(node.id);

      setExpandChildNodes(false);

      node.isExpanded = !node.isExpanded;

      if (!ignoreCallback && node.callback !== undefined) {
        node.callback();
      }

      if (isNodeOpen(node)) {
        // if the node is part of openItems[] then remove it
        setOpenItems(openItems.filter((_, i) => i !== index));
      } else {
        // if the node isn't part of openItems[] then add it
        setOpenItems((prevOpenItems) => [...prevOpenItems, node.id]);
        setActiveItem(node.id);
      }
    };

    // Enable keyboard navigation
    const onKeyDown = (event: React.KeyboardEvent, node: Node) => {
      switch (event.key) {
        case keys.ARROW_DOWN: {
          const nodeButtons = Array.from(
            document.querySelectorAll(
              `[data-test-subj="euiTreeViewButton-${treeID}"]`
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
              `[data-test-subj="euiTreeViewButton-${treeID}"]`
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
          if (!isNodeOpen(node)) {
            event.preventDefault();
            event.stopPropagation();
            handleNodeClick(node, true);
          }
          break;
        }
        case keys.ARROW_LEFT: {
          if (isNodeOpen(node)) {
            event.preventDefault();
            event.stopPropagation();
            handleNodeClick(node, true);
          }
        }
        default:
          break;
      }
    };

    const onChildrenKeydown = (event: React.KeyboardEvent, index: number) => {
      if (event.key === keys.ARROW_LEFT) {
        event.preventDefault();
        event.stopPropagation();
        buttonRef.current[index]!.focus();
      }
    };

    const styles = euiTreeViewStyles(theme);
    const cssStyles = [styles.euiTreeView, styles[display]];

    // Computed classNames
    const classes = classNames('euiTreeView', className);

    const instructionsId = `${treeID}--instruction`;

    return (
      <EuiTreeViewContext.Provider value={treeID}>
        {!isNested && (
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
          ref={ref}
          css={cssStyles}
          className={classes}
          id={!isNested ? treeID : undefined}
          aria-describedby={!isNested ? instructionsId : undefined}
          role="list" // VoiceOver doesn't parse lists with `list-style: none` as the correct role - @see https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html
          {...rest}
        >
          {items.map((node, index) => {
            const buttonId = node.id;
            const wrappingId = treeIdGenerator(buttonId);
            const isNodeExpanded = node.children ? isNodeOpen(node) : undefined; // Determines the `aria-expanded` attribute

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
                buttonRef={(ref) => setButtonRef(ref, index)}
                aria-controls={node.children ? wrappingId : undefined}
                label={node.label}
                icon={icon}
                hasArrow={showExpansionArrows}
                isExpanded={isNodeExpanded}
                isActive={activeItem === node.id}
                display={display}
                data-test-subj={`euiTreeViewButton-${treeID}`}
                onKeyDown={(event: React.KeyboardEvent) =>
                  onKeyDown(event, node)
                }
                onClick={() => handleNodeClick(node)}
              >
                {node.children && (
                  <div
                    id={wrappingId}
                    onKeyDown={(event: React.KeyboardEvent) =>
                      onChildrenKeydown(event, index)
                    }
                  >
                    {isNodeExpanded && (
                      <EuiTreeViewComponent
                        items={node.children}
                        display={display}
                        showExpansionArrows={showExpansionArrows}
                        expandByDefault={expandChildNodes}
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
);

const EuiTreeViewPublicComponent =
  EuiTreeViewComponent as React.ForwardRefExoticComponent<
    EuiTreeViewProps & React.RefAttributes<HTMLUListElement>
  >;

EuiTreeViewComponent.displayName = 'EuiTreeView';

/**
 * @see {@link https://eui.elastic.co/docs/components/navigation/tree-view/|EuiTreeView documentation}
 */
export const EuiTreeView = Object.assign(EuiTreeViewPublicComponent, {
  Item: EuiTreeViewItem,
});
