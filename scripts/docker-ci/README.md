# eui/ci

Base Docker environment image for EUI's CI which instantiates Puppeteer (Headless Chromium Node API) and Cypress.
Built containers can be published to the [Elastic Docker Registry](https://container-library.elastic.co) for use locally or in CI environments.

## Getting started

### `test-docker` script
The [`test-docker`](../test-docker.js) script is the primary user of this container. Specifically, the [`a11y-testing`](../a11y-testing.js) script therein uses the headless Chromium environment to run EUI's automated axe accessibility testing suite.

### Generic node application
Run the container by passing `node -e "<yourscript.js content as a string>"` as the command:

```bash
docker run -i --rm --cap-add=SYS_ADMIN \
    --name puppeteer-chrome eui/puppeteer \
    node -e "`cat yourscript.js`"
```

## Using with the Elastic Container Library

To start, you'll need to setup a local Docker environment. See [Docker's "Get started" guide](https://docs-stage.docker.com/get-started/) for instructions.

[View general information on Accessing the Docker registry](https://github.com/elastic/infra/blob/master/docs/container-registry/accessing-the-docker-registry.md)

### Build a new image

From the `scripts/docker-ci` directory:

```bash
docker build [--no-cache] [--tag ci:x.x] .
```

* Use the `--no-cache` option if attempting the upgrade environment installations, like `node.js`, for instance.
* Use the `--tag` option to give the image a reference name. Helpful if you plan on running the image locally (see next step).

> :warning: If you receive a `Cannot connect to Docker daemon` error, you can use [Docker Desktop](https://docs.docker.com/desktop/#download-and-install) (without signing in). Simply starting the app will create the Docker engine/daemon needed.


### Test a new image locally

To run the [`test-docker`](../test-docker.js) script with the new image locally, you'll need to replace the image name line in the `docker run ...` command (`docker.elastic.co/eui/ci:x.x`) with the new image ID or tag name (if set during the build with `--tag`).

### Publish a built image

Authentication and membership of the `eui-team` team on GitHub is required:

* You can login at [https://docker-auth.elastic.co](https://docker-auth.elastic.co) using GitHub OAuth to sign in.
* This will give you a login command that you can run locally to connect to the registry, like:

```bash
docker login -u thompsongl -p supersecret docker.elastic.co
```

Then tag the built image by incrementing the tag version, first grabbing the image ID using `docker images`:

```bash
# If the previous docker image was ci:1.0, then the new ci:x.x version should be either 1.1 or 2.0, depending on semver
docker tag IMAGE_ID docker.elastic.co/eui/ci:x.x
```

```bash
docker push docker.elastic.co/eui/ci:x.x
```

> :warning: There is a ~3 minute JWT timeout for docker image uploads (set by Elastic for security reasons and cannot be changed). If you receive a `unauthorized: authentication required` error after `docker push`, this means that your upload has timed out. Since docker uploads images in concurrent layers, it should still have uploaded a portion of the image.
> 
> Simply repeat your `docker push` command until the image has fully uploaded (which may take 2-3+ attempts), or consider uploading via wired ethernet for faster upload speeds. On Docker Desktop, you can also go to Preferences > Docker Engine and add `"max-concurrent-uploads": 1` to the daemon configuration JSON to upload 1 layer at a time to dedicate upload bandwidth to one layer at a time.

### Use a published image

Note that authentication is not required.

```bash
docker pull docker.elastic.co/eui/ci:x.x

docker run [...]
```

See the [`test-docker`](../test-docker.js) script as an example.
