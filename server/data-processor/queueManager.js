const DateDiff = require('date-diff');

var QueueManager = function(reqPerMin) {
  this.queue = [];
  this.reqPerMin = reqPerMin;
  this.requestsRemaining = reqPerMin;
  this.sessionStartTime = new Date();
  this.secondsBeforeRequestReset = 60;
  
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
      .catch((err) => item.reject(err));
    self.dequeue();
  } else if (this.requestsRemaining > 1) {
    console.log('Nothing in queue.  Waiting 1s.');
    //We have requests but not items queued.  Wait 100ms an check again
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

