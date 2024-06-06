/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  MouseEvent,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { useEuiI18n } from '../../i18n';
import { CommonProps } from '../../common';
import { EuiIcon } from '../../icon';
import { EuiInputPopover, EuiPopoverTitle } from '../../popover';
import { EuiListGroup, type EuiListGroupItemProps } from '../../list_group';

import { EuiCollapsibleNavContext } from '../context';
import { EuiCollapsibleNavLink } from '../collapsible_nav_item/collapsible_nav_link';
import {
  EuiCollapsibleNavSubItems,
  type EuiCollapsibleNavItemProps,
} from '../collapsible_nav_item/collapsible_nav_item';
import { EuiCollapsedNavPopover } from '../collapsible_nav_item/collapsed/collapsed_nav_popover';

import { euiCollapsibleNavKibanaSolutionStyles } from './collapsible_nav_kibana_solution.styles';

export type KibanaCollapsibleNavSolutionProps = HTMLAttributes<HTMLDivElement> &
  CommonProps &
  Required<Pick<EuiCollapsibleNavItemProps, 'title' | 'icon' | 'items'>> & {
    solutions: EuiListGroupItemsModified;
  };

/**
 * This component should only ever be used as a **top-level component**.
 * It also should **not** be used in the nav footer.
 *
 * This component is **very** specific to Kibana and is not meant to be a generic component.
 */
export const KibanaCollapsibleNavSolution: FunctionComponent<
  KibanaCollapsibleNavSolutionProps
> = ({
  // Solution switcher
  title,
  icon,
  solutions = [],
  // Rest of the nav
  items,
  // Wrapper
  className,
  ...props
}) => {
  const { isCollapsed, isPush } = useContext(EuiCollapsibleNavContext);
  const [isSolutionSwitcherOpen, setIsSolutionSwitcherOpen] = useState(false);

  const classes = classNames('kibanaCollapsibleNavSolution', className);
  const styles = useEuiMemoizedStyles(euiCollapsibleNavKibanaSolutionStyles);
  const cssStyles = [
    styles.euiCollapsibleNavKibanaSolution,
    isPush && isCollapsed ? styles.collapsed : styles.uncollapsed,
  ];

  const solutionSwitcherIcon = 'layers';
  const solutionSolutionSwitcherTitle = useEuiI18n(
    'euiCollapsibleNavKibanaSolution.switcherTitle',
    'Solution view'
  );
  const solutionSolutionSwitcherAriaLabel = useEuiI18n(
    'euiCollapsibleNavKibanaSolution.switcherAriaLabel',
    ' - click to switch to another solution'
  );
  const solutionSolutionGroupLabel = useEuiI18n(
    'euiCollapsibleNavKibanaSolution.groupLabel',
    'Navigate to solution'
  );
  const closeSolutionPopover = useCallback((event: MouseEvent) => {
    // Allow child items to stop the popover from being closed
    if (event.isPropagationStopped()) return;
    // Only listen for clicks on child items - currentTarget is the parent <ul>
    if (event.target === event.currentTarget) return;

    // Only close the popover if the item is a clickable link or button
    const target = event.target as HTMLElement;
    const childItem = target.closest('.euiListGroupItem');
    if (['A', 'BUTTON'].includes(childItem?.firstElementChild?.tagName || '')) {
      setIsSolutionSwitcherOpen(false);
    }
  }, []);
  const solutionSwitcherContent = useMemo(() => {
    const [primaryItems, secondaryItems] = parseListItems(solutions);
    return (
      <>
        <EuiListGroup
          data-test-subj="kibanaSolutionSwitcherList"
          aria-label={solutionSolutionGroupLabel}
          listItems={primaryItems}
          size="s"
          bordered
          onClick={closeSolutionPopover}
        />
        {secondaryItems.length > 0 && (
          <>
            <EuiListGroup
              listItems={secondaryItems}
              size="s"
              css={styles.euiCollapsibleNavKibanaSolution__secondaryItems}
              onClick={closeSolutionPopover}
            />
          </>
        )}
      </>
    );
  }, [solutions, solutionSolutionGroupLabel, closeSolutionPopover, styles]);

  const sharedPopoverProps = {
    'aria-label': solutionSolutionSwitcherTitle,
    panelProps: {
      css: styles.euiCollapsibleNavKibanaSolution__switcherPopover,
    },
    panelPaddingSize: 's',
    display: 'block',
  } as const;

  return (
    <div className={classes} css={cssStyles} {...props}>
      {isCollapsed && isPush ? (
        <>
          <EuiCollapsedNavPopover icon={icon} title={title} items={items} />
          <EuiCollapsedNavPopover
            {...sharedPopoverProps}
            icon={solutionSwitcherIcon}
            title={solutionSolutionSwitcherTitle}
            items={[{ renderItem: () => solutionSwitcherContent }]}
            data-test-subj="kibanaSolutionSwitcherDocked"
          />
        </>
      ) : (
        <>
          {/* Using EuiInputPopover instead of EuiPopover mostly for the automatic width logic 🍝 */}
          <EuiInputPopover
            {...sharedPopoverProps}
            fullWidth={true}
            // Use the default EuiPopover focus trap, not the EuiInputPopover focus trap
            disableFocusTrap={true}
            ownFocus={true}
            isOpen={isSolutionSwitcherOpen}
            closePopover={() => setIsSolutionSwitcherOpen(false)}
            input={
              <EuiCollapsibleNavLink
                css={styles.euiCollapsibleNavKibanaSolution__title}
                onClick={() => setIsSolutionSwitcherOpen((isOpen) => !isOpen)}
                isInteractive
                isSelected={isSolutionSwitcherOpen}
                data-test-subj="kibanaSolutionSwitcher"
              >
                <EuiIcon
                  type={icon}
                  css={styles.euiCollapsibleNavKibanaSolution__logo}
                />
                {title}
                <EuiIcon
                  type={solutionSwitcherIcon}
                  css={styles.euiCollapsibleNavKibanaSolution__switcherIcon}
                  aria-label={solutionSolutionSwitcherAriaLabel}
                />
              </EuiCollapsibleNavLink>
            }
          >
            <EuiPopoverTitle>{solutionSolutionSwitcherTitle}</EuiPopoverTitle>
            {solutionSwitcherContent}
          </EuiInputPopover>
          <EuiCollapsibleNavSubItems
            items={items}
            role="group"
            aria-label={title}
          />
        </>
      )}
    </div>
  );
};

/**
 * Tweak EuiListGroup's items API to match EuiCollapsibleNav's
 * more closely (primarily label->title, iconType->icon),
 * and also to allow passing secondary items in the same array
 * (which will get rendered in a separate non-bordered group)
 */
type EuiListGroupItemsModified = Array<
  Omit<EuiListGroupItemProps, 'label' | 'iconType' | 'icon'> & {
    title: string;
    icon?: EuiListGroupItemProps['iconType'];
    isSecondary?: boolean;
  }
>;
const parseListItems = (items: EuiListGroupItemsModified) => {
  const primaryItems: EuiListGroupItemProps[] = [];
  const secondaryItems: EuiListGroupItemProps[] = [];

  items.forEach(({ title, icon, isSecondary, ...item }) => {
    const arrayToPushTo = isSecondary ? secondaryItems : primaryItems;
    arrayToPushTo.push({
      ...item,
      label: title,
      iconType: icon,
    });
  });

  return [primaryItems, secondaryItems];
};
