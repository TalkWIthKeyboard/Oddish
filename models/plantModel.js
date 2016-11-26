/**
 * Created by CoderSong on 16/11/26.
 */

let mongoose = require('mongoose');
let plantSchema = require('../schemas/plantSchema');
let Plant = mongoose.model('Plant',plantSchema);

module.exports = Plant;