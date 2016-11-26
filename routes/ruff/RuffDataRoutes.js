/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let pub = {},
    _ = require('underscore'),
    TempHum = require('./../../models/tempHumModel'),
    DangerEvent = require('./../../models/dangerEventModel'),
    config = require('./../../service/config'),
    ERROR_INFO = require('./../../service/config').ERROR_INFO;

/**
 * 保存温度和湿度
 * @param req
 * @param res
 */
pub.saveTempHum = (req, res) => {
  let temperature = req.body.temperature || false,
      humidity = req.body.humidity || false,
      plantId = req.params.plantId;

  if (plantId && temperature && humidity){
    let _tempHum = new TempHum({
      plantId: plantId,
      temperature: temperature,
      humidity: humidity
    });

    _tempHum.save((err, th) => {
      if (err){
        console.log(err);
        res.json(ERROR_INFO.DB_SAVE_ERR);
      } else {
        res.json({
          "info": ERROR_INFO.SUCCESS,
          "thId": th.id
        })
      }
    })
  } else {
    return res.json(ERROR_INFO.REQUEST_ERR);
  }
};


/**
 * 保存危险事件
 * @param req
 * @param res
 */
pub.saveDangerEvent = (req, res) => {
  let plantId = req.params.plantId,
      event = req.body.event,
      classId = req.body.classId;

  if (plantId && event && classId){

    let _dangerEvent = new DangerEvent({
      plantId: plantId,
      event: event,
      classId: classId,
      sentence: null,
      isSend: config.IS_SEND['notSend'].key,
      isSolve: config.IS_SOLVE['notSolve'].key
    });

    _dangerEvent.save((err, dangerEvent) => {
      if (err){
        console.log(err);
        res.json(ERROR_INFO.DB_SAVE_ERR);
      } else {
        res.json({
          "info": ERROR_INFO.SUCCESS,
          "dangerEvent": dangerEvent
        })
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR);
  }
};


/**
 * 解决危险事件
 * @param req
 * @param res
 */
pub.solveDangerEvent = (req, res) => {

  let eventId = req.params.eventId || false;

  if (eventId){
    DangerEvent.findById(eventId, (err, dangerEvent) => {
      if (err){
        res.json(ERROR_INFO.DANGER_EVENT_ERR)
      } else {
        if (dangerEvent.isSolve == config.IS_SOLVE["notSolve"].key){
          dangerEvent.isSolve = config.IS_SOLVE["solve"].key;
          dangerEvent.isSend = config.IS_SEND["notSend"].key;
          // TODO 交流的话要修改
          dangerEvent.sentence = null;
          dangerEvent.save((err) => {
            if (err){
              console.log(err);
              res.json(ERROR_INFO.DB_CHANGE_ERR);
            } else {
              res.json(ERROR_INFO.SUCCESS);
            }
          })
        } else {
          res.json(ERROR_INFO.DANGER_EVENT_SOLVE_ERR);
        }
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR)
  }
};


module.exports = pub;
