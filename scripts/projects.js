function Project(options) {
  this.title = options.title;
  this.category = options.category;
  this.client = options.client;
  this.clientUrl = options.clientUrl;
  this.completeDate = options.completeDate;
  this.webLink = options.webLink;
  this.body = options.body;
  this.imageUrl = options.imageUrl;
}

Project.all = [];

Project.prototype.toHtml = function() {
  var source = $('#prj-template').text();
  var template = Handlebars.compile(source);

  this.daysAgo = parseInt((new Date() - new Date(this.completeDate))/60/60/24/1000);
  this.completeStatus = this.completeDate ? 'Completed about '+ this.daysAgo + ' days ago' : 'DRAFT';

  return template(this);
}

Project.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.completeDate)) - (new Date(a.completeDate));
  })

  rawData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  })
}

Project.fetchAll = function() {
  $.getJSON('data/prjData.json', function(data) {
    localStorage.rawData = (JSON.stringify(data));
    Project.loadAll(JSON.parse(localStorage.rawData));
    pageView.initIndex();
  })
}

Project.localCheck = function() {
  if (localStorage.rawData) {
    $.ajax({
      type: 'HEAD',
      url: 'data/prjData.json',
      success: function(data, message, xhr) {
        console.log(xhr);
        var eTag = xhr.getResponseHeader('eTag');
        if(!localStorage.eTag || eTag != localStorage.eTag) {
          localStorage.eTag = eTag;
          Project.fetchAll();
        } else {
          Project.loadAll(JSON.parse(localStorage.rawData));
          pageView.initIndex();
        }
      }
    })
  } else {
    Project.fetchAll();
  };
}
