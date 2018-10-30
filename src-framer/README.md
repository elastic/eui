## Using EUI components in Framer X

EUI provides Framer X components inside Framers store. Simply search and install the  "Elastic UI" package.

Once installed, simply drag over the `_framer_helpers/theme` component onto your artboard to load the appropriate CSS. You'll need to do this before loading any other components on the page.

### How to contribute new components to our store package

The following are instructions for how to develop or edit the components we publish to the store. This step is not required if you merely wish to use the components.

1. Create a new brand new Framer project
2. Open your terminal to the unpacked Framer folder within `~Library/Autosave Information/Framer-${HASH}/container/`
3. `yarn add @elastic/eui raw-loader`. These files are required to work on the files.
4. In the same `container` directory remove the empty `code` directory. We'll be replacing it with the development files contained in this repo.
5. Rsync the source files with `rsync -r ~/path/to/eui/framer-src/code ./`. This will place the `eui/src-framer/code` directory inside of your `framer/container/` directory.
6. Reload Framer. Your framer project will now point to the files contained in EUI.
7. Commit your changes to EUI.

Remember that the Framer container folder is just a node repo of it's own. If for some reason you need to edit the ACTUAL EUI components (possibly you see a bug in EUI that is effecting Framer) you can `yarn link` the repo over similarly as you would fixing an EUI issue in Kibana.

### Framer component best practices

* Try to keep the Framer property mappings as close to EUI properties as possible.
* When adding additional props for Framer that don't exist in EUI, utilize emojis (🧙 for magic!, ↳ for related children) and other visual signifiers to classify the distinction.
* In most cases it makes sense to replace the `children` prop from EUI components with something a Framer specific prop. Name those new props `childText` or something similar to remind people they are actually adding the child prop. You can see an example of this in the Button component.

### Theming

Like EUI, the Framer components support theming. The `_framer_helpers/theme.tsx` will define which CSS file is loaded onto the Framer page.

### How to publish to the Framer store

Currently, the Framer store is tied to individual user accounts. Contact one of the EUI admins and they'll point you in the right direction.