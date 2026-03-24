import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import {sequelize} from './db.js';

dotenv.config();

const app = express();

app.use(express.json());

// app.use('/api/auth', require('./routes/auth.routes'))
// app.use('/api/link', require('./routes/link.routes'))
// app.use('/t', require('./routes/redirect.routes'))

// if (process.env.NODE_ENV === 'production') {
//   app.use('/', express.static(path.join(__dirname, 'client', 'build')))

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   })
// }

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    sequelize.sync()
    .then(result=>console.log(result))
    .catch(err=> console.log(err));
    app.listen(PORT, () => console.log(`server is running on port ${PORT}...`));
  } catch (e) {
    console.log('Server Error', e.message);
  }
}

start();