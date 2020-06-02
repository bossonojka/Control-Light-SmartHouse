import './styles/main.scss';

import Chart from 'chart.js';
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
});

socket.on('mode changed', async () => {
  await lightersController.update();
  await brightnessController.render();
});

socket.on('power changed', async (lighters) => {
  await infoController.updatePowerConsumption(lighters);
});

const statisticsControl = document.querySelector('.statisticts-control');

const drawGraph = (val) => {
  const ctx = document.querySelector('.statistics-chart').getContext('2d');

  if (val === '0') {
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: '',
          data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 2,
        },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  if (val === '1') {
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Lighter 1',
          data: [0.5, 0.48, 0.4, 0.19, 0.86, 0.54],
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 2,
        },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  if (val === '2') {
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Lighter 2',
          data: [0.4, 0.5, 0.6, 0.9, 0.5, 0.45],
          backgroundColor: [
            'rgba(130, 120, 10, .2)',
          ],
          borderColor: [
            'rgba(130, 130, 10, .7)',
          ],
          borderWidth: 2,
        },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }


  if (val === '3') {
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Lighter 3',
          data: [0.28, 0.40, 0.60, 0.65, 0.6, 0.5],
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 2,
        },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  if (val === '4') {
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Lighter 4',
          data: [0.3, 0.4, 0.6, 0.7, 0.8, 0.5],
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 2,
        },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  if (val === '5') {
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Lighter 5',
          data: [0.28, 0.4, 0.6, 0.65, 0.6, 0.54],
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 2,
        },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  if (val === '6') {
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Lighter 6',
          data: [0.7, 0.45, 0.6, 0.8, 0.6, 0.5],
          backgroundColor: [
            'rgba(0, 137, 132, .2)',
          ],
          borderColor: [
            'rgba(0, 10, 130, .7)',
          ],
          borderWidth: 2,
        },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
};

statisticsControl.onchange = (e) => {
  drawGraph(e.target.value);
};

lightersController.render();
sensorsController.render();
modesController.render();
brightnessController.render();
infoController.render();
drawGraph('0');
