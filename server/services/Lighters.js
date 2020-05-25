const db = require('../lib/db');

class LightersService {
  static async getLighters() {
    return db('lighters').select();
  }

  static async getLighterById(id) {
    return db('lighters').where({ id }).select();
  }

  static async updateById(id, body) {
    return db('lighters').where({ id }).update(body);
  }

  static async updateBySensorId(id, body) {
    return db('lighters').where({ sensor_id: id }).update(body);
  }

  static async switchOnAllOfTheLightersMaxBrightness() {
    return db('lighters').update({ status: 1, brightness: 100 });
  }

  static async switchOffAllOfTheLighters() {
    return db('lighters').update({ status: null });
  }

  static async getLightersWithSensorsInfo() {
    return db('lighters').select('lighters.id', 'lighters.brightness', 'lighters.status', 'lighters.power', 'lighters.sensor_id', 'sensors.type AS sensor_type', 'sensors.status AS sensor_status', 'sensors.position AS sensor_position').innerJoin('sensors', 'lighters.sensor_id', 'sensors.id');
  }
}

module.exports = LightersService;
