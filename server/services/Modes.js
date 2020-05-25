// const LightersService = require('./Lighters');

const db = require('../lib/db');

class ModesService {
  static updateMode(mode) {
    global.MODE = mode;

    return { name: global.MODE };
  }

  static async getModes() {
    return db('modes').select();
  }
}

module.exports = ModesService;
