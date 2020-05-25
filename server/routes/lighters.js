const Router = require('@koa/router');
const LightersService = require('../services/Lighters');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = await LightersService.getLighters();
});

router.get('/:id(\\d+)', async (ctx) => {
  const { id } = ctx.params;
  const [result] = await LightersService.getLighterById(id);

  ctx.body = result;
});

router.post('/:id(\\d+)/status', async (ctx) => {
  const { id } = ctx.params;
  const { body } = ctx.request;

  let result = null;

  if (global.MODE === 'manual') {
    result = await LightersService.updateById(id, body);
  }

  ctx.assert(result, 406);
  ctx.body = result;
});

router.patch('/:id(\\d+)', async (ctx) => {
  const { id } = ctx.params;

  const { body } = ctx.request;

  console.log(body);

  ctx.body = await LightersService.updateById(id, body);
});

module.exports = router;
