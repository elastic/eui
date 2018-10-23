## Framer source files

This folder contains framer source components used to package up EUI into Framer.

### How to use

1. Create a new Framer project
2. Open terminal to the unpacked Framer folder within `~Library/Autosave Information/Framer-*`
3. `yarn add `@elastic/eui`
4. cd into the `container` directory and remove the empty `code` directory.
5. Symlink the source files with `ln -s ~/path/to/eui/framer-src/code ./`
6. Reload Framer. Your framer project now points to the source files