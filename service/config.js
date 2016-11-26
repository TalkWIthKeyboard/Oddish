/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

exports.pageSize = 10;
exports.searchPageSize = 20;
exports.sendTime = 5;

// 植物性别
exports.USER_SEX = {
  'female': {
    'key': 0,
    'value': 'female'
  },
  'male': {
    'key': 0,
    'value': 'male'
  }
};

// 系统变量
exports.SYSTEM_VALUE = {
  'canSend': {
    'key': 0,
    'value': 'canSend'
  },
  'cantSend': {
    'key': 1,
    'value': 'cantSend'
  }
};

// 是否已经发送
exports.IS_SEND = {
  'send': {
    'key': 0,
    'value': 'send'
  },
  'notSend': {
    'key': 1,
    'value': 'notSend'
  }
};

// 是否已经解决
exports.IS_SOLVE = {
  'solve': {
    'key': 0,
    'value': 'solve'
  },
  'notSolve': {
    'key': 1,
    'value': 'notSolve'
  }
};

// 是否已经使用
exports.IS_USE = {
  'use': {
    'key': 0,
    'value': 'use'
  },
  'notUse': {
    'key': 1,
    'value': 'notUse'
  }
};

exports.MESSAGE = {
  'noisy': {
    'pd': 'soundPD',
    'sentence': '我要睡觉了~别吵了~'
  },
  'hot': {
    'pd': 'tempHumPD',
    'sentence': '我的哥好热啊，开空调啊~'
  },
  'cold': {
    'pd': 'tempHumPD',
    'sentence': '我的哥好冷啊，开空调啊~'
  },
  'wet': {
    'pd': 'tempHumPD',
    'sentence': '太潮湿了吧，快把我放家了去~'
  },
  'dry': {
    'pd': 'tempHumPD',
    'sentence': '我要渴死了，快给我喝点水啊~'
  },
  'light': {
    'pd': 'illuminationPD',
    'sentence': '晒死哥了，我的天~'
  },
  'cold wet': {
    'pd': 'tempHumPD',
    'sentence': '又冷又湿~'
  },
  'hot wet':{
    'pd': 'tempHumPD',
    'sentence': '又热又湿~'
  },
  'cold dry':{
    'pd': 'tempHumPD',
    'sentence': '又冷又干~'
  },
  'hot dry':{
    'pd': 'tempHumPD',
    'sentence': '又热又干~'
  }
};


exports.SUCCESS_MESSAGE = {
  'noisy': {
    'pd': 'soundPD',
    'sentence': '终于可以好好睡觉了~'
  },
  'hot': {
    'pd': 'tempHumPD',
    'sentence': '终于不热了，好舒服啊~'
  },
  'cold': {
    'pd': 'tempHumPD',
    'sentence': '终于不冷了，好舒服啊~'
  },
  'wet': {
    'pd': 'tempHumPD',
    'sentence': '终于不湿了，好舒服啊~'
  },
  'dry': {
    'pd': 'tempHumPD',
    'sentence': '终于不干了，好舒服啊~'
  },
  'light': {
    'pd': 'illuminationPD',
    'sentence': '终于不晒了~'
  },
  'cold wet': {
    'pd': 'tempHumPD',
    'sentence': '终于不又冷又湿~'
  },
  'hot wet':{
    'pd': 'tempHumPD',
    'sentence': '终于不又热又湿~'
  },
  'cold dry':{
    'pd': 'tempHumPD',
    'sentence': '终于不又冷又干~'
  },
  'hot dry':{
    'pd': 'tempHumPD',
    'sentence': '终于不又热又干~'
  }
};

// 状态码
exports.ERROR_INFO = {

  SUCCESS: {
    'code': 200,
    'value': '操作成功完成'
  },

  // 请求操作错误码
  REQUEST_ERR: {
    'code': 410,
    'value': '携带参数不完整'
  },

  // 数据库操作错误码
  DB_SAVE_ERR: {
    'code': 510,
    'value': '数据库保存错误'
  },
  DB_CHANGE_ERR: {
    'code': 511,
    'value': '数据库修改错误'
  },
  DB_DELETE_ERR: {
    'code': 512,
    'value': '数据库删除错误'
  },
  DB_SELECT_ERR: {
    'code': 513,
    'value': '数据库检索错误'
  },

  // 事物状态操作码
  PLANT_ERR: {
    'code': 520,
    'value': '不存在这个植物'
  },
  DANGER_EVENT_ERR: {
    'code': 530,
    'value': '不存在这个危险事件'
  },
  DANGER_EVENT_SOLVE_ERR: {
    'code': 531,
    'value': '这个危险事件已经解决'
  },
  RUFF_ERR: {
    'code': 530,
    'value': '这个RUFF已经存在了'
  }
};