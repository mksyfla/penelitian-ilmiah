require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const { userController } = require('./controllers/userControllers');
const { authController } = require('./controllers/authControllers');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const { jobController } = require('./controllers/jobControllers');
const { workController } = require('./controllers/workControllers');

function init() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/public', express.static(path.join(__dirname, '../public')));

  app.use(authController);
  app.use(userController);
  app.use(jobController);
  app.use(workController);
  app.use(errorMiddleware);

  app.post('/', (req, res, next) => {
    res.send('hello world');
    next();
  });

  app.listen(process.env.PORT, () => {
    console.log(`running on http://${process.env.HOST}:${process.env.PORT}`);
  });
}

init();
