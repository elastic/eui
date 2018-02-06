import React from 'react';
import classNames from 'classnames';

import {
  GuidePage,
  GuideRule,
  GuideRuleExample,
  GuideRuleTitle,
} from '../../components';

import {
  EuiText,
  EuiTitle,
  EuiButton,
  EuiButtonIcon,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiFieldSearch,
  EuiFieldText,
  EuiButtonEmpty,
  EuiFieldPassword,
  EuiCheckbox,
  EuiFormRow,
  EuiConfirmModal,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiIcon,
  EuiImage,
  EuiFieldNumber,
  EuiLink,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

const GuideRuleWriting = ({
  children,
  className,
  ...rest,
}) => {
  const classes = classNames(className);

  return (
    <EuiText
      className={classes}
      {...rest}
    >
      <p>{children}</p>
    </EuiText>
  );
};

export default () => (
  <GuidePage title="Button">
    <EuiText>
      <h1>Button</h1>
      <p>
      Choosing a button style and type depends on the prominence of the action it performs and the context in which the button appears.
      </p>
      <EuiLink
        href="https://elastic.github.io/eui/#/button"
        target="_blank"
      >
          Go to code example
      </EuiLink>
    </EuiText>

    <EuiSpacer size="xxl"/>
    <EuiText>
      <h2>Button types</h2>
    </EuiText>
    <EuiSpacer size="l" />

    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ maxWidth: 300 }}>
        <div>
          <EuiButton fill>
          Filled
          </EuiButton>
        </div>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiText>
          <h4><strong>Filled buttons are for the primary action</strong></h4>
          <p>This button has the heavist visual weight to draw users&apos; attention.
          </p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ maxWidth: 300 }}>
        <div>
          <EuiButton>
            Standard
          </EuiButton>
        </div>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiText>
          <h4><strong>Standard buttons are for secondary actions</strong></h4>
          <p>Such actions include Add and Save. This button type works well for multiple actions of equal weight.
          </p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />


    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ maxWidth: 300 }}>
        <div>

          <EuiButtonEmpty>
          Empty
          </EuiButtonEmpty>
        </div>

      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiText>
          <h4><strong>Empty buttons are for UI-specific actions</strong></h4>
          <p>Close, cancel, filter, refresh, and other actions that reconfigure the UI are appropriate for empty buttons.
          </p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />


    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ maxWidth: 300 }}>
        <div>

          <EuiButtonIcon
            size="s"
            color="danger"
            onClick={() => window.alert('Button clicked')}
            iconType="trash"
            aria-label="Next"
          />
        </div>

      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }}>
        <EuiText>
          <h4><strong>Icon buttons are for saving space</strong></h4>
          <p>The icon must be immediately understood, for example, a trash can for delete. Use these buttons sparingly, and never for the primary action.
          </p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>







    <EuiSpacer size="xxl"/>
    <EuiText>
      <h2>Placement and order</h2>
      <p>Button placement and order should follow the users path through the content.</p>
    </EuiText>

    <GuideRule
      heading="Modals"
      description="In modals, the user path is top to bottom, left to right, in a Z-shaped pattern.  Placing the primary action on the bottom right puts it right where users finish scanning."
    >

      <GuideRuleExample  type="do" text="Do. The primary action is on the right with the secondary action on its left. Cancel is always an empty button.">
        <EuiModal style={{ width: '400px' }} onClose={() => {}}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              Save dashboard
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiFormRow
              label="Title"
            >
              <EuiFieldText />
            </EuiFormRow>
            <EuiFormRow
              label="Description"
            >
              <EuiFieldText />
            </EuiFormRow>
            <EuiFormRow>
              <EuiCheckbox
                onChange={() => {}}
                id={makeId()}
                label="Save as new dashboard"
              />
            </EuiFormRow>
            <EuiModalFooter>
              <EuiButtonEmpty>
              Cancel
              </EuiButtonEmpty>

              <EuiButton
                fill
              >
                Save
              </EuiButton>

            </EuiModalFooter>

          </EuiModalBody>
        </EuiModal>

      </GuideRuleExample>

      <GuideRuleExample type="do" text="Do. Confirmation modals are opinionated&mdash;button placement, order, and type are built-in so you don't have to worry about them.">
        <EuiConfirmModal
          title="Delete this report?"
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onClose={() => {}}
          style={{ width: '350px' }}
        >
          <p>You cannot recover a deleted report.</p>
        </EuiConfirmModal>
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer />

    <GuideRule heading="Forms" description="In forms, content is typically concentrated on the top and left.  The user path is top to bottom, in an F-shaped pattern. A primary action on the bottom left is easiest for users to reach.">
      <GuideRuleExample type="do" text="Do. Because the users' eye never leaves the left side, put the primary action on the bottom left.  If present, a secondary action is on its right.">
        <EuiImage
          size="l"
          hasShadow
          allowFullScreen
          fullScreenIconColor="dark"
          alt="page without primary button"
          url="https://imgur.com/90QdVT9.jpg"
          caption="Caption"
        />
      </GuideRuleExample>

      <GuideRuleExample type="dont" text="Don't force users to move to right to get to the primary action.">
        <EuiImage
          size="l"
          hasShadow
          allowFullScreen
          alt="page without primary button"
          url="https://imgur.com/aiPlqks.jpg"
        />
      </GuideRuleExample>

    </GuideRule>


    <GuideRule heading="Elsewhere in the UI" description="Button placement in other containers should fit the content and context, while staying consistent with the application. ">

      <GuideRuleExample type="do" text="Do. If the action is against the title of the page, place the primary button in the upper right.">
        <EuiImage
          size="l"
          hasShadow
          allowFullScreen
          fullScreenIconColor="dark"
          alt="page without primary button"
          url="https://imgur.com/XK9Ei8A.jpg"
        />
      </GuideRuleExample>

      <GuideRuleExample type="do" text="Do. Center-aligned is becoming more popular, as in an empty state.">
        <EuiImage
          size="l"
          hasShadow
          allowFullScreen
          alt="page without primary button"
          url="https://imgur.com/eVIWhUN.jpg"
        />
      </GuideRuleExample>

    </GuideRule>

    <EuiSpacer size="xxl"/>
    <EuiText>
      <h2>Primary button: One per container</h2>
      <p>The primary action should not have to compete for attention. Use only one primary button per page, form, or modal.</p>

    </EuiText>
    <EuiSpacer />

    <GuideRule>
      <GuideRuleExample type="do" text="&quot;Create index pattern&quot; is the primary action. &quot;All index patterns&quot; is also a button, but its an empty button. It controls the UI and doesn't save any data.">
        <EuiImage
          size="l"
          hasShadow
          allowFullScreen
          alt="page without primary button"
          url="https://imgur.com/5diUfSX.jpg"
        />
      </GuideRuleExample>
      <GuideRuleExample type="do" text="Some pages don&apos;t need a primary action to draw user attention. The &quot;Make default index&quot; button is an action that the user doesn't click often, but it's still a prmary action for this page. It's just not filled in.">
        <EuiImage
          size="l"
          hasShadow
          allowFullScreen
          alt="page without primary button"
          url="https://imgur.com/Vkrj67k.jpg"
        />
        <EuiSpacer />
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer size="xxl"/>



    <EuiText>
      <h2>Icons: Must be recognized at a glance</h2>
      <p>Icon buttons can save space.  Limit icon buttons to groups of two&mdash;otherwise they lose meaning. See the&nbsp;
        <EuiLink
          href="https://elastic.github.io/eui/#/icon"
          target="_blank"
        >
            &nbsp;&nbsp;icon respository
        </EuiLink>

        for icons with common meanings.
      </p>

    </EuiText>
    <EuiSpacer />

    <GuideRule
      heading=""
      description=""
    >
      <GuideRuleExample type="do" text="Do. These icons for edit and expand from the EUI repository are easily recognizable">
        <EuiButtonIcon
          size="s"
          iconType="pencil"
          aria-label="Next"
        />&nbsp;&nbsp;&nbsp;&nbsp;
        <EuiButtonIcon
          size="s"
          iconType="expand"
          aria-label="Next"
        />
      </GuideRuleExample>
      <GuideRuleExample type="dont" text="Don't use icons alone in a standard button. It defeats the purpose of saving space.">
        <EuiButton>
          <EuiIcon
            type="pencil"
          />
        </EuiButton>&nbsp;&nbsp;&nbsp;&nbsp;
        <EuiButton >
          <EuiIcon
            type="expand"
          />
        </EuiButton>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading=""
      description="Icons can serve as a scanning aid in a text label, but keep to a minimum. Icons work best on labels for binary actions (for example, Create and Delete) and final actions (Save)."
    >
      <GuideRuleExample type="do" text="Do. Icons on the left of a label facilitate scanning">

        <EuiButton >
          <EuiIcon
            type="plusInCircle"
          />
              &nbsp;Create
        </EuiButton>&nbsp;&nbsp;&nbsp;

        <EuiButton >
          <EuiIcon
            type="trash"
          />
                &nbsp;Delete
        </EuiButton>&nbsp;&nbsp;&nbsp;

        <EuiButton >
          <EuiIcon
            type="check"
          />
                  &nbsp;Save and close
        </EuiButton>&nbsp;&nbsp;&nbsp;

      </GuideRuleExample>
      <GuideRuleExample type="dont" text="Don't. Icons on the right of the label serve only as decoration">


        <EuiButton >&nbsp;&nbsp;

                  Create&nbsp;&nbsp;
          <EuiIcon
            type="plusInCircle"
          />
        </EuiButton>&nbsp;&nbsp;
        <EuiButton >

                  Delete&nbsp;&nbsp;
          <EuiIcon
            type="trash"
          />
        </EuiButton>&nbsp;&nbsp;
        <EuiButton >

                Save and close&nbsp;&nbsp;
          <EuiIcon
            type="check"
          />
        </EuiButton>&nbsp;&nbsp;

      </GuideRuleExample>
    </GuideRule>


    <EuiSpacer size="l"/>
    <EuiText>
      <h2>Color: Use sparingly</h2>
      <p>The button color defaults to blue.  Limit color changes to well-established use cases&mdash;green for final save actions and red for delete. </p>

    </EuiText>
    <EuiSpacer />

    <GuideRule>
      <GuideRuleExample type="do" text="Do. Green is an appropriate color for a final save action">
        <EuiButtonEmpty
          size="s"
        >
        Cancel
        </EuiButtonEmpty>&nbsp;&nbsp;
        <EuiButton
          color="secondary"
        >
          Save and close
        </EuiButton>
        <EuiSpacer />
      </GuideRuleExample>
      <GuideRuleExample type="dont" text="Don't. Readability suffers with more than two colors">
        <EuiButtonEmpty >
          Cancel
        </EuiButtonEmpty>
        <EuiButton
          size="s"
          color="secondary"
        >
        Save
        </EuiButton>&nbsp;&nbsp;
        <EuiButton
          color="danger"
        >
          Delete
        </EuiButton>
      </GuideRuleExample>
    </GuideRule>

    <EuiSpacer size="l"/>
    <EuiText>
      <h2>Multiple buttons</h2>
      <p>When using multiple buttons, two is optimal, three is rare. For more buttons, use a dropdown or context menu.</p>

    </EuiText>
    <EuiSpacer />

    <EuiSpacer size="l"/>

    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ maxWidth: 300 }}>
        <GuideRule>
          <GuideRuleExample type="do" text="Do. This example puts multiple actions in one button rather than splitting them out">
            <EuiImage
              size="l"
              hasShadow
              alt="Accessible image alt goes here"
              url="https://imgur.com/54NmOzh.jpg"
            />
          </GuideRuleExample>
        </GuideRule>
      </EuiFlexItem>

      <EuiFlexItem style={{ minWidth: 300 }} />
    </EuiFlexGroup>


    <EuiSpacer size="l"/>
    <EuiText>
      <h2>Label: Say what it does</h2>
      <p>Labels should provide a clear indication of what happens when the user clicks the button. Prefer action words and use in a consistent manner.</p>

    </EuiText>
    <EuiSpacer size="l"/>

    <EuiTable>
      <EuiTableHeader>
        <EuiTableHeaderCell>
        Label
        </EuiTableHeaderCell>

        <EuiTableHeaderCell>
        Description
        </EuiTableHeaderCell>
      </EuiTableHeader>

      <EuiTableBody>
        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton size="s">
            Add
            </EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>
        Adds an object to a list or database.   Always followed by a noun, for example, Add visualization.  Do not use &quot;Add new.&quot; Remove is the correct opposite.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButtonEmpty size="s">
            Cancel
            </EuiButtonEmpty>
          </EuiTableRowCell>
          <EuiTableRowCell>
        Stops an action without saving pending changes.  Never make Cancel red&mdash;it's not a destructive action.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton size="s">
            Create
            </EuiButton>&nbsp;&nbsp;
            <EuiButton size="s" fill>
            Create
            </EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>
        Creates a new object from scratch.  Always followed by a noun, for example, “Create pipeline.” Do not use &quot;Create new.&quot; Exception: “Add user” is more intuitive that “Create user.”  Delete is the correct opposite
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton size="s" color="danger">
            Delete
            </EuiButton>&nbsp;&nbsp;
            <EuiButton size="s" color="danger" fill>
            Delete
            </EuiButton>&nbsp;&nbsp;
            <EuiButtonIcon
              size="s"
              color="danger"
              iconType="trash"
              aria-label="delete"
            />
          </EuiTableRowCell>

          <EuiTableRowCell>
        Removes data so users can longer retrieve it.  Create is the correct opposite. Do not confuse with Remove.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
        &nbsp;&nbsp;Discard
          </EuiTableRowCell>

          <EuiTableRowCell>
        Avoid.  Use Remove or Delete.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButtonEmpty>
            Learn more
            </EuiButtonEmpty>
          </EuiTableRowCell>

          <EuiTableRowCell>
        Takes the user to additional content
          </EuiTableRowCell>
        </EuiTableRow>


        <EuiTableRow>
          <EuiTableRowCell>
        &nbsp;&nbsp;New
          </EuiTableRowCell>

          <EuiTableRowCell>
        Avoid.  Prefer the action words Add or Create.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
        &nbsp;&nbsp;OK
          </EuiTableRowCell>

          <EuiTableRowCell>
        Avoid.  Use words that explain the action.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton size="s" >
            Remove
            </EuiButton>
          </EuiTableRowCell>
          <EuiTableRowCell>
        Remove an item not related to a database, such as a row from a table.  Do not confuse with Delete, which permanenty removes data from a database.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton size="s">
            Save
            </EuiButton>&nbsp;&nbsp;
          </EuiTableRowCell>
          <EuiTableRowCell>
        Carry out pending changes, for example, Save edits.  Do not confuse with Add. Can use green for the final save action.
          </EuiTableRowCell>

        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
        &nbsp;&nbsp;Yes/No
          </EuiTableRowCell>

          <EuiTableRowCell>
        Avoid.  Use action words instead.
          </EuiTableRowCell>

        </EuiTableRow>

      </EuiTableBody>
    </EuiTable>














  </GuidePage>
);
