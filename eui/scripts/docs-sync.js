const { execSync } = require('child_process');

execSync('npm run build');
execSync('npm run build-docs');
execSync('git add docs');
execSync('git commit -am "Updated documentation." || echo "No documentation changes."');
execSync('git push upstream');
