import React, { Component } from 'react';

import {
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiButton,
  EuiText,
  EuiTitle,
  EuiCodeBlock,
} from '../../../../src/components';

export class Flyout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlyoutVisible: false,
      isSwitchChecked: true,
    };

    this.closeFlyout = this.closeFlyout.bind(this);
    this.showFlyout = this.showFlyout.bind(this);
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  closeFlyout() {
    this.setState({ isFlyoutVisible: false });
  }

  showFlyout() {
    this.setState({ isFlyoutVisible: true });
  }

  render() {
    let flyout;

    const htmlCode = `<EuiFlyout ...>
  <EuiFlyoutHeader hasBorder>
    <EuiTitle size="m">
      <h2></h2>
    </EuiTitle>
  </EuiFlyoutHeader>
  <EuiFlyoutBody>
    ...
  </EuiFlyoutBody>
</EuiFlyout>
`;

    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout onClose={this.closeFlyout} aria-labelledby="flyoutTitle">
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2 id="flyoutTitle">A typical flyout</h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>
                Far out in the uncharted backwaters of the unfashionable end of
                the western spiral arm of the Galaxy lies a small unregarded
                yellow sun.
              </p>

              <p>
                Orbiting this at a distance of roughly ninety-two million miles
                is an utterly insignificant little blue green planet whose ape-
                life forms are so amazingly primitive that they still think
                watches are a pretty neat idea.
              </p>

              <ul>
                <li>List item one</li>
                <li>List item two</li>
                <li>Dolphins</li>
              </ul>

              <p>
                This planet has - or rather had - a problem, which was this:
                most of the people living on it were unhappy for pretty much of
                the time. Many solutions were suggested for this problem, but
                most of these were largely concerned with the movements of small
                green pieces of paper, which is odd because on the whole it was
                not the small green pieces of paper that were unhappy.
              </p>

              <h2>This is Heading Two</h2>

              <ol>
                <li>Number one</li>
                <li>Number two</li>
                <li>Dolphins again</li>
              </ol>

              <p>
                But the dog wasn&rsquo;t lazy, it was just practicing
                mindfulness, so it had a greater sense of life-satisfaction than
                that fox with all its silly jumping.
              </p>

              <p>
                And from the fox&rsquo;s perspective, life was full of hoops to
                <em>through</em>, low-hanging fruit to jump <em>for</em>, and
                dead car batteries to jump-<em>start</em>.
              </p>

              <h3>This is Heading Three</h3>

              <p>
                So it thought the dog was making a poor life choice by focusing
                much on mindfulness. What if its car broke down?
              </p>
            </EuiText>
            <EuiCodeBlock language="html">{htmlCode}</EuiCodeBlock>
          </EuiFlyoutBody>
        </EuiFlyout>
      );
    }

    return (
      <div>
        <EuiButton onClick={this.showFlyout}>Show flyout</EuiButton>

        {flyout}
      </div>
    );
  }
}
