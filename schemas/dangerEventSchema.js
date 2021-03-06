/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let mongoose = require('mongoose'),
    config = require('./../service/config');

let DangerEventSchema = new mongoose.Schema({
  plantId: {
    type : mongoose.Schema.ObjectId,
    ref : 'Plant'
  },
  event: String,
  classId: String,
  sentence: String,
  isSend: Number,
  isSolve: Number,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

DangerEventSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  }
  else {
    this.updateAt = Date.now()
  }
  next()
});

DangerEventSchema.statics = {
  findByIsSendAndPlantId: function (id, cb) {
    return this
        .find({
          plantId: id,
          isSend: config.IS_SEND['notSend'].key
        })
        .populate('plantId')
        .sort('createAt')
        .exec(cb)
  },

  findById: function (id, cb) {
   return this
       .findOne({_id: id})
       .exec(cb)
  },

  findAll: function (cb) {
    return this
        .find({
          isSend: config.IS_SEND['notSend'].key
        })
        .populate('plantId')
        .sort('createAt')
        .exec(cb)
  }
};

module.exports = DangerEventSchema;