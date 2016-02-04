var projects = [];

function Project(options) {
  this.title = options.title;
  this.category = options.category;
  this.client = options.client;
  this.completeDate = options.completeDate;
  this.webLink = options.webLink;
  this.body = options.body;
}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();

  $newProject.attr('category', this.category);
  $newProject.find('header h2').text(this.title);
  $newProject.find('.prjDesc').html(this.body);
  $newProject.find('.prjInfo a').text(this.client);
  $newProject.find('.prjInfo a').attr('href', this.webLink);

  $newProject.find('time[datetime]').text(this.completeDate);
  $newProject.find('time[pubdate]').attr('title', this.completeDate);
  $newProject.find('time').html('about ' + parseInt((new Date() - new Date(this.completeDate))/60/60/24/1000) + ' days ago');

  // $newProject.append('<br></br>');

  $newProject.removeClass('template');

  return $newProject;
}

projList.sort(function(a,b) {
  return (new Date(b.completeDate)) - (new Date(a.completeDate));
});

projList.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a){
  $('#projects').append(a.toHtml())
});
