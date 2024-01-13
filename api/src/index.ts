import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.post('/api/authorize', function (req, res) {});

app.all('*', function (req, res) {
  return res.status(404).json({
    success: false,
    message: 'Given path does not exists!',
  });
});

app.listen(port, function () {
  console.log(`Server is listening on http://localhost:${port}`);
});

