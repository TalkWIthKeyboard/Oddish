/**
 * Created by CoderSong on 16/11/27.
 */

'use strict';
let mongoose = require('mongoose');
let varietiesSchema = require('../schemas/varietiesSchema');
let Varieties = mongoose.model('Varieties',varietiesSchema);

module.exports = Varieties;