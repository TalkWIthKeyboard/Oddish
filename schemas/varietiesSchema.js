/**
 * Created by CoderSong on 16/11/27.
 */
'use strict';

let mongoose = require('mongoose');
let config = require('./../service/config');

let varietiesSchema = new mongoose.Schema({
  name: String,
  temperatureMin: Number,
  temperatureMax: Number,
  humidityMin: Number,
  humidityMax: Number,
  illuminationMax: Number,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

varietiesSchema.pre('save', function (next) {

  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  }
  else {
    this.updateAt = Date.now()
  }
  next()
});

varietiesSchema.statics = {

  findById: function (id, cb) {
    return this
        .findOne({_id: id})
        .exec(cb)
  },

  findAll: function (cb) {
    return this
        .find({})
        .sort(this.updateAt)
        .exec(cb)
  }
};

module.exports = varietiesSchema;