require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const { userRoutes } = require('./routes/userRoutes');
const { loginRoutes } = require('./routes/authRoutes');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const { authenticationMiddleware, authorizationMiddleware } = require('./middleware/authMiddleware');

function init() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.use(loginRoutes);
  app.use(userRoutes);
  app.use(errorMiddleware);

  app.get(
    '/',
    authenticationMiddleware(),
    authorizationMiddleware('UMKM'),
    (req, res, next) => {
      console.log(req);
      res.send('hello world');
      next();
    },
  );

  app.listen(process.env.PORT, () => {
    console.log(`running on http://${process.env.HOST}:${process.env.PORT}`);
  });
}

init();
