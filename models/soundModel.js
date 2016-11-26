/**
 * Created by CoderSong on 16/11/26.
 */

'use strict';

let mongoose = require('mongoose');
let soundSchema = require('../schemas/soundSchema');
let Sound = mongoose.model('Sound',soundSchema);

module.exports = Sound;