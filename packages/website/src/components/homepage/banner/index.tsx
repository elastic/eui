import { EuiCallOut, EuiLink } from '@elastic/eui';
import { useState } from 'react';

const STORAGE_KEY = 'docs_page_welcome_notification';
const STORAGE_VALUE_DISMISSED = 'dismissed';

export const HomepageBanner = () => {
  const [isVisible, setVisible] = useState(() => {
    const storageItem = localStorage.getItem(STORAGE_KEY);

    console.log(storageItem);

    if (storageItem && storageItem === STORAGE_VALUE_DISMISSED) {
      return false;
    }

    return true;
  });

  if (!isVisible) return null;

  const handleOnDismiss = () => {
    localStorage.setItem(STORAGE_KEY, STORAGE_VALUE_DISMISSED);
    setVisible(false);
  };

  return (
    <EuiCallOut
      iconType="cheer"
      title="Welcome to the new EUI docs page!"
      onDismiss={handleOnDismiss}
    >
      If you encounter any issues you can report them{' '}
      <EuiLink
        href="https://github.com/elastic/eui/issues"
        title="EUI issues"
        target="_blank"
      >
        here
      </EuiLink>{' '}
      or if you would still like to view the old docs page you can do so{' '}
      <EuiLink href="https://eui.elastic.co/v95.3.0/">here</EuiLink>.
    </EuiCallOut>
  );
};
