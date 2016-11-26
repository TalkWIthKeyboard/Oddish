/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let router = require('express').Router(),
    plant = require('./ios/AppPlantRoutes'),
    ruffData = require('./ruff/RuffDataRoutes'),
    iosData = require('./ios/AppDataRoutes'),
    ruff = require('./ruff/RuffBasicRoutes');

/**
 * 植物相关操作
 */
// 植物
router.get('/app/plants/all/:page', plant.findPagination);
router.get('/app/plants/name/:name/:page', plant.findNamePagination);
router.get('/app/plants/plant/:id', plant.findPlant);
router.post('/app/plants/plant', plant.createPlant);
router.put('/app/plants/plant/:id', plant.changePlant);
router.delete('/app/plants/plant/:id', plant.deletePlant);
// RUFF
router.get('/app/ruffs/all', ruff.getAllRuff);
router.post('/ruff/ruffs/name/:ruffName',ruff.createRuff);


/**
 * 数据相关操作
 */
// 温湿度
router.get('/app/plant/:plantId/data/tempHum/day/:days', iosData.getTempHumByDays);
router.post('/ruff/plant/:ruffId/data/tempHum', ruffData.saveTempHum);
// 光照
router.get('/app/plant/:plantId/data/illumination/day/:days', iosData.getIllumination);
router.post('/ruff/plant/:ruffId/data/illumination', ruffData.saveIllumination);
// 声音
router.get('/app/plant/:plantId/data/sound/day/:days', iosData.getSound);
router.post('/ruff/plant/:ruffId/data/sound',ruffData.saveSound);
// 危险事件
router.get('/app/plant/:plantId/data/dangerEvent', iosData.getDangerEventOnePlant);
router.get('/app/plants/data/dangerEvent', iosData.getDangerEventAll);
router.post('/ruff/plant/:ruffId/data/dangerEvent', ruffData.saveDangerEvent);
router.get('/ruff/plant/data/dangerEvent/:eventId', ruffData.solveDangerEvent);



module.exports = router;