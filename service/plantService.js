/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let pub = {};
let moment = require('moment');

/**
 * 计算植物的真实年龄
 * @param createDate
 * @param age
 * @returns {*}
 */
pub.realAge = (createDate, age) => {

  let createMoment = new moment(createDate);
  let nowMoment = new moment();
  return age + nowMoment.diff(createMoment, 'years', true);
};

module.exports = pub;