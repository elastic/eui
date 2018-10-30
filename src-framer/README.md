## Using EUI components in Framer X

EUI provides Framer X components inside Framers store. Simply search and install the  "Elastic UI" package.


### How to work on the source files within Framer X

1. Create a new Framer project
2. Open terminal to the unpacked Framer folder within `~Library/Autosave Information/Framer-${HASH}/container/`
3. yarn add `@elastic/eui`
4. In the same `container` directory remove the empty `code` directory.
5. Rsync the source files with `rsync -r ~/path/to/eui/framer-src/code ./`
6. Reload Framer. Your framer project now points to the source files and can be worked with.


### Framer best practices

In general, try to keep the Framer property mappings as close to EUI properties as possible. When adding additional props for Framer, utilize emojis (🧙 for magic!, ↳ for related children) and other visual signifiers to classify the distinction.

### Theming

Like EUI, the Framer components support theming. The `_framer_helpers/theme.tsx` will define which CSS file is loaded onto the Framer page.

### How to publish to the Framer store

Currently, the Framer store is tied to individual user accounts. Contact one of the EUI admins and they'll point you in the right direction.