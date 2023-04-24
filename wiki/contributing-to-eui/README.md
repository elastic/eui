# Contributing to EUI

🙌 Thanks for your interest in contributing to EUI! 🙌

If there isn't an associated feature request or bug report in EUI's backlog yet, [please create an issue](https://github.com/elastic/eui/issues/new) so that you get a chance to discuss the changes you have in mind with the EUI team. This helps the team scope out your work and provide guidance & recommendations.

## Process

### How we assign work and define our roadmap

EUI is built primarily by employees of Elastic. We try to do this in the open as much as possible, but do utilize closed meetings and other planning tools to dictate our longer term roadmap. We try to transcribe the decisions from these discussions in the form of specifications to Github issues for transparency. In general, once on Github, any issue can be worked on by the community. We usually reserve larger projects or ones that are core to our roadmap or design to be done internally. In these cases we mark these issues as `assigned` to a person using Github. We do not, as a policy, assign issues to community members. If you find an issue that is not assigned, assume that you are welcome to work on it and can submit a pull request. Feel free to leave a comment to mark intent and avoid conflict.

### How to ensure the timely review of pull requests

To help the maintainers of EUI better respond to your pull requests please try to adhere to the following:

1. Follow the guidelines outlined in this wiki folder, from [development](./developing) to [documentation](./documenting) to [testing](./testing).
2. Include screenshots and a summary of your changes in the PR description
3. Fill out the checklist, using ~strikethroughs~ to mark any items that are not applicable
4. Make sure your changes are documented on the demo site and include liberal code comments
5. Treat each other professionally and assume best intent in each others work and suggestions

Generally you can expect feedback and a review of your pull request from our team within a week. Contributors should limit themselves to three or less active PRs at any one time, which helps us focus review time towards PRs that are close to a merge event. Sometimes it is unclear who has the next step in getting a pull request over the line and the review can lag as a result. If this is the case, feel free to leave a new comment and ask for guidance.

### Feel free to submit pull requests in draft stages

EUI has strict quality and testing standards due to its large downstream footprint and accessibility requirements. Don't feel intimidated and think you need to submit perfect PRs because of this. We welcome draft PRs to show conceptual ideas or enhancements you would like to see. The EUI team normally engages on these PRs in one of two ways, which is largely up to you.

1. We can provide review and guidance for how to get the PR up to the library's standards. (slower, but you might enjoy this)
2. We can commit directly to your PR to get it over the finish line. (faster)

If you have a preference, let us know when you make your PR, but never feel guilty about just handing it off. We're here to help.

### Stale PRs

Stale PRs will be automatically closed by Github's [actions/stale workflow](https://github.com/actions/stale) if they are inactive for ~3 months. If the ball is in EUI's court in terms of review, please feel free to ping us to get the feedback round back in motion.

If the ball is in your court in terms of feedback given and changes requested, and the PR ends up auto-closing due to inactivity, the EUI team may take over your PR either by pushing to it directly or closing your PR and opening another that branches off your existing work.
