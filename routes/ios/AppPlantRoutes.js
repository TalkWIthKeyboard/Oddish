/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let pub = {};
let _ = require('underscore');
let Promise = require('promise');
let Plant = require('./../../models/plantModel');
let config = require('./../../service/config');
let Ruff = require('./../../models/ruffModel');
let PlantService = require('./../../service/plantService');
let SoundModel = require('./../../models/soundModel');
let TempHumModel = require('./../../models/tempHumModel');
let Illumination = require('./../../models/illuminationModel');
let Varieties = require('./../../models/varietiesModel');
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
      sex = req.body.sex || false,
      age = req.body.age || false,
      ruffName = req.body.ruffName || false;
  // TODO 图片

  if (name && varieties && sex && img && age && ruffName) {
    Ruff.findByName(ruffName, (err, ruff) => {
      if (err || ruff.isUse == config.IS_USE.use.key) {
        res.json(ERROR_INFO.DB_SELECT_ERR);
      } else {
        let _plant = new Plant({
          name: name,
          varieties: varieties,
          img: img,
          sex: sex,
          age: age,
          mood: 100,
          ruffId: ruffName
        });

        _plant.save((err, plant) => {
          if (err) {
            console.log(err);
            res.json(ERROR_INFO.DB_SAVE_ERR)
          } else {
            ruff.isUse = config.IS_USE.use.key;
            ruff.save((err) => {
              if (err) {
                console.log(err);
                res.json(ERROR_INFO.DB_CHANGE_ERR);
              } else {
                res.json({
                  "info": ERROR_INFO.SUCCESS,
                  "id": plant.id
                })
              }
            })
          }
        })
      }
    })
  } else {
    return res.json(ERROR_INFO.REQUEST_ERR)
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
    return res.json(ERROR_INFO.REQUEST_ERR)
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
    Plant.findById(id, (err, plant) => {
      if (err) {
        res.json(ERROR_INFO.PLANT_ERR);
      } else {
        Ruff.findById(plant.ruffId, (err, ruff) => {
          ruff.isUse = config.IS_USE.notUse.key;
          ruff.save((err) => {
            if (err) {
              res.json(ERROR_INFO.DB_CHANGE_ERR)
            } else {
              Plant.deleteById(id, (err) => {
                if (err) {
                  res.json(ERROR_INFO.DB_DELETE_ERR)
                } else {
                  res.json(ERROR_INFO.SUCCESS)
                }
              })
            }
          })
        })
      }
    });
  } else {
    return res.json(ERROR_INFO.REQUEST_ERR)
  }
};


/**
 * 构造promise数组
 * @returns {[*,*,*]}
 */
function makePromise() {
  let soundPromise = new Promise((resolve, reject) => {
    SoundModel.findAtNow((err, sound) => {
      err ? reject(err) : resolve(sound.sound)
    })
  });

  let tempHumPromise = new Promise((resolve, reject) => {
    TempHumModel.findAtNow((err, tempHum) => {
      err ? reject(err) : resolve([tempHum.temperature,tempHum.humidity])
    })
  });

  let illuminationPromise = new Promise((resolve, reject) => {
    Illumination.findAtNow((err, illumination) => {
      err ? reject(err) : resolve(illumination.illumination)
    })
  });

  return [soundPromise, tempHumPromise, illuminationPromise];
}


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
        let paramsArr = makePromise();
        Promise.all(paramsArr).then((results) => {
          plant.age = PlantService.realAge(plant.createAt, plant.age);
          res.json({
            "info": ERROR_INFO.SUCCESS,
            "plant": plant,
            "params": results
          })
        });
      }
    })
  } else {
    return res.json(ERROR_INFO.REQUEST_ERR)
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
      _.map(plants, (plant) => {
        plant.age = PlantService.realAge(plant.createAt, plant.age);
      });

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
      _.map(plants, (plant) => {
        plant.age = PlantService.realAge(plant.createAt, plant.age);
      });

      res.json({
        "info": ERROR_INFO.SUCCESS,
        "plants": plants,
        "page": page
      })
    }
  })
};


/**
 * 创建植物类型
 * @param req
 * @param res
 */
pub.createVarieties = (req, res) => {

  let name = req.body.name || false,
      temperatureMin = req.body.temperatureMin || false,
      temperatureMax = req.body.temperatureMax || false,
      humidityMin = req.body.humidityMin || false,
      humidityMax = req.body.humidityMax || false,
      illuminationMax = req.body.illuminationMax || false;

  if (name && temperatureMin && temperatureMax && humidityMin && humidityMax && illuminationMax) {
    let _varieties = new Varieties({
      name: name,
      temperatureMin: temperatureMin,
      temperatureMax: temperatureMax,
      humidityMin: humidityMin,
      humidityMax: humidityMax,
      illuminationMax: illuminationMax
    });

    _varieties.save((err, varieties) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SAVE_ERR);
      } else {
        res.json({
          "info": ERROR_INFO.SUCCESS,
          "varietiesId": varieties.id
        })
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR)
  }
};


/**
 * 修改植物类型
 * @param req
 * @param res
 */
pub.changeVarieties = (req, res) => {

  let name = req.body.name || false,
      temperatureMin = req.body.temperatureMin || false,
      temperatureMax = req.body.temperatureMax || false,
      humidityMin = req.body.humidityMin || false,
      humidityMax = req.body.humidityMax || false,
      illuminationMax = req.body.illuminationMax || false,
      id = req.params.id || false;

  if (name && temperatureMin && temperatureMax && humidityMin && humidityMax && illuminationMax && id) {
    Varieties.findById(id, (err, varieties) => {
      if (err) {
        console.log(err);
        res.json(ERROR_INFO.DB_SELECT_ERR);
      } else {
        varieties.name = name;
        varieties.temperatureMin = temperatureMin;
        varieties.temperatureMax = temperatureMax;
        varieties.humidityMin = humidityMin;
        varieties.humidityMax = humidityMax;
        varieties.illuminationMax = illuminationMax;

        varieties.save((err) => {
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
    res.json(ERROR_INFO.REQUEST_ERR)
  }
};


/**
 * 获取所有的类型列表
 * @param req
 * @param res
 */
pub.getAllVarieties = (req, res) => {

  Varieties.findAll((err, varieties) => {
    if (err) {
      console.log(err);
      res.json(ERROR_INFO.DB_SELECT_ERR);
    } else {
      res.json({
        "info": ERROR_INFO.SUCCESS,
        "varieties": varieties
      })
    }
  })
};


/**
 * 根据ruffId获取类型
 * @param req
 * @param res
 */
pub.getVarietiesByRuffId = (req, res) => {

  let ruffId = req.params.ruffId || false;
  if (ruffId) {
    Plant.findByRuffId(ruffId, (err, plant) => {
      if (err){
        console.log(err);
        res.json(ERROR_INFO.DB_SELECT_ERR);
      } else {
        res.json({
          "info": ERROR_INFO.SUCCESS,
          "varieties": plant.varieties
        })
      }
    })
  } else {
    res.json(ERROR_INFO.REQUEST_ERR)
  }
};
module.exports = pub;