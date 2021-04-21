import React, {
  FunctionComponent,
  ReactNode,
  useContext,
  useLayoutEffect,
} from 'react';
import { ChromeContext } from '../../views/chrome_context';
import { Route, Switch, useRouteMatch } from 'react-router';
import { EuiButton } from '../../../../src/components/button';

const Example: FunctionComponent = ({ children }) => {
  const { setIsChromeHidden } = useContext(ChromeContext);
  useLayoutEffect(() => {
    setIsChromeHidden(true);
    document.body.classList.add('euiBody-hasFullscreenExample');
    return () => {
      setIsChromeHidden(false);
      document.body.classList.remove('euiBody-hasFullscreenExample');
    };
  }, [setIsChromeHidden]);
  return <div className="guideSection__fullscreenExample">{children}</div>;
};

export const StandaloneExample: FunctionComponent<{
  slug: string;
  example: ReactNode;
}> = ({ slug, example }) => {
  const { path } = useRouteMatch();
  const route = `${path}/${slug}`;
  return (
    <>
      <EuiButton href={`#${route}`} iconType="fullScreen">
        Full screen demo
      </EuiButton>
      <Switch>
        <Route path={route}>
          <Example>{example}</Example>
        </Route>
      </Switch>
    </>
  );
};
