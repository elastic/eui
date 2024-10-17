# EUI theme **Borealis**

This package contains specific style tokens for the EUI theme **Borealis** which is exported as `EuiThemeBorealis`.

## Installing dependencies

Please run `yarn` to install dependencies:

```shell
yarn
```

## Building helper packages

Before you run scripts, it's mandatory to build local dependency packages:

```shell
yarn workspaces foreach -Rti --from @elastic/eui-theme-borealis run build
```