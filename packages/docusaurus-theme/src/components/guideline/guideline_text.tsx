import { PropsWithChildren, useMemo } from 'react';
import { EuiText, EuiTextProps } from '@elastic/eui';
import { GuidelineType } from './types';

export interface GuidelineTextProps extends PropsWithChildren {
  type: GuidelineType;
}

export const GuidelineText = ({ type, children }: GuidelineTextProps) => {
  const textPrefix = useMemo(() => {
    if (type === 'do') {
      return (
        <>
          <strong>Do:</strong>&nbsp;
        </>
      );
    }

    if (type === 'dont') {
      return (
        <>
          <strong>Don't:</strong>&nbsp;
        </>
      );
    }

    return undefined;
  }, [type]);

  const textColor = useMemo((): EuiTextProps['color'] => {
    if (type === 'do') {
      return 'success';
    }

    if (type === 'dont') {
      return 'danger';
    }

    return 'text';
  }, [type]);

  return (
    <EuiText size="s" color={textColor}>
      <p>
        {textPrefix}{children}
      </p>
    </EuiText>
  );
};
