var async = require('async');
var kue = require('./kue/original');
var jobs = kue.createQueue();

var handlers = [];
for (var i = 1; i <= 60; i++) {
  handlers.push('handler_'+i);
};

var jobsPerHandler = [];
for (var i = 1; i <= 80; i++) {
  jobsPerHandler.push(i);
}

async.eachLimit(handlers, 4, createJobs, process.exit);

function createJobs (handler, callback) {
  async.eachLimit(jobsPerHandler, 4, creatJob, callback);

  function creatJob (item, callback) {
    jobs.create(handler, new Float64Array(9)).save(callback);
  }
}