/**
 * Created by CoderSong on 16/11/26.
 */

'use strict';

let mongoose = require('mongoose');
let config = require('./../service/config');

let PlantSchema = new mongoose.Schema({
  name:String,
  varieties:String,
  img:String,
  sex:Number,
  mood:Number,
  meta:{
    createAt:{
      type: Date,
      default: Date.now()
    },
    updateAt:{
      type: Date,
      default: Date.now()
    }
  }
});

PlantSchema.pre('save',function (next) {
  if (this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
});

PlantSchema.statics = {
  findByPage: function (page, cb) {
    return this
        .find({})
        .skip((page - 1) * config.pageSize)
        .limit(config.pageSize)
        .sort('meta.updateAt')
        .exec(cb)
  },

  findById : function (id, cb) {
    return this
        .findOne({_id: id})
        .exec(cb)
  },

  findByName : function (name, page, cb) {
    let reg = new RegExp(name);
    return this
        .find({name: { $regex: reg }})
        .skip((page - 1) * config.pageSize)
        .limit(config.pageSize)
        .sort('meta.updateAt')
        .exec(cb)
  },

  deleteById : function (id, cb) {
    return this
        .remove({_id: id})
        .exec(cb)

  }
};

module.exports = PlantSchema;