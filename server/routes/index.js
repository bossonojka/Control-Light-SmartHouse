const Router = require('@koa/router');

const router = new Router();

const sensors = require('./sensors');
const lighters = require('./lighters');
const modes = require('./modes');

router.prefix('/api');

router.use('/sensors', sensors.routes());
router.use('/lighters', lighters.routes());
router.use('/modes', modes.routes());

module.exports = router;
