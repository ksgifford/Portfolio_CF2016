(function (module) {
  var aboutController = {};

  aboutController.index = function() {
    $('main > section').hide();
    repos.requestData(repoView.index);

    $('#about').fadeIn();
  };
  module.aboutController = aboutController;
}(window));
