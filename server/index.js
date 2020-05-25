// Import main libs
const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

// Initialize Koa server, http server and Socket.io
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

// Services
const SensorsService = require('./services/Sensors');
const LightersService = require('./services/Lighters');

// Controllers
const ModesController = require('./controllers/Modes');

// Default port
const PORT = 3000;

// Routes
const router = require('./routes');

// Default global mode
global.MODE = 'auto';

// Global errors handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.type = 'json';
    ctx.status = err.status || 500;
    ctx.body = { status: 'error', message: err.message };
    ctx.app.emit('error', err, ctx);
  }
});

// Set CORS
app.use(cors({
  origin: '*',
}));

// Parse body of HTTP requests
app.use(bodyParser());

// Routes middleware
app.use(router.routes());

// Server errors handler
app.on('error', (err, ctx) => {
  ctx.body = { message: err.message };
});

// Socket connection
io.on('connection', async (socket) => {
  console.log('a user connected');

  const modeChanged = 'mode changed';
  const powerChanged = 'power changed';

  let modesController = new ModesController(socket);

  if (global.MODE === 'auto') {
    await modesController.switchOnAutoMode();
  }

  socket.on(modeChanged, async () => {
    switch (global.MODE) {
      case 'auto':
        await modesController.switchOnAutoMode();
        socket.emit(modeChanged, { name: global.MODE });
        break;
      case 'cleaning':
        await LightersService.switchOnAllOfTheLightersMaxBrightness();
        socket.emit(modeChanged, { name: global.MODE });
        break;
      case 'manual':
        socket.emit(modeChanged, { name: global.MODE });
        break;
      default:
        break;
    }
  });

  const intervalId = setInterval(async () => {
    const lighters = await LightersService.getLighters();
    const lightersWithCurrentPower = [];

    lighters.forEach((lighter) => {
      const {
        id, power, brightness, status,
      } = lighter;

      let result = 0;

      let inaccuracy = 0;

      if (brightness > 1) {
        inaccuracy = Math.floor(Math.random() * 2);
      }

      if (status) {
        result = Math.round((brightness * power) / 100) - inaccuracy;
      }

      lightersWithCurrentPower.push({ id, power: result });
    });

    socket.emit(powerChanged, lightersWithCurrentPower);
  }, 3000);

  socket.on('disconnect', () => {
    console.log('user disconnected');

    modesController = null;
    clearInterval(intervalId);
  });
});

// Start listening the default port
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
