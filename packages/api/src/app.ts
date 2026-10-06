import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(helmet());
app.use(cors());
// app.use(
//   morgan('dev', {
//     skip: () => '',
//   }),
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req, res) => {
  return res.status(200).json({ message: 'Health Ok!' });
});

export default app;
