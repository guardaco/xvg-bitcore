'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bitcore = require('bitcore-lib');
var utils = require('../utils');
var BufferReader = bitcore.encoding.BufferReader;
var BufferWriter = bitcore.encoding.BufferWriter;

/**
 * @param {Object=} options
 * @param {Boolean=} options.bool
 * @param {Number=} options.version
 * @extends Message
 * @constructor
 */
function SendcmpctMessage(arg, options) {
  Message.call(this, options);
  this.command = 'sendcmpct';
  this.bool = options.bool || false;
  this.version = options.version || 0;
}
inherits(SendcmpctMessage, Message);

SendcmpctMessage.prototype.setPayload = function(payload) {
  var parser = new BufferReader(payload);

  this.bool = !!parser.readUInt8();
  this.version = parser.readUInt64LEBN();

  utils.checkFinished(parser);
};

SendcmpctMessage.prototype.getPayload = function() {
  var bw = new BufferWriter();
  bw.writeUInt8(this.bool);
  bw.writeUInt64LEBN(this.version);

  return bw.concat();
};

module.exports = SendcmpctMessage;
