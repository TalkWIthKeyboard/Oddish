/**
 * Created by CoderSong on 16/11/27.
 */

'use strict';

let mongoose = require('mongoose');
let ruffSchema = require('../schemas/ruffSchema');
let Ruff = mongoose.model('ruff',ruffSchema);

module.exports = Ruff;