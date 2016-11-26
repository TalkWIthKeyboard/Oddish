/**
 * Created by CoderSong on 16/11/27.
 */

'use strict';

let mongoose = require('mongoose'),
    config = require('./../service/config');

let RuffSchema = new mongoose.Schema({
  name: String,
  isUse: Number,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

RuffSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  }
  else {
    this.updateAt = Date.now()
  }
  next()
});

RuffSchema.statics = {

  findByName: function (name, cb) {
    return this
        .find({name: name})
        .sort('updateAt')
        .exec(cb)
  },

  findByIsUse: function (cb) {
    return this
        .find({isUse: config.IS_USE.notUse.key})
        .sort('createAt')
        .exec(cb)
  },

  findById: function (id, cb) {
    return this
        .findOne({_id: id})
        .exec(cb)
  }
};

module.exports = RuffSchema;