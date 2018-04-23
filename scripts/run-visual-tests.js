const { execSync } = require('child_process');
const git = require('nodegit');

var initialBranch;

(function IIFE(){
  const self = this;
  const checkoutOpts = {
    checkoutStrategy: git.Checkout.STRATEGY.SAFE
  };
  return git.Repository.open("./")
    .then(function(repo) {
      self.repo = repo;
      return self.repo.getCurrentBranch()
    .then(function (branch) {
        initialBranch = branch.shorthand();
        if (initialBranch === 'master') {
          throw new Error("Must be on branch to test against master. Currently on master.")
        }
        console.log(displayCurrentBranch(branch));
      })
    .then(function (){
        console.log('Switching to master');
        return self.repo.checkoutBranch("master", checkoutOpts)
      })
    .then(function(){
        return self.repo.getCurrentBranch()
        .then(function (branch) {
          console.log(displayCurrentBranch(branch));
          execSync('yarn start-test-server-and-visual-test', { stdio: [0,1,2] } );
        })
      })
      .then(function() {
        console.log('Switching to ' + initialBranch);
        return self.repo.checkoutBranch(initialBranch, checkoutOpts)
      })
      .then(self.repo.getCurrentBranch().then(function(branch) {
        console.log(displayCurrentBranch(branch))
        execSync('yarn start-test-server-and-visual-test', { stdio: [0,1,2] } )
      }))
    })
    .catch(function(err){
      console.log(err);
      process.exit(1)
    })
    .done(function() {
      console.log('Finished.')
    });

  function displayCurrentBranch(branch) {
    return "Currently on " + branch.shorthand() + ": " + branch.target();
  }
})();

