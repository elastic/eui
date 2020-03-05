import React, { FunctionComponent, Ref } from 'react';
import classNames from 'classnames';
import { EuiButton, EuiButtonProps } from '../button/button';
import { EuiScreenReaderOnly } from '../accessibility/screen_reader';
import { PropsForAnchor, PropsForButton, ExclusiveUnion } from '../common';

type Positions = 'static' | 'fixed' | 'absolute';
export const POSITIONS = ['static', 'fixed', 'absolute'] as Positions[];

export interface EuiSkipLinkProps extends EuiButtonProps {
  /**
   * If true, the link will be fixed to the top left of the viewport
   */
  position?: Positions;

  /**
   * Typically an anchor id (e.g. `a11yMainContent`), the value provided
   * will be prepended with a hash `#` and used as the link `href`
   */
  destinationId: string;

  tabIndex?: number;
}

type propsForAnchor = PropsForAnchor<
  EuiSkipLinkProps,
  {
    buttonRef?: Ref<HTMLAnchorElement>;
  }
>;

type propsForButton = PropsForButton<
  EuiSkipLinkProps,
  {
    buttonRef?: Ref<HTMLButtonElement>;
  }
>;

export type Props = ExclusiveUnion<propsForAnchor, propsForButton>;

export const EuiSkipLink: FunctionComponent<EuiSkipLinkProps> = ({
  destinationId,
  tabIndex,
  position = 'static',
  children,
  className,
  ...rest
}) => {
  const classes = classNames(
    'euiSkipLink',
    [`euiSkipLink--${position}`],
    className
  );

  return (
    <EuiScreenReaderOnly showOnFocus>
      <EuiButton
        className={classes}
        href={`#${destinationId}`}
        tabIndex={position === 'fixed' ? 0 : tabIndex}
        size="s"
        fill
        {...rest}>
        {children}
      </EuiButton>
    </EuiScreenReaderOnly>
  );
};
