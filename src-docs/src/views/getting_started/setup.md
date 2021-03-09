## Installation

To install the Elastic UI Framework into an existing project, use the `yarn` CLI (`npm` is not supported).

```js
yarn add @elastic/eui
```

Note that EUI has [several `peerDependencies` requirements](package.json) that will also need to be installed if starting with a blank project. You can read more about other ways to [consume EUI][consuming].

```js
yarn add @elastic/eui @elastic/datemath moment prop-types
```


## Running Locally

### Node

We depend upon the version of node defined in [.nvmrc](.nvmrc).

You will probably want to install a node version manager. [nvm](https://github.com/creationix/nvm) is recommended.

To install and use the correct node version with `nvm`:

```js
nvm install
```

### Documentation

You can run the documentation locally at [http://localhost:8030/](http://localhost:8030/) by running the following.

```js
yarn
yarn start
```

If another process is already listening on port 8030, the next free port will be used. Alternatively, you can specify a port:

```js
yarn start --port 9000
```