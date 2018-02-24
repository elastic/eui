import React from 'react';

import {
  GuidePage,
  GuideRule,
  GuideRuleTitle,
  GuideRuleExample
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
  EuiTableRowCell,
  EuiHorizontalRule,
} from '../../../../src/components';

import ContextMenu from '../context_menu/context_menu';

export default() => (
  <GuidePage title="Button">
    <EuiText>
      <h1>Button guidelines</h1>
      <p>
        Choosing a button type, style, and placement depends on the prominence
        of its action and the context in which the button appears.
      </p>
      <EuiLink href="https://elastic.github.io/eui/#/navigation/button" target="_blank">
        Go to code
      </EuiLink>
    </EuiText>

    <EuiHorizontalRule/>

    <GuideRuleTitle>Button types</GuideRuleTitle>

    <EuiSpacer size="xl"/>

    <EuiFlexGroup alignItems="center">
      <EuiFlexItem
        grow={false}
        style={{ minWidth: 120 }}
      >
        <EuiButton fill="fill">
          Filled
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiText>
          <h4>
            <strong>Filled buttons are for the primary action</strong>
          </h4>
          <p>
            This button has the heavist visual weight to draw users&apos; attention.
          </p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer/>

    <EuiFlexGroup alignItems="center">
      <EuiFlexItem grow={false} style={{ minWidth: 120 }}>
        <EuiButton>
          Standard
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiText>
          <h4>
            <strong>Standard buttons are for secondary actions</strong>
          </h4>
          <p>
            Such actions include Add and Apply. This button type works well for
            multiple actions of equal weight.
          </p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer/>

    <EuiFlexGroup alignItems="center">
      <EuiFlexItem grow={false} style={{ minWidth: 120 }}>
        <EuiButtonEmpty>
          Empty
        </EuiButtonEmpty>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiText>
          <h4>
            <strong>Empty buttons are for complimentary, UI-specific actions</strong>
          </h4>
          <p>
            Close, cancel, filter, refresh, and other actions that reconfigure the
            UI are appropriate for empty buttons.
          </p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer/>

    <EuiFlexGroup alignItems="center">
      <EuiFlexItem grow={false} style={{ minWidth: 120 }}>
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

      <EuiFlexItem>
        <EuiText>
          <h4>
            <strong>Icon buttons are for saving space</strong>
          </h4>
          <p>
            The icon must be immediately understood, for example, a trash can
            for delete. Use these buttons sparingly, and never
            for the primary action.
          </p>
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer/>

    <GuideRuleTitle>Placement and order</GuideRuleTitle>

    <GuideRule
      description="Button placement and order should follow the users path through the content."
    />

    <GuideRule
      heading="Put buttons to the right when the container's width is restricted"
      description="In contained spaces like modals, popovers, bottom bards and flyouts the user path
        is top to bottom, left to right, in a Z-shaped pattern.
        Placing the primary action on the bottom right puts it right where users finish scanning."
    >
      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. In modals, the primary action is on the right with the
          secondary action on its left."
        frame="frame"
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage alt="button placement in an input modal" url="https://i.imgur.com/Rijl9D4.png"/>
        </div>
      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        type="do"
        text="Do. Popovers should always use buttons positioned to the right."
        frame="frame"
      >
        <div style={{ textAlign: 'center' }}>
          <EuiImage
            alt="button placement in confirmation modal"
            url="https://i.imgur.com/Jp3ln5t.png"
          />
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      heading="Everywhere else should put buttons to the left"
      description="With large page forms, content is typically concentrated on the top and
        left with lots of open space to the right. The user path is top to bottom, in an F-shaped pattern."
    >
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. Because the user's eye never leaves the left side,
          the primary action goes on the bottom left.  If present, a secondary action is on its right."
      >
        <EuiImage
          alt="button placement in form"
          url="https://i.imgur.com/m4vtsdx.png"
        />
      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        frame="frame"
        type="dont"
        text="Don't put the actions far away from the content."
      >
        <EuiImage
          alt="form buttons go on the left, not right"
          url="https://i.imgur.com/6XCOBPH.png"
        />
      </GuideRuleExample>

    </GuideRule>

    <GuideRule
      heading="Other patterns"
      description="Button placement in other containers should fit the context surrounding it
        and stay consistent with the application."
    >
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. If the action is against the page title, place the primary button in the upper right.
          A common pattern for this is a create button that adds a new item to a list. Creation starts
          at the top and ends up in the bottom. Think of it as adding to a pile."
      >
        <EuiImage
          alt="button placement in upper right"
          url="https://i.imgur.com/fJhWvK9.png"
        />
      </GuideRuleExample>

      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do.
          Empty states are unique because they focus first on information and then try to sell
          you on creation. In these special cases when both the container is constrained
          and the content is fairly short you should center align the title and the button."
      >
        <EuiImage
          alt="center-aligned button"
          url="https://i.imgur.com/H2yzAEB.png"
        />
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>One primary button per container</GuideRuleTitle>

    <GuideRule
      description="The primary action should not have to compete for attention.
        Use only one primary button per page, modal, form, or other container."
    >
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. Only use one filled button per layout. The primary action is
          the one you want the user to eventually complete."
      >
        <EuiImage alt="one primary button per page" url="https://i.imgur.com/QdTkIt6.png"/>
      </GuideRuleExample>
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="dont"
        text="Don't. Using too many primary buttons confuses the user."
      >
        <EuiImage
          alt="page without primary button"
          url="https://i.imgur.com/rmVFU1C.png"
        />
        <EuiSpacer/>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Icons in buttons either stand on their own or add context</GuideRuleTitle>

    <GuideRule
      heading=""
      description="Icon buttons can save space.
        Limit icon buttons to groups of two&mdash;otherwise they lose meaning."
    >
      <GuideRuleExample
        type="do"
        text="Do. Use button icons for universal actions that are easy to understand."
        panel={false}
        frame="frame"
      >
        <div>
          <EuiButtonIcon size="s" iconType="pencil" aria-label="Next"/>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <EuiButtonIcon size="s" iconType="expand" aria-label="Next"/>
        </div>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Don't use icons alone in a standard button. It defeats the purpose of saving space."
        panel={false}
        frame="frame"
      >
        <div>
          <EuiButton>
            <EuiIcon type="pencil"/>
          </EuiButton>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <EuiButton >
            <EuiIcon type="expand"/>
          </EuiButton>
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRule
      description="Icons can serve as a scanning aid in a text label, but keep to a minimum.
        Icons work best on labels for binary actions (for example, Create and Delete) and final actions (Save)."
    >
      <GuideRuleExample
        type="do"
        text="Do. Use icons to really emphasize actions. The arrow on continue
          lets us know we still have items to fill out. Using words like complete
          and utilizing a rare check icon help the user understand this is the
          final action."
        panel={false}
        frame="frame"
      >

        <EuiButton iconType="arrowRight" iconSide="right" fill="fill">
          Continue
        </EuiButton>

        <EuiButton iconType="check" color="secondary" fill="fill">
          Save and complete
        </EuiButton>

      </GuideRuleExample>
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="dont"
        text="Don't. Icons often distract from the text.
          This is especially true when it is positioned to the right
          with a hard to grok icon."
      >
        <EuiButton
          iconType="indexOpen"
          iconSide="right"
          fill="fill"
        >
          Create index pattern
        </EuiButton>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Minimize mixing color, size, and type</GuideRuleTitle>

    <GuideRule description="When in doubt use blue in the default sizes. Never put more than two
      visual styles next to each other."
    >
      <GuideRuleExample
        type="do"
        text="Do. Stick to the default pattern: a blue, primary action paired with
          an empty, but same-colored one."
        panel={false}
        frame="frame"
      >
        <div>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiButton fill="fill">
                Save
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty>
                Cancel
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </GuideRuleExample>
      <GuideRuleExample
        type="dont"
        text="Don't. Readability suffers when more than two colors are used."
        panel={false}
        frame="frame"
      >
        <div>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiButton fill="fill">
                Save
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton>
                Cancel
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton color="danger" fill="fill" size="s">
                Delete
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </GuideRuleExample>
    </GuideRule>

    <GuideRuleTitle>Stack action sets into one button</GuideRuleTitle>

    <GuideRule
      description="Two buttons is optimal, three is rare. For more buttons, use a dropdown or context menu."
    >
      <GuideRuleExample
        panel={false}
        frame="frame"
        type="do"
        text="Do. This example puts multiple actions in one button rather than showing them separately."
      >
        <ContextMenu/>
      </GuideRuleExample>

      <GuideRuleExample
        type="dont"
        text="Don't. When you have too many buttons, none matter."
        panel={false}
        frame="frame"
      >
        <div>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <EuiButton>
                Show fullscreen
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton>
                Display options
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButton>
                Edit / add panels
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
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
      <h3>Preffered words in buttons</h3>
      <EuiSpacer/>
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
            <EuiButton>
              Add noun
            </EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Adds an object to a list or database. Always followed by an object,
            for example, Add visualization. Do not use &quot;Add new.&quot; Remove is the correct opposite.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButtonEmpty size="s">
              Cancel
            </EuiButtonEmpty>
          </EuiTableRowCell>
          <EuiTableRowCell>
            Stops an action without saving pending changes. Never make Cancel
            red&mdash;it&apos;s not a destructive action. Cancel is always an empty button.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton fill="fill">
              Create noun
            </EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Creates a new object from scratch. Always followed by an object,
            for example, “Create pipeline.” Do not use &quot;Create new.&quot;
            Exception: “Add user” is more intuitive than “Create user.” Delete is the correct opposite
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton color="danger" fill="fill">
              Delete
            </EuiButton>&nbsp;&nbsp;
            <EuiButton color="danger" fill="fill">
              Delete 6 nouns
            </EuiButton>&nbsp;&nbsp;
            <EuiButtonIcon size="s" color="danger" iconType="trash" aria-label="delete"/>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Deletes data so users can longer retrieve it. Create is the correct
            opposite. Do not confuse with Remove.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton color="danger">
              Remove
            </EuiButton>&nbsp;&nbsp;
            <EuiButtonIcon size="s" color="danger" iconType="cross" aria-label="Remove"/>
          </EuiTableRowCell>
          <EuiTableRowCell>
            Removes an item not related to a database, such as a row from a table.
            Do not confuse with Delete, which permanenty removes data from a database.
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton fill="fill">
              Save
            </EuiButton>&nbsp;&nbsp;
            <EuiButton fill="fill" color="secondary" iconType="check">
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
    <EuiSpacer size="l"/>

    <EuiText>
      <h3>Avoid these words in buttons</h3>
    </EuiText>
    <EuiSpacer/>

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
            <EuiButton color="danger">
              Discard
            </EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Remove or Delete
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton>
              New
            </EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Add or Create
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton>
              OK
            </EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Words that explain the action
          </EuiTableRowCell>
        </EuiTableRow>

        <EuiTableRow>
          <EuiTableRowCell>
            <EuiButton>
              Yes?
            </EuiButton>&nbsp;&nbsp;
            <EuiButton color="danger">
              No?
            </EuiButton>
          </EuiTableRowCell>

          <EuiTableRowCell>
            Action words
          </EuiTableRowCell>

        </EuiTableRow>

      </EuiTableBody>
    </EuiTable>

  </GuidePage>
);
