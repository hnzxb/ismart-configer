const path     = require("path");
const fs       = require("fs-extra");
const lowdb    = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const DataBase = null;

function iConfiger (_dbfile, _defaults) {
    var dbfile = path.resolve(_dbfile);
    fs.ensureFileSync(dbfile);
    var database = lowdb(new FileSync(dbfile));
    database.val = function (_path, _defaults) {
        return database.get(_path, _defaults).value();
    }
    database.defaults(_defaults || {}).write();
    return database;
}

module.exports = function (_databaseName, _defaults) {
    var dbfile = path.resolve(`./.ismart/configs/${_databaseName}.json`);
    return iConfiger(dbfile, _defaults);
};

module.exports.pkg = function (_defaults) {
    var dbfile = path.resolve(`./package.json`);
    fs.ensureFileSync(dbfile);
    var database = lowdb(new FileSync(dbfile));
    database.val = function (_path, _defaults) {
        return database.get(_path, _defaults).value();
    }
    database.defaults(_defaults || {}).write();
    return database;
};

module.exports.ismart = function (_defaults) {
    return iConfiger(`./ismart.config.json`, _defaults);
}