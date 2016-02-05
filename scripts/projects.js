var projects = [];

function Project(options) {
  this.title = options.title;
  this.category = options.category;
  this.client = options.client;
  this.clientUrl = options.clientUrl;
  this.completeDate = options.completeDate;
  this.webLink = options.webLink;
  this.body = options.body;
}

Project.prototype.toHtml = function() {
  var source = $('#prj-template').text();
  var template = Handlebars.compile(source);

  this.daysAgo = parseInt((new Date() - new Date(this.completeDate))/60/60/24/1000);
  this.completeStatus = this.completeDate ? 'Completed about '+ this.daysAgo + ' days ago' : 'DRAFT';

  return template(this);
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
