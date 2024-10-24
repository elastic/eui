import { useContext, useEffect } from 'react';
import { AppThemeContext } from '@elastic/eui-docusaurus-theme/lib/components/theme_context';
import chartsLightThemeUrl from '!file-loader!@elastic/charts/dist/theme_only_light.css';
import chartsDarkThemeUrl from '!file-loader!@elastic/charts/dist/theme_only_dark.css';
import Root from '@theme-original/Root';

export default (props: any) => {
  const themeContext = useContext(AppThemeContext);

  // This isn't optimal and should be replaced with a more appropriate solution
  useEffect(() => {
    if (themeContext.theme !== 'light' && themeContext.theme !== 'dark') {
      return;
    }

    const element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href = themeContext.theme === 'light' ? chartsLightThemeUrl : chartsDarkThemeUrl;
    element.dataset.elasticChartsTheme = 'true';
    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element)
    };
  }, [themeContext.theme]);

  return <Root {...props} />;
}
