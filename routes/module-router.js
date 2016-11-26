/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let router = require('express').Router();
let plant = require('./../routes/ruff/plantRoutes');

/**
 * 植物相关操作
 */
router.get('/app/plants/all/:page', plant.findPagination);
router.get('/app/plants/name/:name/:page', plant.findNamePagination);
router.get('/app/plants/plant/:id', plant.findPlant);
router.post('/app/plants/plant', plant.createPlant);
router.put('/app/plants/plant/:id', plant.changePlant);
router.delete('/app/plants/plant/:id', plant.deletePlant);


module.exports = router;