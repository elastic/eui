import React, { useContext } from 'react';

import {
  EuiText,
  EuiCode,
  EuiPanel,
  EuiFlexItem,
  EuiFlexGroup,
} from '../../../../src';
import { ThemeContext } from '../../components/with_theme';
import { ThemeExample } from '../theme/_components/_theme_example';

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  return (
    <>
      <ThemeExample
        title=".eui-fullHeight"
        type="className"
        description={
          <>
            <p>
              Quick utility for expanding the height of the element to its
              parents dimensions. Use it to stretch each nested element until
              the one that applies scroll.
            </p>
            <p>Works on both flex and non-flex elements.</p>
          </>
        }
        example={
          <div style={{ height: 180 }}>
            <EuiFlexGroup
              className="eui-fullHeight"
              gutterSize="s"
              responsive={false}
            >
              <EuiFlexItem>
                <EuiPanel
                  className="eui-yScroll"
                  color="warning"
                  tabIndex={0}
                  role="region"
                  aria-label="Example 1 for full height region"
                >
                  <EuiText size="s">
                    <p>
                      Orbiting this at a distance of roughly ninety-two million
                      miles is an utterly insignificant little blue green planet
                      whose ape-descended life forms are so amazingly primitive
                      that they still think digital watches are a pretty neat
                      idea.
                    </p>
                  </EuiText>
                </EuiPanel>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiPanel
                  className="eui-yScroll"
                  color="warning"
                  tabIndex={0}
                  role="region"
                  aria-label="Example 2 for full height region"
                >
                  <EuiText size="s">
                    <p>
                      Orbiting this at a distance of roughly ninety-two million
                      miles is an utterly insignificant little blue green planet
                      whose ape-descended life forms are so amazingly primitive
                      that they still think digital watches are a pretty neat
                      idea.
                    </p>
                  </EuiText>
                </EuiPanel>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        }
        snippet={`<BodyContent style={{ height: 180 }}>
  <EuiFlexGroup
    className="eui-fullHeight" responsive={false}>
    <EuiFlexItem>
      <BodyScroll
        className="eui-yScroll" tabIndex={0} role="region" aria-label=""/>
    </EuiFlexItem>
    <EuiFlexItem>
      <BodyScroll
        className="eui-yScroll" tabIndex={0} role="region" aria-label=""/>
    </EuiFlexItem>
  </EuiFlexGroup>
</BodyContent>`}
      />

      {!showSass && (
        <ThemeExample
          title={<code>{'euiFullHeight()'}</code>}
          type="function"
          description={
            <>
              <p>
                Emotion mixin for adding full height scrolling to a container or
                flex child.
              </p>
              <p>
                It applies{' '}
                <EuiCode language="css">
                  height: 100%; overflow: hidden;
                </EuiCode>{' '}
                but also adds <EuiCode language="css">flex: 1 1 auto;</EuiCode>{' '}
                for use within <EuiCode>flex</EuiCode> containers.
              </p>
            </>
          }
          snippet="${euiFullHeight()}"
          snippetLanguage="emotion"
        />
      )}

      {showSass && (
        <ThemeExample
          title={<code>{'@include euiFullHeight'}</code>}
          type="mixin"
          description={
            <>
              <p>
                Sass mixin for adding full height scrolling to a container or
                flex child.
              </p>
              <p>
                It applies{' '}
                <EuiCode language="sass">
                  height: 100%; overflow: hidden;
                </EuiCode>{' '}
                but also adds <EuiCode language="sass">flex: 1 1 auto;</EuiCode>{' '}
                for uses within <EuiCode language="sass">flex</EuiCode>{' '}
                containers.
              </p>
            </>
          }
          snippet="@include euiFullHeight;"
          snippetLanguage="sass"
        />
      )}
    </>
  );
};
