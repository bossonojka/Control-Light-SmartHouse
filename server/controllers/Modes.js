const SensorsService = require('../services/Sensors');
const LightersService = require('../services/Lighters');

class ModesController {
  constructor(socket) {
    this.socket = socket;
  }

  async switchOnAutoMode() {
    await SensorsService.updateSensorsStatus(null);
    await LightersService.switchOffAllOfTheLighters();

    const sensors = await SensorsService.getSensors();
    const triggerEvent = 'sensor triggered';

    const triggeringIntervalId = setInterval(async () => {
      if (global.MODE !== 'auto') {
        clearInterval(triggeringIntervalId);

        return;
      }

      const triggeredSensor = sensors[Math.floor(Math.random() * sensors.length)];

      if (!triggeredSensor.status) {
        triggeredSensor.status = 1;

        await SensorsService.updateById(triggeredSensor.id, { status: triggeredSensor.status });
        await LightersService.updateBySensorId(triggeredSensor.id, { status: 1 });

        this.socket.emit(triggerEvent, triggeredSensor);

        const triggerinTimeoutId = setTimeout(async () => {
          triggeredSensor.status = null;

          if (global.MODE !== 'auto') {
            clearTimeout(triggerinTimeoutId);

            this.socket.emit(triggerEvent, triggeredSensor);

            return;
          }

          await SensorsService.updateById(triggeredSensor.id, { status: triggeredSensor.status });
          await LightersService.updateBySensorId(triggeredSensor.id, { status: null });

          this.socket.emit(triggerEvent, triggeredSensor);
        }, 10000);
      }
    }, 5000);
  }
}

module.exports = ModesController;
