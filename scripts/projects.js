(function(module) {

  function Project(opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
  }

  Project.all = [];

  Project.prototype.toHtml = function() {
    var template = Handlebars.compile($('#prj-template').text());

    this.daysAgo = parseInt((new Date() - new Date(this.completeDate))/60/60/24/1000);
    this.completeStatus = this.completeDate ? 'Completed about '+ this.daysAgo + ' days ago' : 'DRAFT';

    return template(this);
  }

  Project.prototype.buildFooter = function() {
    var footerInfo = Handlebars.compile($('#footer-template').text());

    this.prjCount = Project.all.length;
    this.numWords = Project.wordCount();

    return footerInfo(this);
  }

  Project.wordCount = function() {
    return Project.all.map(function(project) {
      return project.body.match(/\b\w+/g).length;
    })
    .reduce(function(a,b) {
      return(a+b);
    })
  }

  Project.loadAll = function(rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.completeDate)) - (new Date(a.completeDate));
    })
    rawData.map(function(ele) {
      return Project.all.push(new Project(ele));
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

  module.Project = Project;
}(window));
