import React, {
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
  Ref,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion } from '../common';
import { EuiBetaBadge } from '../badge/beta_badge';

export type PanelPaddingSize = 'none' | 's' | 'm' | 'l';

export interface EuiPanelProps {
  /**
   * If active, adds a deeper shadow to the panel
   */
  hasShadow?: boolean;
  /**
   * Padding applied to the panel
   */
  paddingSize?: PanelPaddingSize;
  /**
   * When true the panel will grow to match `EuiFlexItem`
   */
  grow?: boolean;

  panelRef?: Ref<HTMLDivElement>;

  /**
   * Add a badge to the panel to label it as "Beta" or other non-GA state
   */
  betaBadgeLabel?: string;

  /**
   * Add a description to the beta badge (will appear in a tooltip)
   */
  betaBadgeTooltipContent?: ReactNode;

  /**
   * Optional title will be supplied as tooltip title or title attribute otherwise the label will be used
   */
  betaBadgeTitle?: string;
}

type Divlike = HTMLAttributes<HTMLDivElement>;
interface Buttonlike {
  onClick: MouseEventHandler<HTMLButtonElement>;
} // onClick is the discriminant

type Props = CommonProps & EuiPanelProps & ExclusiveUnion<Divlike, Buttonlike>;

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPanel--paddingSmall',
  m: 'euiPanel--paddingMedium',
  l: 'euiPanel--paddingLarge',
};

export const SIZES = Object.keys(paddingSizeToClassNameMap);

export const EuiPanel: FunctionComponent<Props> = ({
  children,
  className,
  paddingSize = 'm',
  hasShadow = false,
  grow = true,
  panelRef,
  onClick,
  betaBadgeLabel,
  betaBadgeTooltipContent,
  betaBadgeTitle,
  ...rest
}) => {
  const classes = classNames(
    'euiPanel',
    paddingSize ? paddingSizeToClassNameMap[paddingSize] : null,
    {
      'euiPanel--shadow': hasShadow,
      'euiPanel--flexGrowZero': !grow,
      'euiPanel--isClickable': onClick,
      'euiPanel--hasBetaBadge': betaBadgeLabel,
    },
    className
  );

  const PanelTag = onClick ? 'button' : 'div';

  const props = {
    ref: panelRef,
    className: classes,
    onClick: undefined as any,
  };

  // Avoid passing down this prop if it hasn't been supplied, in order to
  // avoid noise in react-test-renderer snapshots.
  if (onClick != null) {
    props.onClick = onClick;
  }

  let optionalBetaBadge;
  if (betaBadgeLabel) {
    optionalBetaBadge = (
      <span className="euiPanel__betaBadgeWrapper">
        <EuiBetaBadge
          label={betaBadgeLabel}
          title={betaBadgeTitle}
          tooltipContent={betaBadgeTooltipContent}
          className="euiPanel__betaBadge"
        />
      </span>
    );
  }

  return (
    // @ts-ignore seems to be some div / button confusion here
    <PanelTag {...props} {...rest}>
      {optionalBetaBadge}
      {children}
    </PanelTag>
  );
};
