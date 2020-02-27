'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bitcore = require('bitcore-lib');
var utils = require('../utils');
var BufferReader = bitcore.encoding.BufferReader;
var BufferWriter = bitcore.encoding.BufferWriter;

/**
 * @param {Object=} options
 * @param {Number=} options.feerate
 * @extends Message
 * @constructor
 */
function FeefilterMessage(arg, options) {
  Message.call(this, options);
  this.command = 'feefilter';
  this.feerate = options.feerate;
}
inherits(FeefilterMessage, Message);

FeefilterMessage.prototype.setPayload = function(payload) {
  var parser = new BufferReader(payload);

  this.feerate = parser.readUInt64LEBN();

  utils.checkFinished(parser);
};

FeefilterMessage.prototype.getPayload = function() {
  var bw = new BufferWriter();

  bw.writeUInt64LEBN(this.feerate);

  return bw.concat();
};

module.exports = FeefilterMessage;
