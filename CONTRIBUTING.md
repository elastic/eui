# Contributing to EUI

🙌 Thanks for your interest in contributing to EUI! 🙌

## New components, features, and bug fixes

When creating new components, adding new features, or fixing bugs, please refer to the [Component Development guidelines](wiki/component-development.md). If there isn't an associated issue on the bug tracker yet, consider creating one so that you get a chance to discuss the changes you have in mind with the rest of the team.

### How we assign work and define our roadmap

EUI is built primarily by employees of Elastic. We try to do this in the open as much as possible, but do utilize closed meetings and other planning tools to dictate our longer term roadmap. We try to transcribe the decisions from these discussions in the form of specifications to Github issues for transparency. In general, once on Github, any issue can be worked on by the community. We sometimes reserve larger projects or ones that are core to our roadmap or design to be done internally. In these cases we mark these issues as `assigned` to a person using Github. We do not, as a policy, assign issues to community members. If you find an issue that is not assigned, assume that you are welcome to work on it and can submit a pull request. Feel free to leave a comment to mark intent and avoid conflict.

### How to ensure the timely review of pull requests

To help the maintainers of EUI better respond to your pull requests please try to adhere to the following guidelines:

1. Treat each other professionally and assume best intent in each others work and suggestions
2. Include screenshots and a summary of your changes in the PR description
3. Fill out the checklist, using ~strikethroughs~ to mark any items that are not applicable
4. Make sure your changes are documented on the demo site and include liberal code comments

Generally you can expect feedback and a review of your pull request from our team within a week. Contributors should limit themselves to three or less active PRs at any one time, which helps us focus review time towards PRs that are close to a merge event. Sometimes it is unclear who has the next step in getting a pull request over the line and the review can lag as a result. If this is the case, feel free to leave a new comment and ask for guidance.

### Feel free to submit pull requests in draft stages

EUI has strict quality and testing standards due to its large downstream footprint and accessibility requirements. Don't feel intimidated and think you need to submit perfect PRs because of this. We welcome draft PRs to show conceptual ideas or enhancements you would like to see. The EUI team normally engages on these PRs in one of two ways, which is largely up to you.

1. We can provide review and guidance for how to get the PR up to the library's standards. (slower, but you might enjoy this)
2. We can commit directly to your PR to get it over the finish line. (faster)

If you have a preference, let us know when you make your PR, but never feel guilty about just handing it off. We're here to help.

### We utilize Github actions to keep the repo tidy

We use Github actions for some automation tasks to keep this repo tidy. Specifically we close out issues and PRs using [the actions/stale workflow](https://github.com/actions/stale) when we notice a lack of activity over a long period of time. This is done as much to remind us of older issues that need attention as it is to keep our total issue count managable. These action counters can easily be soft reset by commenting on the issues/PRs directly.

## Helpful documents

* [Component design](wiki/component-design.md)
* [Component development](wiki/component-development.md)
  * [Creating components manually](wiki/creating-components-manually.md)
  * [Creating components with Yeoman](wiki/creating-components-yeoman.md)
* [Creating icons](wiki/creating-icons.md)
* [Theming](wiki/theming.md)
* [Testing](wiki/testing.md)
  * [Accessibility Testing](wiki/automated-accessibility-testing.md)
* [Documentation](wiki/documentation-guidelines.md)
* [Releasing versions](wiki/releasing-versions.md)
* [Writing styles with Emotion](wiki/writing-styles-with-emotion.md)
