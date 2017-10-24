# Frequently Asked Questions

Here are our responses to questions we expect to get frequently.

## What is it?

Components and design directives for developing user interfaces that are on brand with Elastic.

## Can I use this?

The intended consumers of this repository are Elastic products. You could use it when developing plugins for Elastic products such as Kibana, or if you're really curious. Otherwise, we recommend you avoid consuming `eui` entirely.

## Why is it open source?

For a number of reasons. This code started deep in the Kibana codebase long before it made it to a standalone repository. In a sense, it was already open source, just not a first-class citizen. Other products in Elastic need to take advantage of these components, but that was hard to accomplish if the components continued to be a part of Kibana. Given Kibana is open source, this package needs to be open source. This enables us to publish on `npm` more transparently, use versioning, and maintain [an up-to-date website][docs] showcasing the functionality.

## What about reporting bugs and feature requests?

Bug reports are most welcome, but we're not considering external feature requests at this time.

[docs]: https://eui.now.sh
