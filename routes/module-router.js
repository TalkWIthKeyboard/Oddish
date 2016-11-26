/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let router = require('express').Router(),
    plant = require('./ios/AppPlantRoutes'),
    ruffData = require('./ruff/RuffDataRoutes'),
    iosData = require('./ios/AppDataRoutes');

/**
 * 植物相关操作
 */
router.get('/app/plants/all/:page', plant.findPagination);
router.get('/app/plants/name/:name/:page', plant.findNamePagination);
router.get('/app/plants/plant/:id', plant.findPlant);
router.post('/app/plants/plant', plant.createPlant);
router.put('/app/plants/plant/:id', plant.changePlant);
router.delete('/app/plants/plant/:id', plant.deletePlant);

/**
 * 数据相关操作
 */
// 温湿度
router.get('/app/plant/:plantId/data/tempHum/day/:days', iosData.getTempHumByDays);
router.post('/ruff/plant/:plantId/data/tempHum', ruffData.saveTempHum);
// 危险事件
router.get('/app/plant/:plantId/data/dangerEvent', iosData.getDangerEvent);
router.post('/ruff/plant/:plantId/data/dangerEvent', ruffData.saveDangerEvent);
router.get('/ruff/plant/data/dangerEvent/:eventId', ruffData.solveDangerEvent);


module.exports = router;