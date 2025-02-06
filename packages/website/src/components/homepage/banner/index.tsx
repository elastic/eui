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
      color: ${euiTheme.colors.textWarning};
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
        Welcome to the new EUI documentation. Enjoy the fresh updates! We are
        still refining the site, so please{' '}
        <EuiLink
          href="https://github.com/elastic/eui/issues/new/choose"
          title="EUI issues"
          target="_blank"
        >
          let us know if you find any issues
        </EuiLink>
        {'. '}
      </EuiText>
    </EuiCallOut>
  );
};
