import LightersService from '../services/Lighters';
import boxShadowGenerator from '../util/cssEffects';
//  import getTimer from '../util/requests';

const lightersService = new LightersService('http://localhost:3000/api/lighters');

export default class BrightnessController {
  constructor(list) {
    this.list = list;
  }

  async render() {
    while (this.list.firstChild) {
      this.list.firstChild.remove();
    }

    const lighters = await lightersService.getLighters();

    lighters.forEach((lighter) => {
      const { id, brightness } = lighter;

      const lightersItem = document.createElement('div');
      lightersItem.classList.add('lighters-item');

      const lightersName = document.createElement('lighters-name');

      lightersName.classList.add('lighters-name');
      lightersName.textContent = `Lighter: ${id}`;

      const lightersControl = document.createElement('lighters-control');
      lightersControl.classList.add('lighters-control');

      const input = document.createElement('input');

      input.classList.add('lighters-range');
      input.type = 'range';
      input.name = 'brightness';
      input.value = brightness;

      input.oninput = async (e) => {
        const { value } = e.target;

        await lightersService.updateLighterById(id, { brightness: Number(value) });

        const element = document.querySelector(`.model-lighter[data-id='${id}']`);
        const isActive = element.classList.contains('active');

        if (isActive) {
          element.style.boxShadow = boxShadowGenerator(value);
        }
      };

      lightersControl.appendChild(input);

      lightersItem.appendChild(lightersName);
      lightersItem.appendChild(lightersControl);

      this.list.appendChild(lightersItem);
    });
  }
}
