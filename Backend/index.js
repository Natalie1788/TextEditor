import express from 'express';
import cors from 'cors';
import chatRouter from './router.js';

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

app.use('/', chatRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
