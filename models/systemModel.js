/**
 * Created by CoderSong on 16/11/27.
 */

'use strict';

let mongoose = require('mongoose');
let systemSchema = require('../schemas/systemSchema');
let System = mongoose.model('system',systemSchema);

module.exports = System;