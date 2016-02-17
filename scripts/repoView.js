(function(module) {
  var repoView = {};

  repoView.index = function() {
    $('#about ul').empty();
    $('#about ul').append(
      repos.with('description').map(repos.toHtml));
  };

  module.repoView = repoView;
})(window);
