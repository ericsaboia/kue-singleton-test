var fs   = require('fs');
var kue  = require('./kue/singleton');
var jobs = kue.createQueue();
var pace;

jobs.state('inactive', function (err, ids) {
  if (ids.length) pace = require('pace')(ids.length);
  processHandlers();
});

jobs.on('job complete', function(id) {
  pace.op();
});

function processHandlers () {
  for (var i = 1; i <= 60; i++) {
    jobs.process('handler_'+i, 2, handler);
  };
}

function handler (job, done) {
  var read = fs.readFileSync('./read.txt');
  fs.writeFileSync('/tmp/writed_'+job.id+'.txt', read);
  done();
}

