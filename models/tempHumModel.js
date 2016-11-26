/**
 * Created by CoderSong on 16/11/26.
 */

'use strict';

let mongoose = require('mongoose');
let tempHumSchema = require('../schemas/tempHumSchema');
let TempHum = mongoose.model('TempHum',tempHumSchema);

module.exports = TempHum;