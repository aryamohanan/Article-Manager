'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return Promise.all([
    db.createTable('articles', {
      id: { type: 'serial', primaryKey: true },
      title: { type: 'text'},
      author: { type: 'text' },
      body: { type: 'json'},
      noOfLikes: { type: 'int' },
      noOfViews: { type: 'int' }
    }), 
    db.createTable('users', {
      id: { type: 'serial', primaryKey: true },
      name: { type: 'int'},
    })
  ])
};

exports.down = function(db) {
  return Promise.all([db.dropTable('articles'),db.dropTable('users')])
};


exports._meta = {
  "version": 1
};
