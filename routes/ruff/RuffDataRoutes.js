/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let pub = {},
    _ = require('underscore'),
    TempHum = require('./../../models/tempHumModel'),
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

module.exports = pub;
