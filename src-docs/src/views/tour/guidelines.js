import React from 'react';
import { Link } from 'react-router-dom';

import { GuideRule, GuideRuleExample } from '../../components/';

import {
  EuiText,
  EuiSpacer,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiAspectRatio,
  EuiFlexGroup,
  EuiHorizontalRule,
} from '../../../../src/components';

import image1Do from '../../images/tour_1_do.svg';
import image1Dont from '../../images/tour_1_dont.svg';
import image6Example from '../../images/tour_6.gif';

const whenDescription = (
  <EuiText>
    <p>
      Use tours when you want users to learn about specific UI elements and how
      interacting with them will help them achieve a goal. When you want to help
      users perform an action but don’t want to provide step by step guidance,
      you can use empty states instead as seen in{' '}
      <Link to="/display/empty-prompt">
        <strong>EuiEmptyPrompt</strong>
      </Link>
      .
    </p>
    <p>
      For certain users, product tours can feel intrusive so first assess the
      fit for your use case and users. The goal is for the product tour to be a
      tool that helps the user learn new things and accomplish their goals.
      Three good scenarios for using a product tour are:
    </p>
  </EuiText>
);

export default () => (
  <>
    <EuiText grow={false}>
      <p>
        This page documents best practices for tour design including content,
        length and use cases.
      </p>
    </EuiText>

    <GuideRule heading="When to use tours" description={whenDescription}>
      <EuiFlexItem>
        <EuiText grow={false}>
          <ol>
            <li>New users seeing an interface for the first time</li>
            <li>Novice users trying to gain proficiency in your application</li>
            <li>
              Existing users need to be onboarded when new features or redesigns
              are released
            </li>
          </ol>
        </EuiText>
        <EuiSpacer />
        <EuiText grow={false}>
          Additionally, consider asking users if they’re interested in checking
          out your product tour instead of just showing it to them.
        </EuiText>
      </EuiFlexItem>
    </GuideRule>

    <GuideRule
      heading="Provide concise yet valuable information"
      description="If you include information that is too obvious or basic, it is more likely that the user will dismiss the product tour and start perceiving them as low value. If further explanation is needed, consider linking out to documentation."
    >
      <GuideRuleExample
        type="do"
        text="Keep the content of each step short while making sure to provide useful information."
      >
        <EuiImage
          alt="concise content in tour step"
          url={image1Do}
          height="252"
        />
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Use lengthy text that contains a lot of detail. Instead you can add a link for users to learn more."
      >
        <EuiImage
          alt="lengthy content in tour step"
          url={image1Dont}
          height="252"
        />
      </GuideRuleExample>
    </GuideRule>

    <EuiHorizontalRule />

    <GuideRule
      heading="Explain why the actions you want users to perform are useful"
      description="If users see value in an action they’ll be more likely to engage."
    />
    <EuiSpacer />
    <EuiAspectRatio width={2} height={1}>
      <iframe
        width="800"
        title="tour useful step"
        height="450"
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FRzfYLj2xmH9K7gQtbSKygn%2FElastic-UI%3Fnode-id%3D21976%253A315602"
      />
    </EuiAspectRatio>

    <GuideRule
      heading="Keep the tone conversational and friendly"
      description="Good copy is a key element for a product tour’s success. Make sure you work alongside a writer in this process.
      "
    />
    <EuiSpacer />
    <EuiAspectRatio width={2} height={1}>
      <iframe
        width="800"
        title="step with good copy"
        height="450"
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FRzfYLj2xmH9K7gQtbSKygn%2FElastic-UI%3Fnode-id%3D21976%253A315599"
      />
    </EuiAspectRatio>

    <GuideRule
      heading="Allow users to end and restart the tour at any time"
      description="You can include a “Skip tour” button in your step’s footer. Users might be quick to dismiss a tour but realize they need to use it later on. Give them the option to re-trigger the tour at any time. A good spot for a tour’s trigger is the application’s help menu."
    />
    <EuiSpacer />
    <EuiAspectRatio width={2} height={1}>
      <iframe
        width="800"
        height="450"
        title="skip tour button"
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FRzfYLj2xmH9K7gQtbSKygn%2FElastic-UI%3Fnode-id%3D21976%253A315575"
      />
    </EuiAspectRatio>

    <EuiHorizontalRule />

    <EuiFlexGroup>
      <EuiFlexItem>
        <GuideRule
          heading="Keep your tours short"
          description=" The more steps, the less likely it is that a user will complete a tour. If you need to decide which steps to drop, think of the ones the user is more likely to be able to figure out on their own."
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <GuideRule
          heading="Be careful when using action-driven tours"
          description="Tours where one step cannot be completed until the previous step has been completed can lead to the user feeling trapped. A nice detail when using this type of tours is to automatically take the user to the next step upon completion of the current step, instead of having to click on Next."
        />
      </EuiFlexItem>
      <EuiFlexItem>
        <GuideRule
          heading="Adjust your tour based on UX research"
          description="Once your tour goes live, monitor user behavior to learn about what’s working and identify drop-off points. Based on that, iterate on your tour."
        />
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="xl" />

    <EuiHorizontalRule />

    <GuideRule
      heading="Consider using animation gifs"
      description="A short, nicely crafted animation can be very effective for teaching a user about a feature."
    >
      <EuiFlexItem>
        <EuiPanel
          color="subdued"
          paddingSize="l"
          hasShadow={false}
          style={{ justifyContent: 'center', display: 'flex' }}
        >
          <EuiPanel
            style={{ maxWidth: 520, overflow: 'hidden' }}
            paddingSize="none"
            hasBorder
          >
            <EuiImage alt="skip tour button" url={image6Example} />
          </EuiPanel>
        </EuiPanel>
      </EuiFlexItem>
    </GuideRule>
    <EuiSpacer />
  </>
);
