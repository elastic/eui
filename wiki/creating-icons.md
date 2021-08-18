# Creating icons

EUI provides an ever-growing set of [icons][icons], but our set can be incomplete. If you find you need an icon that does not exist, create a new issue and tag it with the *icons* label. A designer from the EUI team will respond to discuss your needs.

If you are willing and able to design the icon yourself, this document describes the guidelines for designing a new icon, cleaning up the SVG, and getting it added to EUI. While designers on the EUI team are available to assist, we greatly appreciate your contributions and pull requests.

If you read through these guidelines or begin designing your icon and realize you're in too deep, then create an issue in this repo and request assistance. An EUI team member will reply and discuss options.

_**Note**: The `EuiIcon` component accepts external references to icon files, so you have the option to maintain the icon in your consuming application._

## Design the icon

From a content perspective, we've taken an approach of being open to many types of icons so long as they don't duplicate an icon that already exists. Stylistically, we have more stringent requirements outlined below.

### Content

While we're pretty much open to all requests, we ask that you first try to use an existing icon as this helps us avoid having multiple versions of the same glyph.  Likewise, if there is a universally known icon that represents an action, we recommend leveraging those existing patterns (e.g. a scissors for cut).

Finding and sharing reference icons is a great way to get moving if you're uncertain of the general shape. Post these examples to your issue and we'll provide feedback.

Lastly, we reserve the right to reject any icons that do not fit the EUI style or may be deemed inappropriate.

### Style

This is where things get more opinionated. To maintain a cohesive, high quality icon set, we require that all new glpyhs adhere to the following guidelines:

- Use an outline style with a 1 pixel width stroke, straight edges, rounded corners and ends
- Adhere to an overall 16 pixel square shape

![Dimensions](https://user-images.githubusercontent.com/446285/63458957-56bd8c00-c419-11e9-958c-9fd912736180.png)

- Center the glyph in the square leaving a 1 or 2 pixel trim area, where possible
- Align vertical and horizontal paths to a 16x16 pixel grid

![Guides](https://user-images.githubusercontent.com/446285/63458958-5624f580-c419-11e9-89cf-45fa1b596329.png)

#### _For Figma users_
_As a reference, you can view and duplicate our [Figma Icon Template](https://www.figma.com/file/Alv38VIPHGd2cNZYKgtVEe/EUI-Utilities-Icon-Template?node-id=1%3A165). The "template" page within this project contains frames with helper grids, margins, and an example._

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
- `fill-rule: <value>` or `fillRule: <value>`

_**Note**: Figma users can use the [SVG Export plugin][svg-plugin] to optimize SVG sizes and code._

### Prepare the pull request

Create a new feature branch against this repo and make the following changes:

_1. Add your glyph to the `EuiIcon` component_
- Add your SVG file to the `/src/components/icon/assets` folder
- Add a reference in the `/src/components/icon/icon.tsx` file (in alphabetical order)

_2. Display the icon in the docs_
- Add the icon name to `/src-docs/src/views/icon/icons.js` *

_3. Compile and test_
- Run `yarn compile-icons`
- Preview your icon locally at `http://localhost:8030/#/display/icons` **
- Switch the docs to dark mode and verify that the icon is visible (all paths should be filled with the reverse color)
- Run `yarn run test-unit icon -u` to create/update the jest snapshots

If everything looks good, then commit your changes, push up your branch, and open a PR! :raised_hands:

Opening a PR will notify the EUI team that your work is ready for review. Please include a screenshot in the description and reference the issue that your PR fixes.

### Ship it
Once your PR is approved, you will be able to merge it and give yourself a well-deserved pat on the back. Finally, stay tuned for the next release of EUI at which point your icon will become available to the masses and appear on the EUI docs site.

:trophy: _**Welcome to the Official EUI Icon Design Club**_ :beers:

---

_\* The Icons page actually contains several sections. In most cases, you will be adding your icon to the base set. However, if your icon should appear in a different set, then add it to the appropriate section file in `/src-docs/src/views/icon`._

_\** Run `yarn && yarn start` to view the EUI docs site locally._


[icons]: https://elastic.github.io/eui/#/display/icons
[docs]: https://elastic.github.io/eui/
[svg-plugin]: https://www.figma.com/community/plugin/814345141907543603/SVG-Export
