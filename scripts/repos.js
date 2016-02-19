(function(module) {
  var repos = {};
  repos.all = [];

  repos.requestData = function(callback) {
    $.get('/github/users/ksgifford/repos?per_page=10&sort=created:desc')
      .done(function(data, message, xhr) {
        repos.all = data;
      })
      .done(callback)
    };

  repos.without = function(attr, value, callback) {
    return repos.all.filter(function(repo) {
      return repo[attr] != value;
    });
  }

  repos.toHtml = function(repo) {
    var template = Handlebars.compile($('#github-template').text());
    this.repoName = repo.name;
    this.repoLink = repo.html_url;
    this.repoDesc = repo.description;

    return template(this);
  }

  module.repos = repos;
})(window);
