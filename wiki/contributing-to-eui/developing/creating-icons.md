# Creating icons

EUI provides an ever-growing set of [icons][icons], but our set can be incomplete. If you find you need an icon that does not exist, create a new [icon request](https://github.com/elastic/eui/issues/new?template=06-icon-request.md) issue. A designer from the EUI team will respond to discuss your needs.

If you are willing and able to design the icon yourself, this document describes the [design guidelines](#design-guidelines), cleaning up the SVG, and getting it added to EUI. While designers on the EUI team are available to assist, we greatly appreciate your contributions and pull requests.

If you read through these guidelines or begin designing your icon and realize you're in too deep, then create an issue in this repo and request assistance. An EUI team member will reply and discuss options.

_**Note on 3rd-party / custom SVGs**_
- The `EuiIcon` component accepts external references to custom SVG files, so you can maintain the icon in your consuming application.
- This practice should also be used for any **3rd-party logos**. For a number of reasons, the EUI team as moved away from maintaining a set of 3rd party logos. Please use the custom SVG option going forward.

## Content

While we're pretty much open to all requests, we ask that you first try to use an existing icon as this helps us avoid having multiple versions of the same glyph.  Likewise, if there is a universally known icon that represents an action, we recommend leveraging those existing patterns (e.g. a scissors for cut).

Finding and sharing reference icons is a great way to get moving if you're uncertain of the general shape. Post these examples to your issue and we'll provide feedback.

Lastly, we reserve the right to reject any icons that do not fit the EUI style or may be deemed inappropriate.

## Design guidelines

### Linear icon scaling

- Each icon should be comprised of a single vector glyph that can be scaled linearly, up or down. 
- This approach greatly reduces maintenance and implementation complexity.
- Note that minor icon blurriness/anti-aliasing can occur when icons are sized to dimensions other than those divisible by the source viewbox dimensions.

<img width="622" height="309" alt="linear_icon_scaling" src="https://github.com/user-attachments/assets/87ec63aa-4237-4316-881f-180006d0c09e" />

### 16x16px viewbox

- All icons should be crafted on a 16x16px viewbox. 
- As this is the default size for all icons in EUI, this will help ensure all icons look their best by default.

<img width="622" height="320" alt="16x16_viewbox" src="https://github.com/user-attachments/assets/fe480f11-56c9-4b6b-bd94-0c12e3d54577" />

### Strokes only (with some exceptions)

- Nearly all icons should be lined/stroked, using a 1px stroke width (on a 16x16px canvas).
- In special cases, a filled variant of an icon can be created for concepts that convey a toggle action and need to represent this toggle action in an interface. For example, a star icon may have a filled variant to indicate toggling of “favorite” status.
- In a very limited subset of icons, a filled variant of an icon can be created for concepts that convey status (check, error, warning).
- In special cases, a circled variant of an icon can be created for use in empty/tertiary buttons when it comprises of a simple shape that may inadvertently appear awkward or overly diminished otherwise. Examples include simple icons such as a plus or minus.

<img width="622" height="320" alt="strokes_only" src="https://github.com/user-attachments/assets/af7e0da3-f780-41aa-9561-24862f6b8cee" />

### Snap to pixel grid (when possible)

- When possible, align/snap your icon to the 16x16px viewbox grid. Doing so will ensure that your icon appears as sharp as possible, with little or no blurring/anti-aliasing.
- It will not always be possible to snap to the grid in all situations. For example, if you have an element of your icon that is 1px and needs to be centered on the 16x16 viewbox, it is impossible to align to the grid in this case. In such situations, it is fine to snap to half-pixel increments in order to center that odd-width element on an even-width canvas.
- Do not offset your glyph in the viewbox only for the purpose of aligning it to the pixel grid. Doing so may inadvertantly make the icon appear misaligned agaisnt other elements in your design (due to the offset) or create other inconsistencies when compared with similar icons.

<img width="622" height="320" alt="snap_to_pixel" src="https://github.com/user-attachments/assets/e709124e-be89-4b28-addb-c7a3cdda27b8" />

### Square endpoints only

- All icon strokes should apply square endpoints. Rounded endpoints should never be used.

<img width="622" height="320" alt="square_endpoints_only" src="https://github.com/user-attachments/assets/ebd1fdb3-9e25-44a6-bb60-7e17c9966cc0" />

### Round outer corners, square inner corners

- All stroke corners should be round on the outside and square on the inside.
- Outer rounded corner radius should be 1px. How this is put into effect in Figma depends on how your stroke is aligned (ex. inside, center, outside).
- If stroke is inside, set corner radius to 1px. 
- If stroke is center, set corner radius to 0.5px.
- If stroke is outside, set stroke join to be round.
- The only exception to this rule is when the application of rounded outer corners comes at the detriment to the icon being conveyed. In such situations, having both inner and outer corners square is acceptable.

<img width="622" height="320" alt="round_outer_corners" src="https://github.com/user-attachments/assets/010adae6-4b93-438e-9361-9438497ae2bf" />

### 2D perspective only (with some exceptions)

- Icons with three dimensional perspectives should generally be avoided, unless the concept being conveyed is significantly more identifiable with that perspective (ex. layers).
- Showing depth or a stacking order of objects (i.e. when something is in front of something else) should be achieved with the use of negative (subtraction) space.

<img width="622" height="320" alt="2d_perspective_only" src="https://github.com/user-attachments/assets/126d6e62-ddcf-4d79-8b3a-98534dd935b6" />

### 1px safe zone

- At the default 16x16px viewbox, a safe zone of 1px around the viewbox should be kept free of icon elements if possible. Doing so will avoid any inadvertent clipping if/when the icon is scaled.

<img width="622" height="320" alt="1px_safe_zone" src="https://github.com/user-attachments/assets/0c6401d1-ae0e-4311-9b66-c156dd749df0" />

### Consistent optical sizing and alignment

- Icons in close proximity to each other should have similar optical sizing, so as to not appear out-of-place. While this is subjective, designers should still evaluate newly created icons against a variety of existing icons to ensure icons are not disproportionately sized.
- Utilize the provided keyline shapes for general sizing guidance.
- Icons should appear optically in the vertical and horizontal center of their viewbox. In most cases, this means simply center aligning the icon in the frame. In other scenarios (ex. triagular shapes), the designer may need to offset the icon slightly in order to appear in the optical center.

<img width="622" height="320" alt="consitent_optical_sizing" src="https://github.com/user-attachments/assets/71471e69-e9c1-4f69-8692-bea9c1942de5" />

### Descriptive icon naming

- When possible, try to name icons by the object being conveyed.
- If the object is too abstract or obscure to use for the icon name, naming the icon by the action it is attempting to convey is an acceptable alternative.
- Grouped/related icons should have a common prefix string to ensure they are in close proximity when in alphabetical order.
- Common variants should use a consistent suffix string across (ex. Circle, Fill, Slash). Note that if the icon is not a variant, there is no need to apply such a suffix (ex. see the new `info` icon)
- Icon component and EUI prop names should be in camel case (ex. myIcon).
- SVG files for inclusion in the EUI repo should be in snake case (ex. my_icon.svg).
- Apply synonyms for the icon in the Figma component description to ensure designers are able to easily find icons, even if not searching for the exact name.

#### _For Figma users_
_As a reference, you can view and duplicate our [Figma Icon Template Component](https://www.figma.com/design/FHys7gLzyvD1gc9DrJM6D8/Elastic-UI--Borealis-?node-id=14007-378&t=hP0dvrW2tEiYGxA0-4)._

#### _For non-Figma users_
_While we use Figma to maintain our internal design library, you can use any design tool to produce the SVG file._

## Add the icon to the EUI repo

Once you've designed your new icon, the last step is adding it to the EUI repo.

### Clean the SVG

EUI provides SVG icon formats only. After exporting your icon as an SVG from your design tool, open it in a code or text editor and remove any unnecessary elements and attributes, such as:
- `<def>...</def>`
- `<use>...</use>`
- `id: <value>`
- `fill: <value>`

_**Note**: Figma users can use the [SVG Export plugin][svg-plugin] to optimize SVG sizes and code._

### Prepare the pull request

Create a new feature branch against this repo and make the following changes:

_1. Add your glyph to the `EuiIcon` component_
- Add your SVG file to the `/packages/eui/src/components/icon/svgs` folder
- Add a reference in the `/packages/eui/src/components/icon/icon_map.ts` file (in alphabetical order)

_2. Display the icon in the docs_
- Add the icon name to `/packages/website/docs/components/display/icons/icon_types.ts` *

_3. Compile and test_
- Go to the `packages/eui` directory
- Run `yarn compile-icons`
- Preview your icon locally by running `yarn workspace @elastic/eui-website build:workspaces && yarn workspace @elastic/eui-website start` and opening http://localhost:3000/docs/components/display/icons/
- Switch the docs to dark mode and verify that the icon is visible (all paths should be filled with the reverse color)
- Run `yarn run test-unit icon -u` to create/update the jest snapshots

If everything looks good, then commit your changes, push up your branch, and open a PR! :raised_hands:

Opening a PR will notify the EUI team that your work is ready for review. Please include a screenshot in the description and reference the issue that your PR fixes.

### Ship it
Once your PR is approved, you will be able to merge it and give yourself a well-deserved pat on the back. Finally, stay tuned for the next release of EUI at which point your icon will become available to the masses and appear on the EUI docs site.

:trophy: _**Welcome to the Official EUI Icon Design Club**_ :beers:

---

_\* The Icons page actually contains several sections. In most cases, you will be adding your icon to the base set. However, if your icon should appear in a different set, then add it to the appropriate section file in `/packages/website/docs/components/display/icons`._

_\** Run `yarn workspace @elastic/eui-website start` to view the EUI docs site locally._


[icons]: https://eui.elastic.co/docs/components/display/icons/#glyphs
[icon-request-issue]: https://github.com/elastic/eui/issues/new?template=06-icon-request.md
[docs]: https://elastic.github.io/eui/
[svg-plugin]: https://www.figma.com/community/plugin/814345141907543603/SVG-Export
