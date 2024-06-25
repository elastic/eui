#!/bun/bash
# Build and deploy new documentation website

set -eo pipefail

# include utils
source .buildkite/scripts/common/utils.sh

echo "+++ :yarn: Installing dependencies"
yarn

echo "+++ :yarn: Building @elastic/eui-website and its local dependencies"
yarn workspaces foreach -Rpt --from @elastic/eui-website run build

echo "+++ Configuring environment for website deployment"

# See if gsutil and gcloud are installed by default

echo "gsutil version: $(gsutil version)"
echo "gcloud version: $(gcloud version)"
