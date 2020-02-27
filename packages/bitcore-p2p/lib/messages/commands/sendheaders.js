'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bitcore = require('bitcore-lib');
var utils = require('../utils');
var BufferReader = bitcore.encoding.BufferReader;
var BufferWriter = bitcore.encoding.BufferWriter;

/**
 * @param {Object=} options
 * @extends Message
 * @constructor
 */
function SendheadersMessage(arg, options) {
  Message.call(this, options);
  this.command = 'sendheaders';
}
inherits(SendheadersMessage, Message);

SendheadersMessage.prototype.setPayload = function(payload) {
  var parser = new BufferReader(payload);
  utils.checkFinished(parser);
};

SendheadersMessage.prototype.getPayload = function() {
  var bw = new BufferWriter();
  return bw.concat();
};

module.exports = SendheadersMessage;
