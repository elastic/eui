import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  EuiFlexItem,
  EuiCode,
  EuiCodeBlock,
  EuiFlexGrid,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '../../../../../src';
import { ThemeContext } from '../../../components/with_theme';

const euiShadows = [
  'euiBottomShadowFlat',
  'euiSlightShadow',
  'euiBottomShadowSmall',
  'euiBottomShadowMedium',
  'euiBottomShadow',
  'euiBottomShadowLarge',
];

function renderShadow(shadow: string) {
  return (
    <div
      key={shadow}
      className={`guideSass__shadow guideSass__shadow--${shadow}`}
    >
      <EuiCodeBlock language="scss" paddingSize="none" transparentBackground>
        @include {shadow};
      </EuiCodeBlock>
    </div>
  );
}

const MixinLink = () => {
  const themeContext = useContext(ThemeContext);
  let url;
  switch (themeContext.theme) {
    case 'light':
    case 'dark':
      url =
        'https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_shadow.scss';
      break;
    default:
      url =
        'https://github.com/elastic/eui/blob/master/src/themes/eui-amsterdam/global_styling/mixins/_shadow.scss';
  }

  return (
    <p>
      <EuiLink href={url}>View the Sass code for shadow mixins</EuiLink>.
    </p>
  );
};

export const Shadow = () => {
  return (
    <>
      <EuiText>
        <MixinLink />
      </EuiText>
      <EuiSpacer />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Use mixins for shadows</h3>
          </EuiTitle>

          <EuiSpacer />

          {euiShadows.map(function (shadow) {
            return renderShadow(shadow);
          })}

          <EuiSpacer />

          <EuiTitle size="s">
            <h3>Adding color to shadows</h3>
          </EuiTitle>

          <EuiText>
            <p>Most shadow mixins can also accept color.</p>
          </EuiText>

          <EuiSpacer />

          <div className="guideSass__shadow guideSass__shadow--color eui-textBreakAll">
            <EuiCodeBlock
              language="scss"
              paddingSize="none"
              transparentBackground
            >
              @include euiBottomShadowLarge(desaturate($euiColorPrimary, 30%));
            </EuiCodeBlock>
          </div>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h3>Shadows to create graceful overflows</h3>
          </EuiTitle>

          <EuiText>
            <p>
              Primarily used in modals and flyouts, the overflow shadow masks
              the edges to indicate there is more content.
            </p>
          </EuiText>

          <EuiSpacer />

          <EuiTitle size="xs">
            <h4>
              Vertical scrolling with <EuiCode>euiYScrollWithShadows</EuiCode>
            </h4>
          </EuiTitle>

          <EuiSpacer size="s" />

          <EuiPanel paddingSize="none" grow={false}>
            <div className="guideSass__overflowShadows">
              <EuiText className="guideSass__overflowShadowText" size="s">
                <p>
                  It requires a wrapping element to control the height with{' '}
                  <EuiCode>overflow-y: hidden;</EuiCode> and the content to
                  <EuiCode>@include euiYScrollWithShadows;</EuiCode> or use the{' '}
                  <Link to="/utilities/css-utility-classes">
                    CSS utility class
                  </Link>{' '}
                  <EuiCode>.eui-yScrollWithShadows</EuiCode>.
                </p>
                <p>
                  <b>Example:</b>
                </p>
                <EuiCodeBlock language="sass" isCopyable paddingSize="s">
                  {`.overflowY {
height: 200px;
overflow-y: hidden;

.overflowY__content {
@include euiYScrollWithShadows;
}
}`}
                </EuiCodeBlock>
                <p>
                  Consequuntur atque nulla atque nemo tenetur numquam. Assumenda
                  aspernatur qui aut sit. Aliquam doloribus iure sint id.
                  Possimus dolor qui soluta cum id tempore ea illum. Facilis
                  voluptatem aut aut ut similique ut. Sed repellendus commodi
                  iure officiis exercitationem praesentium dolor. Ratione non ut
                  nulla accusamus et. Optio laboriosam id incidunt. Ipsam
                  voluptate ab quia necessitatibus sequi earum voluptate. Porro
                  tempore et veritatis quo omnis. Eaque ut libero tempore sit
                  placeat maxime laudantium. Mollitia tempore minus qui autem
                  modi adipisci ad. Iste reprehenderit accusamus voluptatem
                  velit. Quidem delectus eos veritatis et vitae et nisi.
                  Doloribus ut corrupti voluptates qui exercitationem dolores.
                </p>
              </EuiText>
            </div>
          </EuiPanel>

          <EuiSpacer />

          <EuiTitle size="xs">
            <h4>
              Horizontal scrolling with <EuiCode>euiXScrollWithShadows</EuiCode>
            </h4>
          </EuiTitle>

          <EuiSpacer size="s" />

          <EuiPanel paddingSize="none" grow={false}>
            <div className="guideSass__overflowShadowsX">
              <EuiText className="guideSass__overflowShadowTextX" size="s">
                <p>
                  You may want to add at least <EuiCode>$euiSizeS</EuiCode>
                  &apos;s worth of padding to the sides of your content so the
                  mask doesn&apos;t overlay it.
                </p>
                <p>
                  <b>Example:</b>
                </p>
                <EuiCodeBlock language="sass" isCopyable paddingSize="s">
                  {`.overflowXContent {
@include euiXScrollWithShadows;
padding-left: $euiSizeS;
padding-right: $euiSizeS;
}`}
                </EuiCodeBlock>
              </EuiText>
            </div>
          </EuiPanel>
          <EuiSpacer size="xl" />
          <EuiText>
            <p>
              If you need to further customize the position or side of the
              overflow shadow use the <EuiCode>euiOverflowShadow</EuiCode>{' '}
              <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_shadow.scss">
                mixin
              </EuiLink>
              .
            </p>
          </EuiText>
        </EuiFlexItem>
      </EuiFlexGrid>
    </>
  );
};
