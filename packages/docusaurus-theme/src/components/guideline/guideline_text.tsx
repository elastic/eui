import { PropsWithChildren, useMemo } from 'react';
import { EuiText, EuiTextProps } from '@elastic/eui';
import { GuidelineType } from './types';

export interface GuidelineTextProps extends PropsWithChildren {
  type: GuidelineType;
}

export const GuidelineText = ({ type, children }: GuidelineTextProps) => {
  const textPrefix = useMemo(() => {
    if (type === 'default') {
      return undefined;
    }

    return (
      <>
        <strong>{type === 'do' ? 'Do:' : `Don't:`}</strong>&nbsp;
      </>
    );
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
