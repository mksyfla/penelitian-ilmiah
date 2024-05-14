require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { userRoutes } = require('./routes/userRoutes');
const { errorMiddleware } = require('./middleware/errorMiddleware');

function init() {
  const app = express();

  app.use(bodyParser.json());
  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.use(userRoutes);
  app.use(errorMiddleware);

  app.get('/', (req, res, next) => {
    res.send('hello world');
    next();
  });

  app.listen(process.env.PORT, () => {
    console.log(`running on http://${process.env.HOST}:${process.env.PORT}`);
  });
}

init();
