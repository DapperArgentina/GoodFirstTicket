const DateDiff = require('date-diff');

var QueueManager = function(reqPerMin, statusCodeToNotCount) {
  this.queue = [];
  this.reqPerMin = reqPerMin;
  this.requestsRemaining = reqPerMin;
  this.sessionStartTime = new Date();
  this.secondsBeforeRequestReset = 60;
  this.statusCodeToNotCount = statusCodeToNotCount;
  this.dequeue();
};

QueueManager.prototype.checkRequestTimer = function() {
  var diff = new DateDiff(new Date(), this.sessionStartTime);
  
  //Reset counter
  if(diff.seconds() > this.secondsBeforeRequestReset) {
    this.requestsRemaining = this.reqPerMin;
    this.sessionStartTime = new Date();
  }
};

QueueManager.prototype.enqueue = function(fn, argsArray) {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.queue.push({fn: fn, params: argsArray, resolve: resolve, reject: reject});
    console.log(fn, argsArray, self.queue.length);
  });
};

QueueManager.prototype.dequeue = function() {
  var self = this;
  this.checkRequestTimer();
  if (this.queue.length > 0 && this.requestsRemaining > 0) {
    this.requestsRemaining--;
    var item = this.queue.shift();  
    item.fn.apply(null, item.params)
      .then((result) => item.resolve(result))
      .catch((err) => {
        if(err.statusCode === self.statusCodeToNotCount) {
          self.requestsRemaining++;
        }
        item.reject(err);
      });
    //We delay our next dequeue slightly so we have time to get a reponse from previous request
    //This allows us to take advantage of the case when we have statusCodeToNotCount and some requests
    //end up not counting against us
    setTimeout(this.dequeue.bind(this), 100);
  } else if (this.requestsRemaining > 1) {
    setTimeout(this.dequeue.bind(this), 1000);
  } else {
    //We are out of requests.  Schedule a wait until the reset.  We add 100ms to make sure
    //checkRequestTimer actually thinks its time to reset.
    console.log(`Waiting 60 seconds.  ${this.queue.length} items in queue`);
    setTimeout(this.dequeue.bind(this), this.secondsBeforeRequestReset*1000 + 100);
  }
};

QueueManager.prototype.createQueuedFunction = function(fn) {
  var self = this;
  return function() {
    return self.enqueue(fn, Array.prototype.slice.apply(arguments));
  };
};

module.exports = QueueManager;

