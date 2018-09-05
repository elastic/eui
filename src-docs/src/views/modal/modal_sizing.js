import React, {
  Component,
  Fragment,
} from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiText,
  EuiTabbedContent,
  EuiTitle,
  EuiSpacer,
} from '../../../../src/components';

export class ModalSizing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      isSwitchChecked: true,
    };

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);

    this.tabs = [{
      id: 'drake',
      name: 'Drake',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle size="s"><h3>Introduction</h3></EuiTitle>
          <EuiSpacer />
          <EuiText>
            Drake is a common dragon type in popular culture. Owing to the complex history of Drake as
            both a word and a popular last name, some clarification is needed in regards to the Dragon
            Type of Drake.
          </EuiText>
          <EuiSpacer />
          <EuiTitle size="xxs"><h6>Physical Description</h6></EuiTitle>
          <EuiSpacer />
          <EuiText>
            The drake is a dragon with four limbs, much like a lizard, although usually far larger in
            size than the average lizard. A particularly potent example of a drake in the natural world is
            the Komodo Dragon, a large species of minotaur lizard in Indonesia.
          </EuiText>
        </Fragment>
      ),
    }, {
      id: 'seaserpent',
      name: 'Sea Serpent',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle size="s"><h3>Introduction</h3></EuiTitle>
          <EuiSpacer />
          <EuiText>
            Reported in all the oceans of the world, Sea Serpents have been known from ancient times. Sea
            Serpents live in both fresh and salt waters, [6] and they were the most feared creatures of
            the ocean with hundreds of reported sightings to inspire terror. People often reported
            sighting during the warmer months, and it is widely believed that Sea Serpents only appear in
            still, warm weather. However, reports of Sea Serpents in particularly cold waters and during
            storms indicate these creatures may appear at any time.
          </EuiText>
          <EuiSpacer />
          <EuiTitle size="xxs"><h6>Physical Description</h6></EuiTitle>
          <EuiSpacer />
          <EuiText>
            Sea Serpents range in size drastically, from 30 feet to 300 feet (9 m - 90 m) long with bodies
            ranging from 5 feet to 20 feet (1 m - 6 m) thick. They range in color from greyish to chocolate
            to black. Some sea serpents have a mane down their necks, similar to a horse; others have heads
            shaped like those of a horse and the mane presented resembles seaweed. Some reports claim that
            sea serpents have a single horn, approximately one foot (31 cm) in length shaped like a marlinspike.
            While many sightings of sea serpents claim they have serpentine bodies without limbs that end with
            a long, steering tail, there are just as many reports of sea serpents with webbed limbs, fins, or
            even wing-like appendages, likely used for steering in the water. While the description of
            individual Sea Serpents vary, there is one particular attribute that remains the same. They all have
            large eyes, usually blue or pewter in color.
          </EuiText>
        </Fragment>
      ),
    }, {
      id: 'wyvern',
      name: 'Wyvern',
      content: (
        <Fragment>
          <EuiSpacer />
          <EuiTitle size="s"><h3>Introduction</h3></EuiTitle>
          <EuiSpacer />
          <EuiText>
            Wyverns are highly aggressive and predatory creatures. They are found in the medieval bestiaries
            of Europe, noticeably those of England and France. Believed that a wyvern will destroy
            whatever it comes upon, they are considered malevolent and dangerous and slain on sight.
          </EuiText>
          <EuiSpacer />
          <EuiText>
            The Wyvern has the body of a serpent, the head of a dragon, the wings of a bat, and a long serpent tail.
          </EuiText>
        </Fragment>
      ),
    }];
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  }

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  render() {

    let modal;

    if (this.state.isModalVisible) {
      modal = (
        <EuiOverlayMask>
          <EuiModal
            onClose={this.closeModal}
            width={50}
            height={75}
            maxHeight="600px"
          >
            <EuiModalHeader>
              <EuiModalHeaderTitle >
                Basic dragon information
              </EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiTabbedContent
                tabs={this.tabs}
                initialSelectedTab={this.tabs[0]}
                onTabClick={(tab) => { console.log('clicked tab', tab); }}
              />
            </EuiModalBody>

            <EuiModalFooter>
              <EuiButtonEmpty
                onClick={this.closeModal}
              >
                Cancel
              </EuiButtonEmpty>

              <EuiButton
                onClick={this.closeModal}
                fill
              >
                Save
              </EuiButton>
            </EuiModalFooter>
          </EuiModal>
        </EuiOverlayMask>
      );
    }
    return (
      <div>
        <EuiButton onClick={this.showModal}>
          Show fixed size Modal
        </EuiButton>

        {modal}
      </div>
    );
  }
}
