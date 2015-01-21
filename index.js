(function(window){

  'use strict';

  // noConflict
  var Promise = window.Promise.noConflict(window.Promise);

  function get() {
    return new Promise(function(resolve, reject) {
      var value = Math.floor(Math.random() * 2);

      (value === 1) ? resolve(value) : reject(value);
    });
  }

  function ViewModel() {
    this.list = ko.observableArray([]);
    this.add = (function() {
      var that = this;

      get().then(function(value) {
        // resolve
        that.list.unshift({
          text: 'resolve: ' + value + ' / ' + new Date
        });
      }).caught(function(value) {
        // reject
        // caught is alias of catch, useful for old browsers
        that.list.unshift({
          text: 'reject: ' + value + ' / ' + new Date
        });
      });
    }).bind(this);
  }

  ko.applyBindings(new ViewModel);

}(window));
