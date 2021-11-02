import React from 'react';
import { Link } from 'react-router-dom';

import { GuideRule, GuideRuleTitle, GuideRuleExample } from '../../components/';

import {
  EuiText,
  EuiButton,
  EuiButtonIcon,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonEmpty,
  EuiIcon,
  EuiImage,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell,
  EuiPanel,
} from '../../../../src/components';

import ContextMenu from '../context_menu/small';

import image1Do from '../../images/tour_1_do.svg';
import image1Dont from '../../images/tour_1_dont.svg';
import image2Example from '../../images/tour_2_action.png';
import imageButtonTypesBad from '../../images/button_types_bad.svg';
import imageButtonTypes from '../../images/button_types.svg';

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
        text="Use lenghty text that contains a lot of detail. Instead you can add a link for users to learn more."
      >
        <EuiImage
          alt="lengthy content in tour step"
          url={image1Dont}
          height="252"
        />
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Explain why the actions you want users to perform are useful"
      description="If users see value in an action they’ll be more likely to engage."
    >
      <EuiFlexItem>
        <EuiPanel
          color="subdued"
          paddingSize="l"
          hasShadow={false}
          style={{ justifyContent: 'center', display: 'flex' }}
        >
          <EuiPanel style={{ maxWidth: 520 }} paddingSize="s">
            <EuiImage alt="tour useful step" url={image2Example} />
          </EuiPanel>
        </EuiPanel>
      </EuiFlexItem>
    </GuideRule>

    <GuideRule
      heading="Keep the tone conversational and friendly"
      description="Good copy is a key element for a product tour’s success. Make sure you work alongside a writer in this process.
      "
    >
      <EuiFlexItem>
        <EuiPanel
          color="subdued"
          paddingSize="l"
          hasShadow={false}
          style={{ justifyContent: 'center', display: 'flex' }}
        >
          <EuiPanel style={{ maxWidth: 520 }} paddingSize="s">
            <EuiImage alt="tour useful step" url={image2Example} />
          </EuiPanel>
        </EuiPanel>
      </EuiFlexItem>
    </GuideRule>

    <GuideRule
      heading="Minimize the mixing of color, size, and type"
      description="When in doubt, use a blue button in the default size and never put more than two
      visual styles next to each other."
    >
      <GuideRuleExample
        panelColor="subdued"
        type="do"
        text="Stick to the default pattern: a filled, primary button paired with
          an empty, but same-colored button."
      >
        <div>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiButton fill>Save</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty>Cancel</EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </GuideRuleExample>
      <GuideRuleExample
        panelColor="subdued"
        type="dont"
        text="Readability suffers when multiple colors and sizes are used."
      >
        <div>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiButton fill>Save</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton>Cancel</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton color="danger" fill size="s">
                Delete
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>
      Icons in buttons either stand on their own or add context
    </GuideRuleTitle>

    <GuideRule
      description="Icon buttons can save space.
        Limit icon buttons to groups of two, otherwise they lose meaning."
    >
      <GuideRuleExample
        panelColor="subdued"
        type="do"
        text="Use icon buttons for universal actions that are easy to understand."
      >
        <div>
          <EuiButtonIcon size="s" iconType="pencil" aria-label="Edit" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <EuiButtonIcon size="s" iconType="expand" aria-label="Expand" />
        </div>
      </GuideRuleExample>
      <GuideRuleExample
        panelColor="subdued"
        type="dont"
        text="Icons alone in a standard button defeats the purpose of saving space."
      >
        <div>
          <EuiButton>
            <EuiIcon type="pencil" aria-label="Edit" />
          </EuiButton>
          &nbsp;&nbsp;
          <EuiButton>
            <EuiIcon type="expand" aria-label="Expand" />
          </EuiButton>
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      description="Icons can serve as a scanning aid in a text label, but keep to a minimum.
        Icons work best on labels for binary actions, for example, Create and Delete, and final actions, such as Save."
    >
      <GuideRuleExample
        panelColor="subdued"
        type="do"
        text='Use icons to emphasize actions. The arrow on the Continue
          button lets users know they still have more items to fill out.
          Using the word "complete" with a rare check icon helps users
          understand that this is the final action.'
      >
        <div>
          <EuiButton iconType="arrowRight" iconSide="right" fill>
            Continue
          </EuiButton>
          &nbsp;&nbsp;
          <EuiButton iconType="check" color="secondary" fill>
            Save and complete
          </EuiButton>
        </div>
      </GuideRuleExample>
      <GuideRuleExample
        panelColor="subdued"
        type="dont"
        text="Unnecessary icons often distract from the text.
          This is especially true when the icon is positioned on the right,
          with a hard to interpret icon."
      >
        <EuiButton iconType="indexOpen" iconSide="right" fill>
          Create index pattern
        </EuiButton>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Stack action sets into one button</GuideRuleTitle>

    <GuideRule
      description="Two buttons are optimal for a side-by-side layout, three is rare.
      For more buttons, use a dropdown or context menu."
    >
      <GuideRuleExample
        panelColor="subdued"
        type="do"
        text="Put multiple actions inside a menu triggered by a single rather than showing them separately."
      >
        <ContextMenu />
      </GuideRuleExample>

      <GuideRuleExample
        panelColor="subdued"
        type="dont"
        text="When there are many buttons, none matter."
      >
        <div>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiButton iconType="copy">Copy</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton iconType="pencil">Edit</EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton iconType="share">Share</EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Labels that say what the button does</GuideRuleTitle>

    <EuiText grow={false}>
      <p>
        Labels should provide a clear indication of that action that occurs when
        the user clicks the button. Prefer action words, and include an object
        when it is not clear from the context, for example, Add dashboard.
        Labels should be three words or fewer. If your label requires more
        words, consider using a text link instead.
      </p>

      <h3>Preferred words in buttons</h3>
    </EuiText>

    <EuiSpacer />

    <EuiTable>
      <EuiTableHeader>
        <EuiTableHeaderCell>Text</EuiTableHeaderCell>

        <EuiTableHeaderCell>Description</EuiTableHeaderCell>
      </EuiTableHeader>

      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>
            <EuiButton>Add thing</EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Establishes a new relationship. Often used in a create-then-add
            scenario. You create a dashboard, then add a visualization. Always
            followed by an object. Do not use &quot;Add new.&quot; Remove is the
            correct opposite.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>
            <EuiButtonEmpty size="s">Cancel</EuiButtonEmpty>
          </EuiTableRowCell>
          <EuiTableRowCell>
            Stops an action without saving pending changes. Never make Cancel
            red&mdash;it&apos;s not a destructive action. Cancel is always an
            empty button.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>
            <EuiButton fill>Create thing</EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Creates a new object from scratch. Always followed by an object, for
            example, “Create pipeline.” Do not use &quot;Create new.&quot;
            Exception: “Add user” is more intuitive than “Create user.” Delete
            is the correct opposite.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>
            <EuiButton color="danger" fill>
              Delete
            </EuiButton>
            &nbsp;&nbsp;
            <EuiButton color="danger" fill>
              Delete 6 things
            </EuiButton>
            &nbsp;&nbsp;
            <EuiButtonIcon
              size="s"
              color="danger"
              iconType="trash"
              aria-label="delete"
            />
          </EuiTableRowCell>

          <EuiTableRowCell>
            Deletes data so users can longer retrieve it. Create is the correct
            opposite. Do not confuse with Remove.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>
            <EuiButton color="danger">Remove</EuiButton>&nbsp;&nbsp;
            <EuiButtonIcon
              size="s"
              color="danger"
              iconType="cross"
              aria-label="Remove"
            />
          </EuiTableRowCell>
          <EuiTableRowCell>
            Removes a relationship, but doesn&apos;t permanently delete data.
            For example, you remove a visualization from a dashboard. Add is the
            correct opposite.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell isMobileFullWidth>
            <EuiButton fill>Save</EuiButton>&nbsp;&nbsp;
            <EuiButton fill color="secondary" iconType="check">
              Save and complete
            </EuiButton>
          </EuiTableRowCell>
          <EuiTableRowCell>
            Carries out pending changes, for example, Save edits. Do not confuse
            with Add. Can use green if this button is the final save action.
          </EuiTableRowCell>
        </EuiTableRow>
      </EuiTableBody>
    </EuiTable>

    <EuiSpacer size="xl" />

    <EuiText>
      <h3>Avoid these words in buttons</h3>
    </EuiText>

    <EuiSpacer />

    <EuiTable responsive={false}>
      <EuiTableHeader>
        <EuiTableHeaderCell>Text</EuiTableHeaderCell>

        <EuiTableHeaderCell>Use this instead</EuiTableHeaderCell>
      </EuiTableHeader>
      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton color="danger">Discard</EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>Remove or Delete</EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton>New</EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>Add or Create</EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton>OK</EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>Words that explain the action</EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton>Yes?</EuiButton>&nbsp;&nbsp;
            <EuiButton color="danger">No?</EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>Words that explain the action</EuiTableRowCell>
        </EuiTableRow>
      </EuiTableBody>
    </EuiTable>
  </>
);
