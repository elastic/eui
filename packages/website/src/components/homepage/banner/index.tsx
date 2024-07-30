import { css } from '@emotion/react';
import {
  EuiCallOut,
  EuiLink,
  EuiText,
  useEuiMemoizedStyles,
  UseEuiTheme,
} from '@elastic/eui';
import { useState } from 'react';

const STORAGE_KEY = 'docs_page_welcome_notification';
const STORAGE_VALUE_DISMISSED = 'dismissed';

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  banner: css`
    .euiLink {
      color: ${euiTheme.colors.warningText};
      text-decoration: underline;
    }
  `,
});

export const HomepageBanner = () => {
  const [isVisible, setVisible] = useState(() => {
    const storageItem = localStorage.getItem(STORAGE_KEY);

    if (storageItem && storageItem === STORAGE_VALUE_DISMISSED) {
      return false;
    }

    return true;
  });

  const styles = useEuiMemoizedStyles(getStyles);

  if (!isVisible) return null;

  const handleOnDismiss = () => {
    localStorage.setItem(STORAGE_KEY, STORAGE_VALUE_DISMISSED);
    setVisible(false);
  };

  return (
    <EuiCallOut color="warning" onDismiss={handleOnDismiss} css={styles.banner}>
      <EuiText color="warning" size="s">
        This is a new EUI documentation, and we are still refining it. If you
        noticed any problems, please{' '}
        <EuiLink
          href="https://github.com/elastic/eui/issues"
          title="EUI issues"
          target="_blank"
        >
          submit an issue here
        </EuiLink>
        {'. '}
        If you would like to view the old docs page you can still do so{' '}
        <EuiLink href="https://eui.elastic.co/v95.3.0/">here</EuiLink>.
      </EuiText>
    </EuiCallOut>
  );
};
