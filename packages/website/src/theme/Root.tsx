import { useEffect } from 'react';
import { useAppTheme } from '@elastic/eui-docusaurus-theme/components';
import chartsLightThemeUrl from '!file-loader!@elastic/charts/dist/theme_only_light.css';
import chartsDarkThemeUrl from '!file-loader!@elastic/charts/dist/theme_only_dark.css';
import Root from '@theme-original/Root';

export default (props: any) => {
  const { colorMode } = useAppTheme();

  // This isn't optimal and should be replaced with a more appropriate solution
  useEffect(() => {
    if (colorMode !== 'light' && colorMode !== 'dark') {
      return;
    }

    const element = document.createElement('link');
    element.rel = 'stylesheet';
    element.href =
      colorMode === 'light' ? chartsLightThemeUrl : chartsDarkThemeUrl;
    element.dataset.elasticChartsTheme = 'true';
    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element);
    };
  }, [colorMode]);

  return <Root {...props} />;
};
