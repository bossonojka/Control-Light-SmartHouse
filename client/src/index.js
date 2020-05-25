import './styles/main.scss';

import socket from './controllers/Socket';

import LightersController from './controllers/Lighters';
import SensorsController from './controllers/Sensors';
import ModesController from './controllers/Modes';
import BrightnessController from './controllers/Brightness';
import InfoController from './controllers/Info';

const lightersList = document.querySelector('.model-lighters');
const sensorsList = document.querySelector('.sensors-list');
const modesList = document.querySelector('.modes-list');
const litersBrightnessList = document.querySelector('.lighters-list');
const infoTableList = document.querySelector('.info-table-body');

const lightersController = new LightersController(lightersList);
const sensorsController = new SensorsController(sensorsList);
const modesController = new ModesController(modesList);
const brightnessController = new BrightnessController(litersBrightnessList);
const infoController = new InfoController(infoTableList);

socket.on('sensor triggered', async (sensor) => {
  sensorsController.update(sensor);
  await lightersController.updateBySensor(sensor);
  console.log(sensor);
});

socket.on('mode changed', async () => {
  await lightersController.update();
  await brightnessController.render();
  // if (mode.name === 'manual') {
  //   await lightersController.manual();
  // }
});

socket.on('power changed', async (lighter) => {
  await infoController.updatePowerConsumption(lighter);
});

lightersController.render();
sensorsController.render();
modesController.render();
brightnessController.render();
infoController.render();
