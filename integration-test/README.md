##### The content of this file will be replaced by the actual instructions on how to use the test suite.


#### Project description

Automated testing for projects and deployments that we expect EUI to support. Currently, we rely on manual build steps or testing suites (functional and/or unit tests) provided by consuming applications to check environment compatibility and catch instances of breaking API changes. Conversion to and adoption of TypeScript has helped at a low level, but we need broader, less manual means of understanding support coverage.
#### Target:
For projects that consume EUI
- Some of the targeted projects:
  1. Gatsby EUI starter
  2. NextJs
  3. CodeSandbox
  4. Create React App
#### Outcome:

- Developers will have a command line interface to execute the tests for different projects.
- The tool can test installation, build process and detect failure.
- The tests are configurable and extensible.
- Should also be integrated with CI tools.

Example:
```bash
>>> integration-test gatsby-starter --install
>>> integration-test --config ./integration-test/config/config.json
```
#### Overall plan:
1. Design and create a prototype test script for one of the projects such as EUI Gatsby starter.
2. Implement the essential scripts that interact with multiple projects with different operations.
3. Make the tests configurable and extensible. Improve the CLI.
4. Containeriz and optimize the suite and integrate it with CI tools.

(More details are shared in Google Doc.)