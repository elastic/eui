# Elastic Visual Regression

This module is a test suite used to test [EUI](). It is to be used to verify that changes to code do not break the
the components visually by verifying current screenshots to a baseline taken previously. 

## What EVR Does
* EVR runs tests locally and in CI via [Sauce Labs]().
* EVR tests against Firefox, Chrome and Internet Explorer using [webdriver.io]()
* EVR runs tests concurrently to speed up execution both locally and on Sauce Labs. 

## What EVR Does Not Do
* EVR does not verify screenshots across different browsers. It verifies each browser against itself. 
* EVR does not run against multiple versions of each browser. 
* EVR does not replace functional/unit tests. 
* EVR does not block commits. 

