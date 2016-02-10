(function(module) {

  var pageView = {};

  pageView.navHandler = function() {
    $('.main-nav li').on('click', function(event) {
      $('#projects, #about').hide();
      var $dataContent = $(this).data('content');
      $('#' + $dataContent).fadeIn(200);
    });
    $('.main-nav .tab:first').click();
  };

  pageView.initIndex = function() {
    Project.all.forEach(function(a){
      $('#projects').append(a.toHtml());
      $('#foot').append(a.buildFooter());
    })
  };

  module.pageView = pageView;
  pageView.navHandler();

}(window));
