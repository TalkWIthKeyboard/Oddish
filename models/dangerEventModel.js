/**
 * Created by CoderSong on 16/11/26.
 */

'use strict';

let mongoose = require('mongoose');
let dangerEventSchema = require('../schemas/dangerEventSchema');
let DangerEvent = mongoose.model('DangerEvent',dangerEventSchema);

module.exports = DangerEvent;