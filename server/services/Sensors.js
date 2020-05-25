const db = require('../lib/db');

class SensorsService {
  static async getSensors() {
    return db('sensors').select('sensors.id', 'sensors.type', 'sensors.status', 'rooms.name AS room').innerJoin('rooms', 'sensors.room_id', 'rooms.id');
  }

  static async updateById(id, body) {
    return db('sensors').where({ id }).update(body);
  }

  static async getLightersBySensorId(id) {
    return db('lighters').where({ sensor_id: id });
  }

  static async updateSensorsStatus(status) {
    return db('sensors').update({ status });
  }
}

module.exports = SensorsService;
