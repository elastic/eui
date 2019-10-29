import React, { Component } from 'react';

import {
  EuiButton,
  EuiControlBar,
  EuiPanel,
  EuiText,
} from '../../../../src/components';
import { keyCodes } from '../../../../src/services';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentIsVisible: false,
      isDisplaying: false,
    };
  }

  toggleContent = () => {
    this.setState(prevState => ({
      contentIsVisible: !prevState.contentIsVisible,
    }));
  };

  toggleDisplay = () => {
    this.setState(prevState => ({
      isDisplaying: !prevState.isDisplaying,
      contentIsVisible: false,
    }));
  };

  onKeyDown = event => {
    if (event.keyCode === keyCodes.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        isDisplaying: false,
        contentIsVisible: false,
      });
    }
  };

  render() {
    const codeControls = [
      {
        controlType: 'icon',
        id: 'root_icon',
        iconType: 'submodule',
        'aria-label': 'Project Root',
      },
      {
        controlType: 'breadcrumbs',
        id: 'current_file_path',
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
        controlType: 'icon',
        id: 'status_icon',
        iconType: 'alert',
        color: 'warning',
        'aria-label': 'Repo Status',
      },
      {
        controlType: 'divider',
      },
      {
        controlType: 'icon',
        id: 'branch_icon',
        iconType: 'branch',
        'aria-label': 'Branch Icon',
      },
      {
        controlType: 'text',
        id: 'branch_name',
        text: 'some_long_branch',
      },
      {
        controlType: 'divider',
      },
      {
        controlType: 'icon',
        id: 'github_icon',
        iconType: 'logoGithub',
        onClick: () => {},
        title: 'Open in Github',
        'aria-label': 'Open in Github',
      },
      {
        controlType: 'divider',
      },
      {
        controlType: 'button',
        id: 'open_history_view',
        label: this.state.contentIsVisible ? 'Hide history' : 'Show history',
        color: 'primary',
        onClick: this.toggleContent,
      },
    ];

    let display;

    if (this.state.isDisplaying) {
      display = (
        <EuiControlBar
          controls={codeControls}
          showContent={this.state.contentIsVisible}>
          <div style={{ padding: '2rem', maxWidth: '60rem', margin: '0 auto' }}>
            <EuiPanel>
              <EuiText>
                <h1>1984</h1>
                <h3>By: George Orwell</h3>
                <p>
                  It was a bright cold day in April, and the clocks were
                  striking thirteen. Winston Smith, his chin nuzzled into his
                  breast in an effort to escape the vile wind, slipped quickly
                  through the glass doors of Victory Mansions, though not
                  quickly enough to prevent a swirl of gritty dust from entering
                  along with him.
                </p>
                <p>
                  The hallway smelt of boiled cabbage and old rag mats. At one
                  end of it a coloured poster, too large for indoor display, had
                  been tacked to the wall. It depicted simply an enormous face,
                  more than a metre wide: the face of a man of about forty-five,
                  with a heavy black moustache and ruggedly handsome features.
                  Winston made for the stairs. It was no use trying the lift.
                  Even at the best of times it was seldom working, and at
                  present the electric current was cut off during daylight
                  hours. It was part of the economy drive in preparation for
                  Hate Week. The flat was seven flights up, and Winston, who was
                  thirty-nine and had a varicose ulcer above his right ankle,
                  went slowly, resting several times on the way. On each
                  landing, opposite the lift-shaft, the poster with the enormous
                  face gazed from the wall. It was one of those pictures which
                  are so contrived that the eyes follow you about when you move.
                  BIG BROTHER IS WATCHING YOU, the caption beneath it ran.
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
                  of his body merely emphasized by the blue overalls which were
                  the uniform of the party. His hair was very fair, his face
                  naturally sanguine, his skin roughened by coarse soap and
                  blunt razor blades and the cold of the winter that had just
                  ended.
                </p>
              </EuiText>
            </EuiPanel>
          </div>
        </EuiControlBar>
      );
    }

    return (
      <div>
        <EuiButton onClick={this.toggleDisplay}>Toggle example</EuiButton>
        {display}
      </div>
    );
  }
}
