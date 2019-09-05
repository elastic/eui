import React, { Component } from 'react';

import {
  EuiButton,
  EuiControlBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
} from '../../../../src/components';
import { EuiFocusTrap } from '../../../../src/components/focus_trap';
import { keyCodes } from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentIsVisible: false,
      isFullScreen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({
      contentIsVisible: !prevState.contentIsVisible,
    }));
  }

  toggleFullScreen() {
    this.setState(prevState => ({
      isFullScreen: !prevState.isFullScreen,
      contentIsVisible: false,
    }));
  }

  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        isFullScreen: false,
        contentIsVisible: false,
      });
    }
  };

  render() {
    const codeControls = [
      {
        id: 'root_icon',
        label: 'Project Root',
        controlType: 'icon',
        iconType: 'submodule',
      },
      {
        id: 'current_file_path',
        label: 'breadcrumbs',
        controlType: 'breadcrumbs',
        responsive: true,
        breadcrumbs: [
          {
            text: 'src',
          },
          {
            text: 'components',
          },
        ],
      },
      {
        controlType: 'spacer',
      },
      {
        id: 'status_icon',
        label: 'Repo Status',
        controlType: 'icon',
        iconType: 'alert',
        color: 'warning',
      },
      {
        controlType: 'divider',
      },
      {
        id: 'branch_icon',
        label: 'Branch Icon',
        iconType: 'branch',
        controlType: 'icon',
      },
      {
        id: 'branch_name',
        label: 'some_long_bran',
        controlType: 'text',
      },
      {
        controlType: 'divider',
      },
      {
        id: 'github_icon',
        label: 'Open in Github',
        controlType: 'icon',
        iconType: 'logoGithub',
      },
      {
        controlType: 'divider',
      },
      {
        id: 'open_code_view',
        label: 'Code',
        controlType: 'button',
      },
      {
        id: 'open_blame_view',
        label: 'Blame',
        controlType: 'button',
      },
      {
        id: 'open_history_view',
        label: 'History',
        controlType: 'button',
      },
    ];

    let fullScreenDisplay;

    // const controlBar = (
    //   <EuiControlBar
    //     controls={codeControls}
    //     showContent={this.state.contentIsVisible}
    //     style={!this.state.isFullScreen ? { position: 'absolute' } : null}>
    //     <div style={{ padding: '1rem' }}>
    //       {this.state.tabContent !== '' ? (
    //         <EuiText>{this.state.tabContent}</EuiText>
    //       ) : (
    //         <p>Look at me</p>
    //       )}
    //     </div>
    //   </EuiControlBar>
    // );

    if (this.state.isFullScreen) {
      fullScreenDisplay = (
        <EuiFocusTrap>
          <div
            className="guideDemo__pageOverlay"
            style={{
              padding: '2rem',
              zIndex: '20000',
            }}
            onKeyDown={this.onKeyDown}>
            <EuiFlexGroup>
              <EuiButton onClick={this.toggle.bind(this)}>
                Toggle Content Drawer
              </EuiButton>
              <EuiFlexItem grow />
              <EuiButton onClick={this.toggleFullScreen.bind(this)}>
                Close
              </EuiButton>
            </EuiFlexGroup>
            <EuiControlBar
              controls={codeControls}
              showContent={this.state.contentIsVisible}>
              <EuiPanel style={{ maxWidth: '60rem', margin: '2rem auto' }}>
                <EuiText>
                  <h1>1984</h1>
                  <h3>By: George Orwell</h3>
                  <p>
                    It was a bright cold day in April, and the clocks were
                    striking thirteen. Winston Smith, his chin nuzzled into his
                    breast in an effort to escape the vile wind, slipped quickly
                    through the glass doors of Victory Mansions, though not
                    quickly enough to prevent a swirl of gritty dust from
                    entering along with him.
                  </p>
                  <p>
                    The hallway smelt of boiled cabbage and old rag mats. At one
                    end of it a coloured poster, too large for indoor display,
                    had been tacked to the wall. It depicted simply an enormous
                    face, more than a metre wide: the face of a man of about
                    forty-five, with a heavy black moustache and ruggedly
                    handsome features. Winston made for the stairs. It was no
                    use trying the lift. Even at the best of times it was seldom
                    working, and at present the electric current was cut off
                    during daylight hours. It was part of the economy drive in
                    preparation for Hate Week. The flat was seven flights up,
                    and Winston, who was thirty-nine and had a varicose ulcer
                    above his right ankle, went slowly, resting several times on
                    the way. On each landing, opposite the lift-shaft, the
                    poster with the enormous face gazed from the wall. It was
                    one of those pictures which are so contrived that the eyes
                    follow you about when you move. BIG BROTHER IS WATCHING YOU,
                    the caption beneath it ran.
                  </p>
                  <p>
                    Inside the flat a fruity voice was reading out a list of
                    figures which had something to do with the production of
                    pig-iron. The voice came from an oblong metal plaque like a
                    dulled mirror which formed part of the surface of the
                    right-hand wall. Winston turned a switch and the voice sank
                    somewhat, though the words were still distinguishable. The
                    instrument (the telescreen, it was called) could be dimmed,
                    but there was no way of shutting it off completely. He moved
                    over to the window: a smallish, frail figure, the meagreness
                    of his body merely emphasized by the blue overalls which
                    were the uniform of the party. His hair was very fair, his
                    face naturally sanguine, his skin roughened by coarse soap
                    and blunt razor blades and the cold of the winter that had
                    just ended.
                  </p>
                </EuiText>
              </EuiPanel>
            </EuiControlBar>
          </div>
        </EuiFocusTrap>
      );
    }

    return (
      <div>
        <EuiButton onClick={this.toggleFullScreen.bind(this)}>
          View in Full Screen
        </EuiButton>
        {fullScreenDisplay}
      </div>
    );
  }
}
