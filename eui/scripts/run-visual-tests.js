const { execSync } = require('child_process');
const git = require('nodegit');

const checkoutOpts = {
  checkoutStrategy: git.Checkout.STRATEGY.SAFE
};

(async function run() {
  const repo = await git.Repository.open("./");

  let currentBranch = await repo.getCurrentBranch();
  const initialBranch = currentBranch.shorthand();

  if (initialBranch === 'master') {
    throw new Error("Must be on branch to test against master. Currently on master.")
  }
  console.log(displayCurrentBranch(currentBranch));

  console.log('Switching to master');
  await repo.checkoutBranch("master", checkoutOpts);
  currentBranch = await repo.getCurrentBranch();
  console.log(displayCurrentBranch(currentBranch));

  console.log('running tests');
  execSync('yarn start-test-server-and-visual-test', { stdio: [0,1,2] } );

  console.log('Switching to ' + initialBranch);
  await repo.checkoutBranch(initialBranch, checkoutOpts);
  currentBranch = await repo.getCurrentBranch();
  console.log(displayCurrentBranch(currentBranch));

  console.log('running tests');
  execSync('yarn start-test-server-and-visual-test', { stdio: [0,1,2] } );
})()
.then(function() {
  console.log('Finished.')
})
.catch(function(err){
  console.log(err);
});

function displayCurrentBranch(branch) {
  return "Currently on " + branch.shorthand() + ": " + branch.target();
}
