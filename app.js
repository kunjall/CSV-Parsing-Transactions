const express = require('express')
require('dotenv').config();
require('./utils/db')
const assetRoute = require('./routes/routes');

const app = express();
app.use(express.json())
app.use('/api', assetRoute)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port`, process.env.PORT);
  });