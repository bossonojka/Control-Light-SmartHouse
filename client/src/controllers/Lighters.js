import LightersService from '../services/Lighters';
import SensorsService from '../services/Sensors';
import boxShadowGenerator from '../util/cssEffects';

const lightersService = new LightersService('http://localhost:3000/api/lighters');
const sensorsService = new SensorsService('http://localhost:3000/api/sensors');

export default class LightersController {
  constructor(list) {
    this.list = list;
  }

  async render() {
    while (this.list.firstChild) {
      this.list.firstChild.remove();
    }

    const lighters = await lightersService.getLighters();

    lighters.forEach((lighter, i) => {
      const { id, status, brightness } = lighter;

      const div = document.createElement('div');

      div.classList.add('model-lighter', `model-lighter-${i + 1}`);
      div.dataset.id = id;

      if (status) {
        div.classList.add('active');
        div.style.boxShadow = boxShadowGenerator(brightness);
      }

      div.onclick = async (e) => {
        const isActive = e.target.classList.contains('active');

        try {
          await lightersService.udpateLighterStatusById(id, isActive ? null : 1);

          e.target.classList.toggle('active');

          if (isActive) {
            div.style.boxShadow = '';
          } else {
            const result = await lightersService.getLighterById(id);

            div.style.boxShadow = boxShadowGenerator(result.brightness);
          }
        } catch (err) {
          console.log(err.message);
        }
      };

      this.list.appendChild(div);
    });
  }

  async update() {
    const lighters = await lightersService.getLighters();
    console.log(lighters);
    lighters.forEach((lighter) => {
      const { id, status, brightness } = lighter;

      this.list.childNodes.forEach((element) => {
        const elementLighter = element;
        const elementId = +element.dataset.id;

        if (elementId === id && status) {
          element.classList.add('active');
          elementLighter.style.boxShadow = boxShadowGenerator(brightness);
        } else if (elementId === id && !status) {
          element.classList.remove('active');
          elementLighter.style.boxShadow = '';
        }
      });
    });
  }

  async manual() {
    this.list.childNodes.forEach((element) => {
      const lighter = element;
      lighter.addEvent = (e) => {
        e.target.classList.remove('active');
      };
    });
  }

  async updateBySensor(sensor) {
    const { id } = sensor;

    const lighters = await sensorsService.getLightersBySensorId(id);

    lighters.forEach((lighter) => {
      this.list.childNodes.forEach((element) => {
        const elementLighter = element;
        const elementId = +element.dataset.id;

        if (elementId === lighter.id && lighter.status) {
          element.classList.add('active');
          elementLighter.style.boxShadow = boxShadowGenerator(lighter.brightness);
        } else if (elementId === lighter.id && !lighter.status) {
          element.classList.remove('active');
          elementLighter.style.boxShadow = '';
        }
      });
    });
  }
}
