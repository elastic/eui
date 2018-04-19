var assert = require('assert');
const git = require('nodegit');

var initialBranch;

(function IIFE(){
  var self = this;
  return git.Repository.open("./")
      .then(function(repo) {
        self.repo = repo;
        return self.repo.getCurrentBranch()
        .then(function (branch) {
          initialBranch = branch.shorthand();
          console.log(initialBranch)
        })
        .then(function () {
          var checkoutOpts = {
            checkoutStrategy: git.Checkout.STRATEGY.SAFE
          };
          return self.repo.checkoutBranch("master", checkoutOpts)
        })
        .then(function(){
          return repo.getCurrentBranch().then(function (ref) {
            console.log("On " + ref.shorthand() + " " + ref.target());
          })
        })
    })
    .catch(function(err){
      console.log(err);
    })
    .done(function() {
      console.log('Did it.')
    })
})();



