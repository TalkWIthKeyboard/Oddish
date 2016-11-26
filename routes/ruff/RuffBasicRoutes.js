/**
 * Created by CoderSong on 16/11/27.
 */
'use strict';

let pub = {},
    _ = require('underscore'),
    Ruff = require('./../../models/ruffModel'),
    config = require('./../../service/config'),
    ERROR_INFO = require('./../../service/config').ERROR_INFO;

/**
 * 创建ruff设备
 * @param req
 * @param res
 */
pub.createRuff = (req, res) => {

  let ruffName = req.params.ruffName || false;
  if (ruffName) {
    Ruff.findByName(ruffName, (err, ruff) => {
      if (ruff != null){
        res.json(ERROR_INFO.RUFF_ERR)
      } else {
        let _ruff = new Ruff({
          name: ruffName,
          isUse: config.IS_USE['notUse'].key
        });

        _ruff.save((err, ruff) => {
          if (err) {
            res.json(ERROR_INFO.DB_SAVE_ERR)
          } else {
            res.json({
              "info": ERROR_INFO.SUCCESS,
              "ruffId": ruff.id
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
 * 获取所有可用ruff设备
 * @param req
 * @param res
 */
pub.getAllRuff = (req, res) => {

  Ruff.findByIsUse((err, ruffs) => {
    if (err) {
      res.json(ERROR_INFO.DB_SELECT_ERR)
    } else {
      res.json({
        "info": ERROR_INFO.SUCCESS,
        "ruffs": ruffs
      })
    }
  })
};


module.exports = pub;