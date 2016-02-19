(function (module) {
  var aboutController = {};

  aboutController.index = function(ctx, next) {
    $('main > section').hide();
    $('#about').fadeIn();
    repos.requestData(repoView.index);
    // repoView.index(repos.all);
  };

  aboutController.myRepos = function(ctx, next) {
    var ownerData = function(ownedRepos) {
      ctx.repos = ownedRepos;
      repoView.index(ctx.repos);
    };
    repos.without('fork', true, ownerData);
  };

  aboutController.forkedRepos = function(ctx, next) {
    var forkedData = function(forks) {
      ctx.repos = forks;
      repoView.index(ctx.repos);
    };
    repos.without('fork', false, forkedData);
  };


  module.aboutController = aboutController;
}(window));
