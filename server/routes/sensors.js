const Router = require('@koa/router');
const SensorsService = require('../services/Sensors');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = await SensorsService.getSensors();
});

router.get('/:id(\\d+)/lighters', async (ctx) => {
  const { id } = ctx.params;

  ctx.body = await SensorsService.getLightersBySensorId(id);
});

module.exports = router;
