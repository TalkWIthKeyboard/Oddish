/**
 * Created by CoderSong on 16/11/26.
 */

'use strict';

let mongoose = require('mongoose'),
    config = require('./../service/config');

let PlantSchema = new mongoose.Schema({
  name: String,
  ruffId: String,
  varieties: {
    type : mongoose.Schema.ObjectId,
    ref : 'Varieties'
  },
  img: String,
  sex: String,
  mood: Number,
  age: Number,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

PlantSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  }
  else {
    this.updateAt = Date.now()
  }
  next()
});

PlantSchema.statics = {
  findByPage: function (page, cb) {
    return this
        .find({})
        .populate('varieties')
        .skip((page - 1) * config.pageSize)
        .limit(config.pageSize)
        .sort('updateAt')
        .exec(cb)
  },

  findById: function (id, cb) {
    return this
        .findOne({_id: id})
        .populate('varieties')
        .exec(cb)
  },

  findByName: function (name, page, cb) {
    let reg = new RegExp(name);
    return this
        .find({name: {$regex: reg}})
        .populate('varieties')
        .skip((page - 1) * config.pageSize)
        .limit(config.pageSize)
        .sort('updateAt')
        .exec(cb)
  },

  findByRuffId: function (ruffId, cb) {
    return this
        .findOne({ruffId: ruffId})
        .populate('varieties')
        .exec(cb)
  },

  deleteById: function (id, cb) {
    return this
        .remove({_id: id})
        .exec(cb)

  }
};

module.exports = PlantSchema;