const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Handling uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(err);
  console.log('UNHANDLED EXCEPTION 💣 Shutting Down');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

//console.log(process.env);
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>,process.env.DATABASE_PASSWORD'
// );
const DB = process.env.DATABASE;
//console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((con) => console.log('Database connected Successfully'));

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App is listening on port no ${port}`);
});

//Handling Global Unhandled rejection

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED REJECTION 💣 Shutting Down');
  server.close(() => {
    process.exit(1);
  });
});
