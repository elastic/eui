import { EuiCode, EuiCodeProps, EuiCopy, EuiLink } from '@elastic/eui';

export const CopyableToken = ({
  token,
  language,
}: {
  token: string;
  language?: EuiCodeProps['language'];
}) => (
  <EuiCopy
    textToCopy={token}
    beforeMessage="Click to copy token"
    afterMessage={`${token} copied`}
  >
    {(copy) => (
      <EuiLink onClick={copy} aria-label={`Copy ${token}`}>
        <EuiCode language={language} transparentBackground>
          {token}
        </EuiCode>
      </EuiLink>
    )}
  </EuiCopy>
);
