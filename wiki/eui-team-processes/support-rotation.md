# Support rotation

To ensure that developer support is evenly spread out amongst team members, EUI has implemented a weekly rotating support calendar. The assigned team member for the week is responsible for responding to and triaging incoming questions and issues.

## What does support entail?

Incoming support items will primarily come from Elastic's internal Slack `#eui` chat channel, and publicly from [opened GitHub issues](https://github.com/elastic/eui/issues) (which can be tracked via the `#eui-github-notifications` Slack channel).

This includes testing and merging automated dependency PRs created by Snyk.

### Guidelines for support

- *Expect detail* -- we have issue templates for a reason, the more context and pre-work a user provides in their issue, the easier it is for us to help. It is not just a nice-to-have, it is a requirement. Push the work back to a user to provide more detail if they haven't done their due diligence.
- *Responding is best-effort* -- We do not provide an SLA. We like to help people, but we need to be protective of our own time. We are first and foremost a development team. However, we should generally try to make sure most issues have a timely response.
- *Consider implementing things immediately* -- If something is small, actionable, and important, like an easy bug fix, consider fixing it immediately while the context is fresh in your mind, rather than letting it go into the backlog.
- *Help future users* -- During your support time, if you think a question could have been answered with better docs, clearer APIs, or a better types, then take the time to make that change. Think about how we can avoid a question coming up again. How do we help folks self-service? It will save ourselves time in the long run.
- *Time-box your efforts* -- Support is a great time to learn more about EUI. Try to work issues on your own and learn in the process, but be conscious of the time you're spending. Don't get stuck in a hole, pull in a knowledgable team member to help if you've gone past your chosen time-box.
- *Prioritize* -- Not all issues and questions are created equal, some issues will warrant more time then others. There's no exact formula, but as you could imagine, bugs would take priority over feature requests; internal users would take precedence of external; high-quality questions with good context would take precedence over low-quality, low-effort questions.

## Common questions and answers 

- _I'm trying to implement X and it's not working - why?_
  - This is potentially either a [usage issue][usage] or [bug report][bug].

- _I want to accomplish X - can EUI do this?_
  - This is potentially a [feature request][feature] or we can suggest a [usage/implementation workaround][usage].

- _I have a higher-level discussion without a clear "right" answer - what should I do?_
  - Consider [converting the issue into a GitHub discussion](https://github.com/elastic/eui/discussions) - ideally, issues remaining in EUI's backlog should have clear and actionable outcomes defined.
  - Loop in more EUI team members for discussion!

[usage]: #usage-issue
[bug]: #bug-report
[feature]: #feature-request

### Usage issue

Usage issues can run the gamut of incorrect usage or setup (e.g. missing styles due a missing `<EuiProvider>` wrapper), to recommending implementation alternatives or workarounds on top of existing EUI functionality.

1. **Incorrect usage of EUI:**
    - If the problem that the consumer is facing is due to incorrect usage of EUI, the fix will need to be implemented on their end. We should recommend an approach (potentially with CodeSandbox examples for specific technical issues) that the consumer can take instead.

2. **Consumer-level workarounds:**
    - For scenarios where the consumer is trying to achieve a certain behavior that EUI does not support or intend to support OOTB, we can suggest that they implement their desired behavior on their end on top of EUI. [Here is an example issue response](https://github.com/elastic/eui/issues/6747#issuecomment-1531835506) where a consumer workaround was suggested instead of an EUI-level implementation.
    - *Note:* In general, EUI's components should be flexible enough to support custom usage, styling, or overriding default functionality. If this is not the case, EUI may need to be updated with more flexibility.

3. **Providing examples:**
    - In some scenarios, the consumer may be trying to achieve behavior that EUI *does* support (in which case, we should link them to our docs site), or a behavior that EUI *can* support with some extra configuration on the consumer's end (in which case, we should provide an example CodeSandbox link of a basic implementation example).

For usage questions that do not require any changes on EUI's end, apply the `answered` label to the issue (which will auto-close the issue as resolved in 3 days, if the opener does not follow up with more questions).

### Bug report

Bug reports should always be validated first to confirm that it is reproducible in latest EUI, and ideally have a minimum reproducible CodeSandbox. If an extremely complex use-case is being described without a reproducible example and that isn't easily recreated in 15 minutes or less, the onus is on the reporter to provide us that example - we cannot move forward without it. Non-reproducible bugs can be closed with the "not planned" GitHub state, or labeled as `answered` (which will auto-close the issue in 3 days if the reporter does not come back with a valid repro link).

If the issue being reported is reproducible and a valid problem that needs to be fixed on EUI's end, there are one of two options to take:

1. If it's a small or quick fix, we should ideally implement a fix as part of our support responsibilities.

2. If it's a larger fix that would take more than (e.g.) a sprint, the issue should be filed with the `bug` label and triaged with an appropriate sizing and prioritization.
    - If possible, we should give consumer an idea of when they can expect a fix if we have a specific timeline. If the bug is edge case enough that it impacts very few end-users, we should let them know it is low priority but that we would be open to a community contribution for it.

### Feature request

There are essentially three types of feature requests:

1. Feature requests that EUI will **not** implement:
    - While it can be tough to say "no", we should not be afraid to do so when necessary. Certain features may go against our design and architectural choices, and we need to be cognizant of all impacts of a feature, from consistency to accessibility to developer experience.
    - These issues should be closed to responded to definitively letting the requester know that it is not something we will implement, and empathetically explaining the reasoning behind our decision.

2. Feature requests that EUI will **not** implement, but would accept:
    - We should communicate to the requester that while we agree this would be a great feature, we as a team do not have the bandwidth to prioritize it or put it on our roadmap.
    - We should communicate that we will take a community contribution for it, but [if there are no outside contributions within 1 year](https://github.com/elastic/eui#what-about-reporting-bugs-and-feature-requests), the issue will auto-close.

3. Feature requests that EUI **will** implement:
    - If this is a small feature or enhancement with tangible benefit and very little downside or side effects for either consumers or end-users, the support EUI team member is free to choose to implement it as part of their support rotation.
    - If not implemented during your support week, the issue will be groomed with size and prioritization during our weekly backlog meetings. We should communicate a completion timeline back to the requester after the issue has been groomed.
    - If the request is a major feature or roadmap item (which would typically come from Elastic teams), it will likely have a longer timeline and involve detailed discussions and a lot of back-and-forth between multiple stakeholders.

## How do I respond to questions that I don't know the answer to?

1. First things first - [search through EUI's opened issues](https://github.com/search?type=issues&q=repo%3Aelastic%2Feui+your+question). Many questions have already been asked in the past, and our issue list is fairly comprehensive. Check to see if a related discussion has already been had.
    1. Duplicate issues can be closed with a link to the related issue, if the related issue is still open or has been closed with a definitive answer.
    2. If the original issue was closed due to inactivity / without a definite conclusion, the re-raised issue should remain open with a link to the original issue for extra context.

2. If you're completely unfamiliar with the component or domain being asked about, pull someone else in. The role of support is not *necessarily* to solve every issue that comes in (although it's great if we can) - at times, it's simply to Level 1 Triage, where your responsibility can be fulfilled by pinging/roping in the correct domain expert that knows the answer.

3. If the question has not already been asked, and there is not already another Elastician who knows the answer, then it's time to dive into finding the answer ourselves. Typically, this involves [going into the source code](https://github.com/elastic/eui/tree/main/src/components) of the component, utility, or architecture that's being used, and figuring out how it works. If simply parsing and understanding how the source code works does not get you very far, other options include:
    1. Pull up the component's [git blame](https://docs.github.com/en/repositories/working-with-files/using-files/viewing-a-file#viewing-the-line-by-line-revision-history-for-a-file) in GitHub to see what PR last touched the code, and if there is any context within that PR's description, linked issue, or GitHub conversation(s).
    2. Examine the component's tests, which can serve as a form of developer documentation. For example, regressions/bug fixes will ideally have tests written for them with comments and potentially links explaining why certain changes were made.
    3. Create a CodeSandbox to try and replicate/troubleshoot the issue, or modify an EUI docs example to get as close to the issue as possible (which also allows you to add logs or debuggers to behavior to track down what's going on). [Julia Evans's Pocket Guide to Debugging](https://jvns.ca/blog/2022/12/21/new-zine--the-pocket-guide-to-debugging/) is useful to follow (even just its table of contents) as a means of following a clear troubleshooting path.

## Time off / outages

If a team member is off for just a day or so of their support, no worries - just let the team know either in Slack or a standup and ask the team at large to cover for those days.

If a team member is off for the entire week of their support rotation, please let the team lead know so they can shuffle the calendar schedule around and assign someone else to that week.
