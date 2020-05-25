import LightersService from '../services/Lighters';
import SensorsService from '../services/Sensors';

const lightersService = new LightersService('http://localhost:3000/api/lighters');
const sensorsService = new SensorsService('http://localhost:3000/api/sensors');

export default class BrightnessController {
  constructor(list) {
    this.list = list;
  }

  async render() {
    while (this.list.firstChild) {
      this.list.firstChild.remove();
    }

    const lighters = await lightersService.getLighters();
    const sensors = await sensorsService.getSensors();

    lighters.forEach((lighter) => {
      const {
        id, power, sensor_id,
      } = lighter;

      const tr = document.createElement('tr');
      tr.classList.add('info-row');
      tr.dataset.id = id;

      const tdId = document.createElement('td');
      tdId.classList.add('info-body-column');
      tdId.textContent = id;

      const tdPower = document.createElement('td');
      tdPower.classList.add('info-body-column');

      const span = document.createElement('span');
      span.classList.add('info-power');
      span.textContent = `${power} W/h`;

      const tdSensors = document.createElement('td');
      tdSensors.classList.add('info-body-column');

      const select = document.createElement('select');
      select.classList.add('info-control');

      select.onchange = async (e) => {
        await lightersService.updateLighterById(id, { sensor_id: e.target.value });
      };

      sensors.forEach((sensor) => {
        const option = document.createElement('option');
        option.value = sensor.id;
        option.textContent = sensor.room;

        if (sensor.id === sensor_id) {
          option.selected = true;
        }

        select.appendChild(option);
      });


      tdSensors.appendChild(select);
      tdPower.appendChild(span);

      tr.appendChild(tdId);
      tr.appendChild(tdPower);
      tr.appendChild(tdSensors);

      this.list.appendChild(tr);
    });
  }

  async updatePowerConsumption(lighters) {
    this.list.childNodes.forEach((element, i) => {
      const row = element;
      const elementId = Number(row.dataset.id);

      if (elementId === lighters[i].id) {
        const span = row.querySelector('.info-power');
        span.textContent = `${lighters[i].power} W/h`;
      }
    });
  }
}
