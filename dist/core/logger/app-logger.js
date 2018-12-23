"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var winston = _interopRequireWildcard(require("winston"));

var rotate = _interopRequireWildcard(require("winston-daily-rotate-file"));

var _config = _interopRequireDefault(require("../config/config.dev"));

var fs = _interopRequireWildcard(require("fs"));

var dir = _config.default.logFileDir;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

var logger = new winston.Logger({
  level: 'info',
  transports: [new winston.transports.Console({
    colorize: true
  }), new winston.transports.DailyRotateFile({
    filename: _config.default.logFileName,
    dirname: _config.default.logFileDir,
    maxsize: 20971520,
    //20MB
    maxFiles: 25,
    datePattern: '.dd-MM-yyyy'
  })]
});
var _default = logger;
exports.default = _default;