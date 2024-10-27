import { useEuiTheme, EuiBadge, tint } from '@elastic/eui';

export const TintPreview = () => {
  const { euiTheme } = useEuiTheme();

  return (
    <code>
      tint(
      <EuiBadge color={euiTheme.colors.danger}>
        {euiTheme.colors.danger}
      </EuiBadge>
      , 0.75) ={' '}
      <EuiBadge color={tint(euiTheme.colors.danger, 0.75)}>
        {tint(euiTheme.colors.danger, 0.75)}
      </EuiBadge>
    </code>
  );
};
