/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo, memo } from 'react';

import { useEuiMemoizedStyles } from '../../services';
import { EuiI18n } from '../i18n';
import { EuiPopoverFooter } from '../popover';
import { EuiButtonEmpty } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';

import {
  EuiTourStepIndicator,
  type EuiTourStepStatus,
} from './tour_step_indicator';
import type { EuiTourStepProps } from './tour_step';
import { euiTourFooterStyles } from './_tour_footer.styles';

type EuiTourFooterProps = Pick<
  EuiTourStepProps,
  'footerAction' | 'step' | 'stepsTotal' | 'onFinish'
>;

export const EuiTourFooter: FunctionComponent<EuiTourFooterProps> = memo(
  ({ footerAction, step, stepsTotal, onFinish }) => {
    const footerStyles = useEuiMemoizedStyles(euiTourFooterStyles);

    const customFooterAction = useMemo(() => {
      if (!footerAction) return null;

      return Array.isArray(footerAction) ? (
        <EuiFlexGroup
          gutterSize="s"
          alignItems="center"
          justifyContent="flexEnd"
          responsive={false}
          wrap
        >
          {footerAction.map((action, index) => (
            <EuiFlexItem key={index} grow={false}>
              {action}
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      ) : (
        <EuiFlexItem grow={false}>{footerAction}</EuiFlexItem>
      );
    }, [footerAction]);

    const indicators = useMemo(() => {
      if (stepsTotal <= 1) return null;

      return (
        <EuiFlexItem grow={false}>
          <ul className="euiTourFooter__stepList">
            {[...Array(stepsTotal).keys()].map((_, i) => {
              let status: EuiTourStepStatus = 'complete';
              if (step === i + 1) {
                status = 'active';
              } else if (step <= i) {
                status = 'incomplete';
              }
              return (
                <EuiTourStepIndicator key={i} number={i + 1} status={status} />
              );
            })}
          </ul>
        </EuiFlexItem>
      );
    }, [step, stepsTotal]);

    return (
      <EuiPopoverFooter
        css={footerStyles.euiTourFooter}
        className="euiTourFooter"
      >
        <EuiFlexGroup
          responsive={false}
          justifyContent={stepsTotal > 1 ? 'spaceBetween' : 'flexEnd'}
          alignItems="center"
        >
          {indicators}

          {footerAction ? (
            customFooterAction
          ) : (
            <EuiFlexItem grow={false}>
              <EuiI18n
                tokens={[
                  'euiTourFooter.endTour',
                  'euiTourFooter.skipTour',
                  'euiTourFooter.closeTour',
                ]}
                defaults={['End tour', 'Skip tour', 'Close tour']}
              >
                {([endTour, skipTour, closeTour]: string[]) => (
                  <EuiButtonEmpty
                    onClick={onFinish}
                    color="text"
                    flush="right"
                    size="xs"
                  >
                    {stepsTotal > 1
                      ? stepsTotal === step
                        ? endTour
                        : skipTour
                      : closeTour}
                  </EuiButtonEmpty>
                )}
              </EuiI18n>
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
      </EuiPopoverFooter>
    );
  }
);
EuiTourFooter.displayName = '_EuiTourFooter';
