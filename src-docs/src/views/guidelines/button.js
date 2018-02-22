import React from 'react';

import {
  GuidePage,
  GuideRule,
  GuideRuleTitle,
  GuideRuleExample,
} from '../../components';

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
  EuiLink,
  EuiTable,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableBody,
  EuiTableRow,
  EuiTableRowCell
} from '../../../../src/components';

export default () => (
  <GuidePage title="Button">
    <EuiText>
      <h1>Button</h1>
      <p>
      Choosing a button type, style, and placement depends on the prominence of its action and the context in which the button appears.
      </p>
      <EuiLink
        href="https://elastic.github.io/eui/#/navigation/button"
        target="_blank"
      >
          Go to code
      </EuiLink>
    </EuiText>

    <EuiSpacer size="s"/>
    <GuideRuleTitle>Button types</GuideRuleTitle>
    <EuiSpacer size="xl"/>


    <EuiFlexGroup wrap={true}>
      <EuiFlexItem style={{ minWidth: 150 }} grow={false}>
        <div style={{ textAlign: 'center' }}>
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
      <EuiFlexItem style={{ minWidth: 150 }} grow={false}>
        <div style={{ textAlign: 'center' }}>
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
      <EuiFlexItem style={{ minWidth: 150 }} grow={false}>
        <div style={{ textAlign: 'center' }}>
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
      <EuiFlexItem style={{ minWidth: 150 }} grow={false}>
        <div style={{ textAlign: 'center' }}>

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
          <p>The icon must be immediately understood, for example, a trash can for delete. Use these buttons sparingly,
            and never for the primary action.
          </p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>


    <EuiSpacer />


    <GuideRuleTitle>Placement and order</GuideRuleTitle>


    <GuideRule
      description="Button placement and order should follow the users path through the content."
    />

    <GuideRule
      heading="Modals"
      description="In modals, the user path is top to bottom, left to right, in a Z-shaped pattern.
      Placing the primary action on the bottom right puts it right where users finish scanning."
    >

      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. In modals, the primary action is on the right with the secondary action on its left."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            size="l"
            alt="button placement in an input modal"
            url="https://imgur.com/6FnlGuJ.jpg"
            style={{ textAlign: 'center' }}

          />
        </div>

      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Confirmation modals are opinionated&mdash;button placement, order,
        and type are built-in so you don't have to worry about them."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            size="l"
            alt="button placement in confirmation modal"
            url="https://imgur.com/LChHuSz.jpg"
          />
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Forms"
      description="In forms, content is typically concentrated on the top and left.  The user path is top to bottom,
      in an F-shaped pattern. A primary action on the bottom left is easiest for users to reach."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Because the user's eye never leaves the left side,
        the primary action goes on the bottom left.  If present, a secondary action is on its right."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            size="l"
            hasShadow
            allowFullScreen
            fullScreenIconColor="dark"
            alt="button placement in form"
            url="https://imgur.com/tOxPj5h.jpg"
          />
        </div>
      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        type="dont"
        text="Don't force users to move to right to get to the primary action."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            size="l"
            hasShadow
            allowFullScreen
            fullScreenIconColor="dark"
            alt="form buttons go on the left, not right"
            url="https://imgur.com/YmyrIur.jpg"
          />
        </div>
      </GuideRuleExample>

    </GuideRule>


    <GuideRule
      heading="Other containers"
      description="Button placement in other containers should fit the context surrounding it
      and stay consistent with the application. "
    >

      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. If the action is against the page title, place the primary button in the upper right,
        as shown in this page of visualizations with a Create button.  If at the bottom,
        the action might be hidden under a table with numerous rows."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            size="l"
            hasShadow
            allowFullScreen
            fullScreenIconColor="dark"
            alt="button placement in upper right"
            url="https://imgur.com/GybMNXW.jpg"
          />
        </div>
      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        type="do"
        text="Do.
        If the header is center-aligned and the panel has one primary button, center-align the button.
        This format is common in empty states.

"
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            size="l"
            hasShadow
            allowFullScreen
            fullScreenIconColor="dark"
            alt="center-aligned button"
            url="https://imgur.com/YDy9LxJ.jpg"
          />
        </div>
      </GuideRuleExample>

    </GuideRule>

    <GuideRuleTitle>One primary button per container</GuideRuleTitle>

    <GuideRule
      description="The primary action should not have to compete for attention.
      Use only one primary button per page, modal, form, or other container."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="&quot;Create index pattern&quot; is the primary action. &quot;All index patterns&quot; is
        also a button, but its an empty button. It controls the UI and doesn't save any data."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            size="l"
            hasShadow
            alt="one primary button per page"
            url="https://imgur.com/5diUfSX.jpg"
          />
        </div>
      </GuideRuleExample>
      <GuideRuleExample
        panel={false}
        type="do"
        text="Some pages don&apos;t need a primary action to draw user attention.
        The &quot;Make default index&quot; button is an action that the user doesn't click often,
        but it's still a prmary action for this page. It's just not filled in."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            size="l"
            hasShadow
            allowFullScreen
            fullScreenIconColor="dark"
            alt="page without primary button"
            url="https://imgur.com/er5vU54.jpg"
          />
        </div>
        <EuiSpacer />
      </GuideRuleExample>
    </GuideRule>


    <GuideRuleTitle>Easily recognized icons</GuideRuleTitle>


    <GuideRule
      heading=""
      description="Icon buttons can save space.  Limit icon buttons to groups of two&mdash;otherwise they lose meaning."
    >
      <GuideRuleExample type="do" text="Do. These icons for edit and expand are in the EUI repository.">
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
      description="Icons can serve as a scanning aid in a text label, but keep to a minimum.
      Icons work best on labels for binary actions (for example, Create and Delete) and final actions (Save)."
    >
      <GuideRuleExample type="do" text="Do. Icons on the left of a label facilitate scanning.">

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
      <GuideRuleExample type="dont" text="Don't. Icons on the right serve only as decoration.">


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

    <GuideRuleTitle>Minimal color changes</GuideRuleTitle>

    <GuideRule
      description="The button color defaults to blue.  Limit color changes to well-established use cases&mdash;green for final
        save actions and red for delete."
    >
      <GuideRuleExample type="do" text="Do. Green is an appropriate color for a final save action.">
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
      <GuideRuleExample type="dont" text="Don't. Readability suffers when more than two colors are used.">
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

    <GuideRuleTitle>Using multiple buttons</GuideRuleTitle>



    <GuideRule
      description="Two buttons is optimal, three is rare. For more buttons, use a dropdown or context menu."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. This example puts multiple actions in one button rather than showing them separately."
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            size="m"
            hasShadow
            alt="multiple actions in one button"
            url="https://imgur.com/xClPKbH.jpg"
          />
        </div>
      </GuideRuleExample>

      <GuideRuleExample type="dont" text="Don't. When you have too many buttons, none matter.">
        <EuiButton
          size="s"
        >
              Close index
        </EuiButton>&nbsp;&nbsp;
        <EuiButton
          size="s"
        >
              Force merge index
        </EuiButton>&nbsp;&nbsp;
        <EuiButton size="s">
                Refresh index
        </EuiButton>&nbsp;&nbsp;
        <EuiSpacer />
        <EuiButton size="s">
                Clear index cache
        </EuiButton>&nbsp;&nbsp;
        <EuiButton
          size="s"
        >
              Flush index
        </EuiButton>&nbsp;&nbsp;
        <EuiButton size="s">
                Delete index
        </EuiButton>
      </GuideRuleExample>
    </GuideRule>



    <GuideRuleTitle>Action labels</GuideRuleTitle>

    <GuideRule
      heading=""
      description="Labels should provide a clear indication of
          what happens when the user clicks the button.
            Prefer action words, and include an object when it's not clear from the context,
            for example, Add dashboard. Keep labels to three words or less.
            If your label requries more words, consider a text link instead."
    />

    <EuiText >

      <h3>Text for buttons</h3>
      <EuiSpacer />

    </EuiText>


    <EuiTable>
      <EuiTableHeader>
        <EuiTableHeaderCell>
        Text
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
        Adds an object to a list or database.   Always followed by an object, for example, Add visualization.
        Do not use &quot;Add new.&quot; Remove is the correct opposite.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButtonEmpty size="s">
            Cancel
            </EuiButtonEmpty>
          </EuiTableRowCell>
          <EuiTableRowCell>
        Stops an action without saving pending changes.  Never make Cancel red&mdash;it&apos;s not a destructive action.
        Cancel is always an empty button.
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
        Creates a new object from scratch.  Always followed by an object, for example, “Create pipeline.” Do not use &quot;Create new.&quot;
        Exception: “Add user” is more intuitive than “Create user.”  Delete is the correct opposite
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
            <EuiButton size="s" >
            Remove
            </EuiButton>
          </EuiTableRowCell>
          <EuiTableRowCell>
        Removes an item not related to a database, such as a row from a table.
        Do not confuse with Delete, which permanenty removes data from a database.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton size="s">
            Save
            </EuiButton>&nbsp;&nbsp;
            <EuiButton size="s" color="secondary">
            Save
            </EuiButton>&nbsp;&nbsp;
          </EuiTableRowCell>
          <EuiTableRowCell>
        Carries out pending changes, for example, Save edits.
        Do not confuse with Add. Can use green if this button is the final save action.
          </EuiTableRowCell>

        </EuiTableRow>
      </EuiTableBody>
    </EuiTable>
    <EuiSpacer size="l"/>

    <EuiText>
      <h3>Words to Avoid</h3>
    </EuiText>
    <EuiSpacer />


    <EuiTable>
      <EuiTableHeader>
        <EuiTableHeaderCell>
          Text
        </EuiTableHeaderCell>

        <EuiTableHeaderCell>
          Use this instead
        </EuiTableHeaderCell>
      </EuiTableHeader>
      <EuiTableBody>

        <EuiTableRow>
          <EuiTableRowCell>
              Discard
          </EuiTableRowCell>

          <EuiTableRowCell>
              Remove or Delete
          </EuiTableRowCell>
        </EuiTableRow>


        <EuiTableRow>
          <EuiTableRowCell>
          &nbsp;&nbsp;New
          </EuiTableRowCell>

          <EuiTableRowCell>
          Add or Create
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
          &nbsp;&nbsp;OK
          </EuiTableRowCell>

          <EuiTableRowCell>
          Words that explain the action
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
          &nbsp;&nbsp;Yes/No
          </EuiTableRowCell>

          <EuiTableRowCell>
          Action words
          </EuiTableRowCell>

        </EuiTableRow>

      </EuiTableBody>
    </EuiTable>














  </GuidePage>
);
