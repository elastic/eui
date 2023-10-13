# Contributing to EUI

🙌 Thanks for your interest in contributing to EUI! 🙌

If there isn't an associated feature request or bug report in EUI's backlog yet, [please create an issue](https://github.com/elastic/eui/issues/new) so that you get a chance to discuss the changes you have in mind with the EUI team. This helps the team scope out your work and provide guidance & recommendations.

## Process

### Who can contribute?

EUI is built primarily by and for employees of Elastic. We align our features and roadmap with the needs of our products internally.

While EUI's primary customer is Kibana and other Elastic products, open source is a part of our DNA at Elastic, and commmunity contributions from outside of Elastic are welcome. These contributions are typically reviewed and merged on a best-effort basis and must generally align with the overall objectives of this project.

In general, once on Github, any issue can be worked on by the community. If you find an issue that is not assigned, assume that you are welcome to work on it and can submit a pull request. We recommend that you leave us a comment indicating your intent before starting work to avoid potential conflict. We do not, as a policy, assign issues to community members and we usually reserve larger projects or ones that are core to our roadmap or design to be done internally.

Our best PRs tend to come from existing users whom have a challenge they are attempting to overcome and wish to help us solve it. If you are new to open source and looking for a good project to start making contributions, this project may not be a good fit. We have an extensive backlog in which you'll likely encounter outdated issues and issues lacking the appropriate context to get started.

### How to ensure the timely review of pull requests

To help the maintainers of EUI better respond to your pull requests please try to adhere to the following:

1. Follow the guidelines outlined in this wiki folder, from [development](./developing) to [documentation](./documenting) to [testing](./testing).
2. Prefer [atomic commits and small pull requests](https://learning-notes.mistermicheels.com/processes-techniques/small-commits-pull-requests/). Try to limit each commit and each PR to one concern/one issue only. PRs will be significantly easier to QA and review this way.
3. Include screenshots and a summary of your changes in the PR description
4. Fill out the checklist, using ~strikethroughs~ to mark any items that are not applicable
5. Make sure your changes are documented on the demo site and include code comments for unintuitive changes
6. Treat each other professionally and assume best intent in each others work and suggestions

Generally you can expect feedback and a review of your pull request from our team within a week. Contributors should limit themselves to three or less active PRs at any one time, which helps us focus review time towards PRs that are close to a merge event. Sometimes it is unclear who has the next step in getting a pull request over the line and the review can lag as a result. If this is the case, feel free to leave a new comment and ask for guidance.

### Feel free to submit pull requests in draft stages

EUI has strict quality and testing standards due to its large downstream footprint and accessibility requirements. Don't feel intimidated and think you need to submit perfect PRs because of this. We welcome draft PRs to show conceptual ideas or enhancements you would like to see. The EUI team normally engages on these PRs in one of two ways, which is largely up to you.

1. We can provide review and guidance for how to get the PR up to the library's standards. (slower, but you might enjoy this)
2. We can commit directly to your PR to get it over the finish line. (faster)

If you have a preference, let us know when you make your PR, but never feel guilty about just handing it off. We're here to help.

### Stale PRs

Stale PRs will be automatically closed by Github's [actions/stale workflow](https://github.com/actions/stale) if they are inactive for ~3 months. If the ball is in EUI's court in terms of review, please feel free to ping us to get the feedback round back in motion.

If the ball is in your court in terms of feedback given and changes requested, and the PR ends up auto-closing due to inactivity, the EUI team may take over your PR either by pushing to it directly or closing your PR and opening another that branches off your existing work.
