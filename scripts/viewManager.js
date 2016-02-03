var pageView = {};

pageView.navHandler = function() {
  $('.main-nav li').on('click', function(event) {
    $('#projects, #about').hide();
    var $dataContent = $(this).data('content');
    $('#' + $dataContent).fadeIn(500);
  });
  $('.main-nav .tab:first').click();
};

pageView.navHandler();
