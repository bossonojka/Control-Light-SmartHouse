import ModesService from '../services/Modes';

import socket from './Socket';

const modesService = new ModesService('http://localhost:3000/api/modes');

export default class ModesController {
  constructor(list) {
    this.list = list;
  }

  async render() {
    const modes = await modesService.getModes();
    const current = await modesService.getCurrentMode();

    const buttons = [];

    modes.forEach((mode) => {
      const { name } = mode;

      const div = document.createElement('div');
      div.classList.add('modes-item');

      const button = document.createElement('button');
      button.classList.add('modes-btn', `modes-btn-${name}`);
      button.textContent = name;

      button.onclick = async (e) => {
        await modesService.updateMode(name);

        socket.emit('mode changed');

        buttons.forEach((b) => {
          b.classList.remove('active');
        });

        e.target.classList.add('active');
      };

      buttons.push(button);

      if (current.name === name) {
        button.classList.add('active');
      }

      div.appendChild(button);

      this.list.appendChild(div);
    });
  }
}
