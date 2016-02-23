
var QueueManager = function(reqPerMin, functionToManageRemainingRequests) {
  this.queue = [];
  this.reqPerMin = reqPerMin;
  this.requestsRemaining = reqPerMin;
  this.functionToManageRemainingRequests = functionToManageRemainingRequests;
};

QueueManager.prototype.enqueue = function(fn, argsArray) {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.queue.push({fn: fn, params: argsArray, resolve: resolve});
    console.log(fn, argsArray, self.queue.length);
  });
};

QueueManager.prototype.dequeue = function() {
  var self = this;
  if (this.queue.length > 0 && this.requestsRemaining > 1) {
    var item = this.queue.shift();  
    item.fn.apply(null, item.params)
      .then((result) => {
        self.updateRequestsRemaining(result);
        item.resolve(result);
        self.dequeue();
      });
  } else if (this.requestsRemaining > 1) {
    console.log('Nothing in queue.  Waiting 1s.');
    //We have requests but not items queued.  Wait 100ms an check again
    setTimeout(this.dequeue.bind(this), 1000);
  } else {
    //We only have 1 request remaining, wait 60sec and call dequeue again. 
    //Our limit should be back by then
    console.log(`Waiting 60 seconds.  ${this.queue.length} items in queue`);
    this.requestsRemaining = this.reqPerMin;
    setTimeout(() => this.dequeue.bind(this), 60000);
  }
};

QueueManager.prototype.createQueuedFunction = function(fn) {
  var self = this;
  return function() {
    return self.enqueue(fn, Array.prototype.slice.apply(arguments));
  };
};

QueueManager.prototype.updateRequestsRemaining = function(result) {
  this.requestsRemaining = this.functionToManageRemainingRequests(result);
};

module.exports = QueueManager;

