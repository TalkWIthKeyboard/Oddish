/**
 * Created by CoderSong on 16/11/26.
 */

'use strict';

let mongoose = require('mongoose');
let config = require('./../service/config');

let soundSchema = new mongoose.Schema({
  plantId: String,
  sound: Number,
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

soundSchema.pre('save', function (next) {

  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  }
  else {
    this.updateAt = Date.now()
  }
  next()
});

soundSchema.statics = {

  /**
   * 通过plantId和天数查找
   * @param plantId
   * @param dayNum 天数
   * @param cb
   * @returns {*|Array|{index: number, input: string}}
   */
  findByPlantIdAndDays: function (plantId, dayNum, cb) {
    return this
        .find({
          plantId: plantId,
          createAt: {
            "$gte": new Date(new Date() - dayNum * 24 * 60 * 60 * 1000),
            "$lt": new Date()
          }
        })
        .sort(this.createAt)
        .exec(cb)
  },

  findById: function (id, cb) {
    return this
        .findOne({_id: id})
        .exec(cb)
  },

  findAtNow: function (cb) {
    return this
        .findOne({})
        .sort({updateAt: -1})
        .exec(cb)
  }
};

module.exports = soundSchema;