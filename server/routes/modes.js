const Router = require('@koa/router');
const ModesService = require('../services/Modes');

const router = new Router();

router.post('/', async (ctx) => {
  const { name } = ctx.request.body;

  const modes = await ModesService.getModes();

  modes.some((m) => {
    if (m.name === name) {
      ctx.body = ModesService.updateMode(name);
      return true;
    }
    return false;
  });
});

router.get('/', async (ctx) => {
  ctx.body = await ModesService.getModes();
});

router.get('/current', async (ctx) => {
  ctx.body = { name: global.MODE };
});

module.exports = router;
