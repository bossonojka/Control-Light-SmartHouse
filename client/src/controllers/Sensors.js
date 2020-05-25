import SensorsService from '../services/Sensors';

const sensorsService = new SensorsService('http://localhost:3000/api/sensors');

export default class SensorsController {
  constructor(list) {
    this.list = list;
  }

  async render() {
    while (this.list.firstChild) {
      this.list.firstChild.remove();
    }

    const sensors = await sensorsService.getSensors();

    sensors.forEach((sensor) => {
      const { id, status, room } = sensor;
      const div = document.createElement('div');

      div.classList.add('sensor-item');
      div.dataset.id = id;
      div.textContent = room;

      if (status) {
        div.classList.add('active');
      }

      this.list.appendChild(div);
    });
  }

  update(sensor) {
    const { id, status } = sensor;

    this.list.childNodes.forEach((element) => {
      const elementId = +element.dataset.id;

      if (elementId === id && status) {
        element.classList.add('active');
      } else if (elementId === id && !status) {
        element.classList.remove('active');
      }
    });
  }
}
