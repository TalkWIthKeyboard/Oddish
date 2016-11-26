/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let pub = {},
    _ = require('underscore'),
    Plant = require('./../../models/plantModel'),
    Illumination = require('./../../models/illuminationModel'),
    TempHum = require('./../../models/tempHumModel'),
    Sound = require('./../../models/soundModel'),
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
      ruffId = req.params.ruffId;

  if (ruffId && temperature && humidity) {
    Plant.findByRuffId(ruffId, (err, plant) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SELECT_ERR)
      } else {
        let _tempHum = new TempHum({
          plantId: plant.id,
          temperature: temperature,
          humidity: humidity
        });

        _tempHum.save((err, th) => {
          if (err) {
            console.log(err);
            res.json(ERROR_INFO.DB_SAVE_ERR);
          } else {
            res.json({
              "info": ERROR_INFO.SUCCESS,
              "classId": th.id
            })
          }
        })
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR);
  }
};

/**
 * 保存光照
 * @param req
 * @param res
 */
pub.saveIllumination = (req, res) => {
  let illumination = req.body.illumination || false,
      ruffId = req.params.ruffId || false;

  if (ruffId && illumination) {
    Plant.findByRuffId(ruffId, (err, plant) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SELECT_ERR);
      } else {
        let _illumination = new Illumination({
          plantId: plant.id,
          illumination: illumination
        });

        _illumination.save((err, ill) => {
          if (err) {
            console.log(err);
            res.json(ERROR_INFO.DB_SAVE_ERR);
          } else {
            res.json({
              "info": ERROR_INFO.SUCCESS,
              "classId": ill.id
            })
          }
        })
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR);
  }
};


/**
 * 保存危险事件
 * @param req
 * @param res
 */
pub.saveDangerEvent = (req, res) => {
  let ruffId = req.params.ruffId || false,
      event = req.body.event || false,
      classId = req.body.classId || false;

  if (ruffId && event && classId) {
    Plant.findByRuffId(ruffId, (err, plant) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SELECT_ERR);
      } else {
        let _dangerEvent = new DangerEvent({
          plantId: plant.id,
          event: event,
          classId: classId,
          sentence: null,
          isSend: config.IS_SEND['notSend'].key,
          isSolve: config.IS_SOLVE['notSolve'].key
        });

        _dangerEvent.save((err, dangerEvent) => {
          if (err) {
            console.log(err);
            res.json(ERROR_INFO.DB_SAVE_ERR);
          } else {
            res.json({
              "info": ERROR_INFO.SUCCESS,
              "dangerEventId": dangerEvent.id
            })
          }
        })
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR);
  }
};


/**
 * 保存声音信息
 * @param req
 * @param res
 */
pub.saveSound = (req, res) => {
  let ruffId = req.params.ruffId || false,
      sound = req.body.sound || false;
  if (ruffId && sound) {
    Plant.findByRuffId(ruffId, (err, plant) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SELECT_ERR);
      } else {
        let _sound = Sound({
          plantId: plant.id,
          sound: sound
        });

        _sound.save((err, sound) => {
          if (err){
            console.log(err);
            res.json(ERROR_INFO.DB_SAVE_ERR);
          } else {
            res.json({
              "info": ERROR_INFO.SUCCESS,
              "classId": sound.id
            })
          }
        })
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR)
  }
};


/**
 * 解决危险事件
 * @param req
 * @param res
 */
pub.solveDangerEvent = (req, res) => {

  let eventId = req.params.eventId || false;

  if (eventId) {
    DangerEvent.findById(eventId, (err, dangerEvent) => {
      if (err) {
        res.json(ERROR_INFO.DANGER_EVENT_ERR)
      } else {
        if (dangerEvent.isSolve == config.IS_SOLVE["notSolve"].key) {
          dangerEvent.isSolve = config.IS_SOLVE["solve"].key;
          dangerEvent.isSend = config.IS_SEND["notSend"].key;
          // TODO 交流的话要修改
          dangerEvent.sentence = null;
          dangerEvent.save((err) => {
            if (err) {
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
