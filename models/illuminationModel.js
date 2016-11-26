/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

let mongoose = require('mongoose');
let illuminationSchema = require('../schemas/illuminationSchema');
let Illumination = mongoose.model('illumination',illuminationSchema);

module.exports = Illumination;