/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let pub = {},
    _ = require('underscore'),
    DangerEvent = require('./../../models/dangerEventModel'),
    Illumination = require('./../../models/illuminationModel'),
    TempHum = require('./../../models/tempHumModel'),
    config = require('./../../service/config'),
    ERROR_INFO = require('./../../service/config').ERROR_INFO;

/**
 * 按照天来获取温度湿度数据
 * @param req
 * @param res
 */
pub.getTempHumByDays = (req, res) => {

  let plantId = req.params.plantId || false;
  let days = req.params.days || 1;

  if (plantId && (days == 1 || days == 7)) {
    TempHum.findByPlantIdAndDays(plantId, days, (err, data) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SELECT_ERR);
      } else {
        res.json({
          "info": ERROR_INFO.SUCCESS,
          "data": data
        })
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR);
  }
};


/**
 * 按照天来获取光照数据
 * @param req
 * @param res
 */
pub.getIllumination = (req, res) => {

  let plantId = req.params.plantId || false;
  let days = req.params.days || 1;
  if (plantId && (days == 1 || days == 7)) {
    Illumination.findByPlantIdAndDays(plantId, days, (err, data) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SELECT_ERR);
      } else {
        res.json({
          "info": ERROR_INFO.SUCCESS,
          "data": data
        })
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR);
  }
};


/**
 * 获取没有发送的紧急事件(一个植物的)
 * @param req
 * @param res
 */
pub.getDangerEventOnePlant = (req, res) => {

  let plantId = req.params.plantId || false;

  if (plantId) {
    DangerEvent.findByIsSendAndPlantId(plantId, (err, dangerEventList) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SELECT_ERR);
      } else {
        res.json({
          "info": ERROR_INFO.SUCCESS,
          "dangerEventList": dangerEventList
        });

        _.forEach(dangerEventList, (dangerEvent) => {
          dangerEvent.isSend = config.IS_SEND["send"].key;
          // TODO 处理不了异常事件
          dangerEvent.save();
        })
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR)
  }
};


/**
 * 获取没有发送的紧急事件(所有植物的)
 * @param req
 * @param res
 */
pub.getDangerEventAll = (req, res) => {

    DangerEvent.findAll((err, dangerEventList) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SELECT_ERR);
      } else {
        res.json({
          "info": ERROR_INFO.SUCCESS,
          "dangerEventList": dangerEventList
        });

        _.forEach(dangerEventList, (dangerEvent) => {
          dangerEvent.isSend = config.IS_SEND["send"].key;
          // TODO 处理不了异常事件
          dangerEvent.save();
        })
      }
    })

};


module.exports = pub;