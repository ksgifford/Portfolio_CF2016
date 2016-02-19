(function(module) {
  var repoView = {};

  repoView.index = function(repoList) {
    $('#repo-list').empty();
    $('#repo-list').append(
      repoList.map(repos.toHtml));
    $('#about').fadeIn();
  };

  module.repoView = repoView;
})(window);
