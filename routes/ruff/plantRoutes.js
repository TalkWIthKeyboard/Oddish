/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let pub = {};
let Plant = require('./../../models/plantModel');
let ERROR_INFO = require('./../../service/config').ERROR_INFO;

/**
 * 创建植物
 * @param req
 * @param res
 * @returns {exports.ERROR_INFO.REQUEST_ERR|{code, value}}
 */
pub.createPlant = (req, res) => {

  let name = req.body.name || false,
      varieties = req.body.varieties || false,
      img = req.body.img || false,
      sex = req.body.sex || false;
  // TODO 图片

  if (name && varieties && sex && img) {
    let _plant = new Plant({
      name: name,
      varieties: varieties,
      img: img,
      sex: sex,
      mood: 100
    });
    _plant.save((err, plant) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SAVE_ERR)
      } else {
        res.json({
          "info": ERROR_INFO.SUCCESS,
          "id": plant.id
        });
      }
    })
  } else {
    return ERROR_INFO.REQUEST_ERR
  }
};


/**
 * 修改植物
 * @param req
 * @param res
 */
pub.changePlant = (req, res) => {

  let name = req.body.name || false,
      varieties = req.body.varieties || false,
      img = req.body.img || false,
      sex = req.body.sex || false,
      id = req.params.id || false;

  if (id && name && varieties && sex && img) {
    Plant.findById(id, (err, plant) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.PLANT_ERR);
      } else {
        plant.name = name;
        plant.varieties = varieties;
        plant.img = img;
        plant.sex = sex;
        plant.save((err) => {
          if (err) {
            console.log(err);
            res.json(ERROR_INFO.DB_CHANGE_ERR);
          } else {
            res.json(ERROR_INFO.SUCCESS);
          }
        })
      }
    })
  } else {
    return ERROR_INFO.REQUEST_ERR
  }
};


/**
 * 删除植物
 * @param req
 * @param res
 */
pub.deletePlant = (req, res) => {

  let id = req.params.id || false;
  if (id) {
    Plant.findById(id, (err) => {
      if (err) {
        res.json(ERROR_INFO.PLANT_ERR);
      } else {
        Plant.deleteById(id, (err) => {
          if (err) {
            res.json(ERROR_INFO.DB_DELETE_ERR)
          } else {
            res.json(ERROR_INFO.SUCCESS)
          }
        })
      }
    });
  } else {
    return ERROR_INFO.REQUEST_ERR
  }
};


/**
 * 查找植物
 * @param req
 * @param res
 */
pub.findPlant = (req, res) => {

  let id = req.params.id || false;
  if (id) {
    Plant.findById(id, (err, plant) => {
      if (err) {
        res.json(ERROR_INFO.PLANT_ERR);
      } else {
        res.json({
          "info": ERROR_INFO.SUCCESS,
          "plant": plant
        })
      }
    })
  } else {
    return ERROR_INFO.REQUEST_ERR
  }
};


/**
 * 分页查找所有的植物
 * @param req
 * @param res
 */
pub.findPagination = (req, res) => {

  let page = req.params.page || 1;
  Plant.findByPage(page, (err, plants) => {
    if (err) {
      res.json(ERROR_INFO.PLANT_ERR);
    } else {
      res.json({
        "info": ERROR_INFO.SUCCESS,
        "plants": plants,
        "page": page
      })
    }
  })
};


/**
 * 分页按照名字查找植物
 * @param req
 * @param res
 */
pub.findNamePagination = (req, res) => {

  let page = req.params.page || 1;
  let name = req.params.name || "";
  Plant.findByName(name, page, (err, plants) => {
    if (err) {
      res.json(ERROR_INFO.PLANT_ERR);
    } else {
      res.json({
        "info": ERROR_INFO.SUCCESS,
        "plants": plants,
        "page": page
      })
    }
  })
};

// TODO 植物图标

module.exports = pub;