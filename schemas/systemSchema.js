/**
 * Created by CoderSong on 16/11/27.
 */

'use strict';

let mongoose = require('mongoose');
let config = require('./../service/config');

let systemSchema = new mongoose.Schema({
  key: String,
  value: Number,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

systemSchema.pre('save', function (next) {

  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  }
  else {
    this.updateAt = Date.now()
  }
  next()
});

systemSchema.statics = {

  findByKey: function (key, cb) {
    return this
        .findOne({key: key})
        .exec(cb)
  }
};

module.exports = systemSchema;