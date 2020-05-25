export default class SensorsService {
  constructor(path) {
    this.path = path;
  }

  async getSensors() {
    const responce = await fetch(this.path);
    const result = await responce.json();

    return result;
  }

  async getLightersBySensorId(id) {
    const responce = await fetch(`${this.path}/${id}/lighters`);
    const result = await responce.json();

    return result;
  }
}
