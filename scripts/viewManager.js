(function(module) {

  var pageView = {};

  pageView.initIndex = function() {
    Project.all.forEach(function(a){
      $('#projects').append(a.toHtml());
      $('#foot').append(a.buildFooter());
    })
  };

  module.pageView = pageView;

}(window));
