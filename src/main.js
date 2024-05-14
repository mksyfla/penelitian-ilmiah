require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const { userRoutes, loginRoutes } = require('./routes/userRoutes');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const { authMiddleware } = require('./middleware/authMiddleware');

function init() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.use(loginRoutes);
  app.use(userRoutes);
  app.use(errorMiddleware);

  app.get('/', authMiddleware('UMKM'), (req, res, next) => {
    res.send('hello world');
    next();
  });

  app.listen(process.env.PORT, () => {
    console.log(`running on http://${process.env.HOST}:${process.env.PORT}`);
  });
}

init();
