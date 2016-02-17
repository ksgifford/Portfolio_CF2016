(function(module) {
  var projectsController = {};

  projectsController.index = function() {
    $('main > section').hide();
    $('#projects').fadeIn();
  };
  module.projectsController = projectsController;
}(window));
