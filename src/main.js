require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { userRoutes } = require('./routes/userRoutes');
const { loginRoutes } = require('./routes/authRoutes');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const { jobRoutes } = require('./routes/jobRoutes');
const { workRoutes } = require('./routes/workRoutes');

function init() {
  const app = express();

  app.use(cors());
  app.use(fileUpload());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use('/public', express.static(path.join(__dirname, 'public')));

  app.use(loginRoutes);
  app.use(userRoutes);
  app.use(jobRoutes);
  app.use(workRoutes);
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
