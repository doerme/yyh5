'use strict';
/**
 * db config
 * @type {Object}
 */exports.__esModule = true;exports.default = 
{ 
  type: 'mysql', 
  log_sql: true, 
  log_connect: true, 
  adapter: { 
    mysql: { 
      host: '127.0.0.1', 
      port: '3306', 
      database: 'subject_factory', 
      user: 'root', 
      password: '654321', 
      prefix: 'sf_', 
      encoding: 'utf8' }, 

    mongo: {} } };