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
  useContext,
  useState,
  useMemo,
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
    solutions: EuiListGroupItemProps[];
    secondaryItems?: EuiListGroupItemProps[];
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
  secondaryItems,
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
    !(isPush && isCollapsed) && styles.uncollapsed,
  ];

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
  const solutionSwitcherContent = useMemo(() => {
    return (
      <>
        <EuiListGroup
          data-test-subj="kibanaSolutionSwitcherList"
          aria-label={solutionSolutionGroupLabel}
          listItems={solutions}
          size="s"
          bordered
        />
        {secondaryItems && (
          <>
            <EuiListGroup
              listItems={secondaryItems}
              size="s"
              css={styles.euiCollapsibleNavKibanaSolution__secondaryItems}
            />
          </>
        )}
      </>
    );
  }, [solutions, secondaryItems, solutionSolutionGroupLabel, styles]);

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
          <EuiCollapsedNavPopover
            {...sharedPopoverProps}
            icon="layers"
            title={solutionSolutionSwitcherTitle}
            items={[{ renderItem: () => solutionSwitcherContent }]}
            data-test-subj="kibanaSolutionSwitcherDocked"
          />
          <EuiCollapsedNavPopover icon={icon} title={title} items={items} />
        </>
      ) : (
        <>
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
                  type="layers"
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
            isGroup
            role="group"
            aria-label={title}
          />
        </>
      )}
    </div>
  );
};
