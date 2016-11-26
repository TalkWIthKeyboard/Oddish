/**
 * Created by CoderSong on 16/11/26.
 */
'use strict';

exports.pageSize = 10;
exports.searchPageSize = 20;
exports.sendTime = 5;

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