import express from 'express';
import dotenv from "dotenv"
import numbersRoutes from './routes/number.route.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/numbers', numbersRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
